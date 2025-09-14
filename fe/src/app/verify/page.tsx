'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useBlockchainIntegration } from '@/hooks/useBlockchainIntegration';
import { Event } from '@/types/contract';

export default function VerifyPage() {
  const search = useSearchParams();
  const tokenIdParam = search.get('tokenId');
  const eventIdParam = search.get('eventId');
  const tokenId = useMemo(() => (tokenIdParam ? Number(tokenIdParam) : NaN), [tokenIdParam]);
  const eventId = useMemo(() => (eventIdParam ? Number(eventIdParam) : NaN), [eventIdParam]);

  const { getTicketDetailsById, getOwnerOf, getEventDetails } = useBlockchainIntegration();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'unknown' | 'valid' | 'invalid'>('unknown');
  const [message, setMessage] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [seatNumber, setSeatNumber] = useState<number | null>(null);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!tokenId || !eventId || Number.isNaN(tokenId) || Number.isNaN(eventId)) {
        setStatus('invalid');
        setMessage('Missing or invalid tokenId/eventId in the URL.');
        setLoading(false);
        return;
      }
      try {
        const details = await getTicketDetailsById(tokenId);
        if (!details) {
          setStatus('invalid');
          setMessage('Ticket not found on-chain.');
          setLoading(false);
          return;
        }
        if (Number(details.occasionId) !== Number(eventId)) {
          setStatus('invalid');
          setMessage(`Ticket does not belong to event ${eventId}.`);
          setSeatNumber(details.seatNumber);
          setLoading(false);
          return;
        }

        const currentOwner = await getOwnerOf(tokenId);
        const ev = await getEventDetails(eventId);

        setOwner(currentOwner);
        setSeatNumber(details.seatNumber);
        setEvent(ev);
        setStatus('valid');
        setMessage('This ticket is valid.');
      } catch (e) {
        console.error('Verification failed', e);
        setStatus('invalid');
        setMessage('Verification error. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [tokenId, eventId, getTicketDetailsById, getOwnerOf, getEventDetails]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">EventX</Link>
              <span className="ml-2 text-sm text-gray-500">Verify Ticket</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-gray-500 hover:text-blue-600">Events</Link>
              <Link href="/my-tickets" className="text-gray-500 hover:text-blue-600">My Tickets</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Ticket Verification</h1>
            <p className="text-gray-600 text-sm mt-1">Token #{Number.isNaN(tokenId) ? '-' : tokenId} • Event #{Number.isNaN(eventId) ? '-' : eventId}</p>
          </div>

          {loading ? (
            <p className="text-gray-500">Verifying on-chain...</p>
          ) : (
            <>
              <div className={`rounded-lg p-4 mb-6 ${status === 'valid' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`font-semibold ${status === 'valid' ? 'text-green-800' : 'text-red-800'}`}>{message}</p>
              </div>

              {status === 'valid' && (
                <div className="space-y-4">
                  {event && (
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-gray-500">Event</p>
                      <p className="text-lg font-semibold text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                      <p className="text-sm text-gray-600">{event.location}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-gray-500">Seat</p>
                      <p className="text-lg font-semibold text-gray-900">{seatNumber !== null ? `#${seatNumber + 1}` : '-'}</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-gray-500">Owner</p>
                      <p className="text-lg font-mono text-gray-900">{owner ? `${owner.slice(0,6)}...${owner.slice(-4)}` : '-'}</p>
                    </div>
                  </div>
                </div>
              )}

              {status === 'invalid' && (
                <div className="text-sm text-gray-600">
                  <p>Ensure the QR was generated for the correct event and the tokenId is valid.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
