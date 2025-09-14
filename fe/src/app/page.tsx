'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import WalletConnect from '@/components/WalletConnect';
import EventCard from '@/components/EventCard';
import SeatSelection from '@/components/SeatSelection';
import OrganizerDashboard from '@/components/OrganizerDashboard';
import CreateEventModal from '@/components/CreateEventModal';
import { Event } from '@/types/contract';
import { useBlockchainIntegration } from '@/hooks/useBlockchainIntegration';

interface CreateEventData {
  title: string;
  price: string;
  maxTickets: string;
  date: string;
  time: string;
  location: string;
  maxResalePrice: string;
}

// Start with empty events; events will be added after on-chain creation
const mockEvents: Event[] = [];

export default function Home() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isApprovedOrganizer, setIsApprovedOrganizer] = useState(false);
  const [activeView, setActiveView] = useState<'events' | 'organizer'>('events');
  
  const { createEvent, mintTicket, getEventDetails, getTotalOccassions, error: blockchainError } = useBlockchainIntegration();

  // Load existing events from chain on initial render
  useEffect(() => {
    const load = async () => {
      try {
        await reloadEvents();
      } catch (e) {
        console.error('Failed to load events from chain', e);
      }
    };
    load();
  }, [getTotalOccassions, getEventDetails]);

  const reloadEvents = async () => {
    const total = await getTotalOccassions();
    const loaded: Event[] = [];
    const imgMapRaw = typeof window !== 'undefined' ? localStorage.getItem('event_images') : null;
    const imgMap: Record<string, string> = imgMapRaw ? JSON.parse(imgMapRaw) : {};
    for (let i = 1; i <= total; i++) {
      const ev = await getEventDetails(i);
      if (ev) {
        const withImg = imgMap[String(ev.id)] ? { ...ev, imageUrl: imgMap[String(ev.id)] } : ev;
        loaded.push(withImg);
      }
    }
    setEvents(loaded);
  };

  const handleWalletConnect = async (address: string) => {
    setIsConnected(true);
    setUserAddress(address);
    
    // Since organizer fee prevents spam, all connected wallets can create events
    setIsApprovedOrganizer(true);
  };

  const handleEventRegister = async (eventId: number) => {
    // Validate against on-chain total occasions to avoid invalid IDs
    const total = await getTotalOccassions();
    if (eventId <= 0 || eventId > total) {
      alert('This event is not available on-chain yet. Please refresh or create a new event.');
      return;
    }
    const event = events.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
    }
  };

  const handleSeatConfirm = async (seatNumber: number) => {
    if (!selectedEvent) return;
    
    setIsLoading(true);
    try {
      // Use real blockchain transaction
      const priceInEth = (Number(selectedEvent.price) / 1e18).toString();
      const result = await mintTicket(selectedEvent.id, seatNumber, priceInEth);
      
      if (result.success) {
        const tokenPart = isNaN(result.tokenId) ? '' : ` Token #${result.tokenId}.`;
        // Refresh the selected event details from chain to reflect new availability
        const refreshed = await getEventDetails(selectedEvent.id);
        if (refreshed) {
          setEvents(prev => prev.map(ev => ev.id === refreshed.id ? refreshed : ev));
        }
        // Slight delay then full reload to ensure consistency across views
        setTimeout(() => { reloadEvents(); }, 1500);
        setSelectedEvent(null);
        alert(`Ticket purchased successfully!${tokenPart}`);
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      alert(`Registration failed: ${blockchainError || 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeatCancel = () => {
    setSelectedEvent(null);
  };

  const handleCreateEvent = () => {
    setShowCreateModal(true);
  };

  const handleCreateEventSubmit = async (eventData: CreateEventData) => {
    setIsLoading(true);
    try {
      // Use real blockchain transaction to create event
      const success = await createEvent(eventData);
      
      if (success) {
        // Get the actual on-chain event ID and load details from chain
        const total = await getTotalOccassions();
        const onchain = await getEventDetails(total);
        if (onchain) {
          // Persist image mapping if provided
          if ((eventData as any).imageUrl) {
            try {
              const imgMapRaw = localStorage.getItem('event_images');
              const imgMap = imgMapRaw ? JSON.parse(imgMapRaw) : {};
              imgMap[String(total)] = (eventData as any).imageUrl;
              localStorage.setItem('event_images', JSON.stringify(imgMap));
            } catch {}
          }
          const withImg = (eventData as any).imageUrl ? { ...onchain, imageUrl: (eventData as any).imageUrl } : onchain;
          setEvents(prev => [...prev, withImg]);
        } else {
          // Fallback if read fails: add a best-effort placeholder with correct ID
          const fallback: Event = {
            id: total,
            title: eventData.title,
            price: BigInt(0),
            tickets: parseInt(eventData.maxTickets),
            maxTickets: parseInt(eventData.maxTickets),
            date: eventData.date,
            time: eventData.time,
            location: eventData.location,
            maxResalePrice: BigInt(0),
            organizer: userAddress || '',
            imageUrl: (eventData as any).imageUrl || undefined
          };
          setEvents(prev => [...prev, fallback]);
        }
        // Slight delay then full reload to ensure consistency
        setTimeout(() => { reloadEvents(); }, 1500);
        setShowCreateModal(false);
        alert('Event created successfully! Transaction confirmed on blockchain.');
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert(`Failed to create event: ${blockchainError || 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const organizerEvents = isConnected && userAddress
    ? events.filter(event => event.organizer?.toLowerCase() === userAddress.toLowerCase())
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">EventX</h1>
              <span className="ml-2 text-sm text-gray-500">Decentralized Ticketing</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveView('events')}
                className={`hover:text-blue-600 font-medium ${
                  activeView === 'events' ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                Events
              </button>
              {isConnected && isApprovedOrganizer && (
                <button
                  onClick={() => setActiveView('organizer')}
                  className={`hover:text-blue-600 font-medium ${
                    activeView === 'organizer' ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  Organizer Dashboard
                </button>
              )}
              <Link href="/my-tickets" className="text-gray-500 hover:text-blue-600">
                My Tickets
              </Link>
              <Link href="/about" className="text-gray-500 hover:text-blue-600">
                About
              </Link>
              <Link href="/how-it-works" className="text-gray-500 hover:text-blue-600">
                How It Works
              </Link>
            </nav>

            <WalletConnect onConnect={handleWalletConnect} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      {activeView === 'events' ? (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Secure Event Ticketing
                <br />
                <span className="text-blue-200">On The Blockchain</span>
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Buy, sell, and trade event tickets with complete transparency and security
              </p>
              {!isConnected && (
                <div className="inline-block">
                  <WalletConnect onConnect={handleWalletConnect} />
                </div>
              )}
            </div>
          </section>

          {/* Events Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h3>
                <p className="text-lg text-gray-600">
                  Discover amazing events and secure your tickets on the blockchain
                </p>
              </div>

              {events.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No events available at the moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {events.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onRegister={handleEventRegister}
                      isConnected={isConnected}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        /* Organizer Dashboard */
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <OrganizerDashboard
              userAddress={userAddress}
              isApprovedOrganizer={isApprovedOrganizer}
              organizerEvents={organizerEvents}
              onCreateEvent={handleCreateEvent}
            />
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EventX?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Secure & Transparent</h4>
              <p className="text-gray-600">All transactions are recorded on the blockchain for complete transparency</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Resale Market</h4>
              <p className="text-gray-600">Safely resell your tickets with price controls and authenticity guaranteed</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Instant Transfer</h4>
              <p className="text-gray-600">Immediate ticket ownership transfer with smart contract automation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seat Selection Modal */}
      {selectedEvent && (
        <SeatSelection
          event={selectedEvent}
          onConfirm={handleSeatConfirm}
          onCancel={handleSeatCancel}
          isLoading={isLoading}
        />
      )}

      {/* Create Event Modal */}
      {showCreateModal && (
        <CreateEventModal
          onClose={() => setShowCreateModal(false)}
          onCreateEvent={handleCreateEventSubmit}
          isLoading={isLoading}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-2xl font-bold mb-4">EventX</h4>
              <p className="text-gray-400 mb-4">
                The future of event ticketing is here. Secure, transparent, and decentralized.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Platform</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EventX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
