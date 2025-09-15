'use client';

import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">Evvnt</Link>
              <span className="ml-2 text-sm text-gray-500">Decentralized Ticketing</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Events
              </Link>
              <Link href="/about" className="text-gray-900 hover:text-blue-600 font-medium">
                About
              </Link>
              <Link href="/how-it-works" className="text-gray-500 hover:text-blue-600">
                How It Works
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Evvnt</h1>
          <p className="text-xl md:text-2xl text-blue-100">
            Revolutionizing event ticketing through blockchain technology
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              Evvnt is a decentralized event ticketing platform built on blockchain technology. 
              We're committed to solving the fundamental problems in the traditional ticketing industry: 
              fraud, scalping, lack of transparency, and unfair pricing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Provide secure, blockchain-based event ticketing</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Enable transparent and fair ticket resale markets</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Eliminate ticket fraud through NFT technology</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Empower event organizers with better tools</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Blockchain?</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Transparency:</strong> All transactions are publicly verifiable</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Security:</strong> Immutable records prevent fraud</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Ownership:</strong> True digital ownership of tickets</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Automation:</strong> Smart contracts handle transactions</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">NFT Tickets</h3>
                <p className="text-gray-600">Each ticket is a unique NFT, ensuring authenticity and preventing counterfeiting.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Resale Market</h3>
                <p className="text-gray-600">Built-in marketplace for safe ticket reselling with price controls and authenticity guarantees.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Contracts</h3>
                <p className="text-gray-600">Automated, trustless transactions powered by Ethereum smart contracts.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">Smart Contract Functions</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4">Core Contract Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Event Management</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <code className="bg-gray-200 px-1 rounded">list()</code> - Create new events</li>
                    <li>• <code className="bg-gray-200 px-1 rounded">getEventDetails()</code> - Retrieve event information</li>
                    <li>• <code className="bg-gray-200 px-1 rounded">approveOrganizer()</code> - Manage event organizers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ticket Operations</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <code className="bg-gray-200 px-1 rounded">mint()</code> - Purchase tickets</li>
                    <li>• <code className="bg-gray-200 px-1 rounded">listTicketForSale()</code> - List for resale</li>
                    <li>• <code className="bg-gray-200 px-1 rounded">buyResaleTicket()</code> - Purchase resale tickets</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Vision</h2>
            <p className="text-lg text-gray-600 mb-8">
              We envision a future where event ticketing is completely transparent, secure, and fair for everyone. 
              By leveraging blockchain technology, we're building a platform that benefits event organizers, 
              attendees, and the entire event ecosystem.
            </p>

            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Join the Revolution</h3>
              <p className="text-blue-700 mb-6">
                Be part of the future of event ticketing. Experience the security, transparency, 
                and fairness that blockchain technology brings to the industry.
              </p>
              <Link 
                href="/"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore Events
              </Link>
            </div>
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
            <p>&copy; 2025 Evvnt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
