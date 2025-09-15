'use client';

import Link from 'next/link';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">Evnnt</Link>
              <span className="ml-2 text-sm text-gray-500">Decentralized Ticketing</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Events
              </Link>
              <Link href="/about" className="text-gray-500 hover:text-blue-600">
                About
              </Link>
              <Link href="/how-it-works" className="text-gray-900 hover:text-blue-600 font-medium">
                How It Works
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">How It Works</h1>
          <p className="text-xl md:text-2xl text-blue-100">
            Simple steps to secure, transparent event ticketing
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Started</h2>
            <p className="text-lg text-gray-600">Follow these simple steps to start using Evvnt</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Wallet</h3>
              <p className="text-gray-600">
                Connect your MetaMask or compatible Web3 wallet to get started
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Events</h3>
              <p className="text-gray-600">
                Explore available events and find the perfect experience for you
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Seat</h3>
              <p className="text-gray-600">
                Choose your preferred seat from the interactive seating chart
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Get NFT Ticket</h3>
              <p className="text-gray-600">
                Receive your unique NFT ticket directly in your wallet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Event Organizers */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Event Organizers</h2>
            <p className="text-lg text-gray-600">Create and manage events with powerful blockchain tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Events</h3>
              <p className="text-gray-600 mb-4">
                Use the <code className="bg-gray-200 px-1 rounded text-sm">list()</code> function to create new events with:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Event title and description</li>
                <li>• Ticket price in ETH</li>
                <li>• Maximum number of tickets</li>
                <li>• Date, time, and location</li>
                <li>• Maximum resale price limit</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Sales</h3>
              <p className="text-gray-600 mb-4">
                Monitor your event performance with real-time data:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tickets sold vs available</li>
                <li>• Revenue tracking</li>
                <li>• Seat assignments</li>
                <li>• Resale activity</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Withdraw Funds</h3>
              <p className="text-gray-600 mb-4">
                Secure and instant payment processing:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Automatic ETH collection</li>
                <li>• Instant withdrawals</li>
                <li>• Transparent fee structure</li>
                <li>• Smart contract security</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Contract Functions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Contract Functions</h2>
            <p className="text-lg text-gray-600">Understanding the blockchain technology behind Evvnt</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Functions</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2">
                    <code className="bg-gray-100 px-2 py-1 rounded">mint(eventId, seatNumber)</code>
                  </h4>
                  <p className="text-gray-600">
                    Purchase a ticket for a specific event and seat. Creates an NFT ticket and assigns ownership.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2">
                    <code className="bg-gray-100 px-2 py-1 rounded">listTicketForSale(tokenId, price)</code>
                  </h4>
                  <p className="text-gray-600">
                    List your ticket for resale at a specified price (within maximum resale limits).
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2">
                    <code className="bg-gray-100 px-2 py-1 rounded">buyResaleTicket(tokenId)</code>
                  </h4>
                  <p className="text-gray-600">
                    Purchase a ticket from the resale market with automatic ownership transfer.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2">
                    <code className="bg-gray-100 px-2 py-1 rounded">getEventDetails(eventId)</code>
                  </h4>
                  <p className="text-gray-600">
                    Retrieve comprehensive information about any event including pricing and availability.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Security Features</h3>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-blue-900">Access Control</h4>
                  <p className="text-blue-700">
                    Only approved organizers can create events. Ticket owners have exclusive control over their NFTs.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-green-900">Price Protection</h4>
                  <p className="text-green-700">
                    Maximum resale prices prevent excessive scalping while allowing fair market pricing.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-purple-900">Fraud Prevention</h4>
                  <p className="text-purple-700">
                    NFT technology ensures each ticket is unique and cannot be counterfeited or duplicated.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-orange-900">Transparent Tracking</h4>
                  <p className="text-orange-700">
                    All transactions are recorded on-chain, providing complete transparency and audit trails.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resale Market */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ticket Resale Market</h2>
            <p className="text-lg text-gray-600">Safe and fair ticket trading for everyone</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How Resale Works</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">List Your Ticket</h4>
                    <p className="text-gray-600">Set your resale price within the event's maximum limit</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Automatic Matching</h4>
                    <p className="text-gray-600">Buyers can instantly purchase your listed ticket</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Instant Transfer</h4>
                    <p className="text-gray-600">Smart contract handles payment and ownership transfer</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Verified Authenticity</h4>
                    <p className="text-gray-600">NFT technology guarantees ticket authenticity</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Resale Benefits</h3>
              
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No fake tickets - NFT verification</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Price protection against scalping</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Instant payment and transfer</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Complete transaction transparency</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No intermediary fees</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience the Future?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who trust Evvnt for secure, transparent event ticketing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Events
            </Link>
            <Link 
              href="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-2xl font-bold mb-4">Evvnt</h4>
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
            <p>&copy; 2024 Evvnt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
