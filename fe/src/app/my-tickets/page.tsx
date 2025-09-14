"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import WalletConnect from "@/components/WalletConnect";
import { useBlockchainIntegration } from "@/hooks/useBlockchainIntegration";
import { Event } from "@/types/contract";

interface OwnedTicket {
  tokenId: number;
  occasionId: number;
  seatNumber: number;
  event?: Event | null;
}

export default function MyTicketsPage() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<OwnedTicket[]>([]);
  const { getTicketsByOwner, getEventDetails } = useBlockchainIntegration();

  const handleConnect = async (address: string) => {
    setWalletAddress(address);
    setIsConnected(true);
  };

  const loadTickets = async (address: string) => {
    setLoading(true);
    try {
      const mine = await getTicketsByOwner(address);
      // Enrich with event details
      const enriched: OwnedTicket[] = [];
      for (const t of mine) {
        const ev = await getEventDetails(t.occasionId);
        enriched.push({ ...t, event: ev });
      }
      setTickets(enriched);
    } catch (e) {
      console.error("Failed to load tickets", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && walletAddress) {
      loadTickets(walletAddress);
    }
  }, [isConnected, walletAddress]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">EventX</Link>
              <span className="ml-2 text-sm text-gray-500">My Tickets</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-500 hover:text-blue-600">Events</Link>
              <WalletConnect onConnect={handleConnect} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!isConnected ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Connect your wallet</h2>
            <p className="text-gray-600">Connect to view the tickets you own.</p>
            <div className="mt-6 inline-block">
              <WalletConnect onConnect={handleConnect} />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">Your Tickets</h2>
                <p className="text-sm text-gray-500 font-mono">{walletAddress.slice(0,6)}...{walletAddress.slice(-4)}</p>
              </div>
              <button
                onClick={() => loadTickets(walletAddress)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading your tickets...</p>
            ) : tickets.length === 0 ? (
              <div className="text-center text-gray-600 py-10">
                <p>No tickets found for this wallet.</p>
                <p className="text-sm mt-2">Purchase a ticket from the Events page and check back here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((t) => (
                  <div key={t.tokenId} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900">Ticket #{t.tokenId}</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Seat {t.seatNumber + 1}</span>
                    </div>
                    {t.event ? (
                      <>
                        <p className="text-gray-800 font-medium">{t.event.title}</p>
                        <p className="text-sm text-gray-600">{t.event.date} at {t.event.time}</p>
                        <p className="text-sm text-gray-600">{t.event.location}</p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">Loading event details...</p>
                    )}
                    <div className="mt-4 text-sm text-gray-500">
                      <p>Event ID: {t.occasionId}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
