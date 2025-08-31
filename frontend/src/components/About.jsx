import React from 'react';
import { Link } from 'react-router';
import QRCode from "react-qr-code"

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4 mt-12">About Our URL Shortener</h1>
          <p className="text-xl text-gray-600">
            Fast, reliable, and secure URL shortening service
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800">Lightning Fast</h3>
              </div>
              <p className="text-gray-600">
                Our servers are optimized to handle millions of requests with minimal latency,
                ensuring your shortened links are always available.
              </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800">Secure Links</h3>
              </div>
              <p className="text-gray-600">
                All shortened URLs are encrypted and protected against malicious activities.
                We monitor for suspicious behavior to keep your links safe.
              </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800">Reliable Service</h3>
              </div>
              <p className="text-gray-600">
                99.9% uptime guarantee with redundant infrastructure to ensure your links
                are always accessible when you need them.
              </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800">Analytics</h3>
              </div>
              <p className="text-gray-600">
                Track clicks, geographic locations, and referral sources with our
                comprehensive analytics dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6">How It Works</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3 mr-4">
                <span className="text-indigo-800 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Paste Your Long URL</h3>
                <p className="text-gray-600">
                  Enter your long web address in the input field on our homepage.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3 mr-4">
                <span className="text-indigo-800 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Generate Short Link</h3>
                <p className="text-gray-600">
                  Click the "Shorten" button and we'll instantly create a compact version of your URL.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3 mr-4">
                <span className="text-indigo-800 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Share Your Link</h3>
                <p className="text-gray-600">
                  Copy and share your shortened URL via email, social media, or anywhere you need.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start mt-5">
            <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3 mr-4">
              <span className="text-indigo-800 font-bold">4</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Use the QR Code</h3>
              <p className="text-gray-600">
                Every shortened link comes with a QR code. You can scan it directly from your phone
                to access the link instantly, making sharing even more convenient.
              </p>
              <div className="mt-4 flex justify-center">
                {/* Example QR Code for demo purpose */}
                <QRCode value="https://your-short-url-demo.com/xyz123" size={120} />
              </div>
            </div>
          </div>

        </div>

        <div className="bg-indigo-700 rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-indigo-100 mb-6">
            Join thousands of satisfied users who trust our service for their URL shortening needs.
          </p>
          <Link to="/">
            <button className="bg-white text-indigo-700 cursor-pointer font-bold py-3 px-8 rounded-lg hover:bg-indigo-50 transition duration-300">
              Shorten a URL Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;