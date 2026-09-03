import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ searchQuery = "", onSearchChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#083022] via-[#0b3a2a] to-[#052418] shadow-md border-b border-emerald-950/40">
      <div className="mx-auto flex h-18 max-w-[1520px] items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Left: Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <img
            src="/images/logo.png"
            alt="FlexPay Logo"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            FlexPay
          </span>
        </Link>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-emerald-200/70">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.2"
                  d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder="Search for power banks, mobiles, electronics..."
              className="w-full rounded-full bg-[#164332] py-2.5 pl-10 pr-4 text-sm text-white placeholder-emerald-100/60 border border-emerald-800/60 transition focus:border-emerald-400 focus:bg-[#1a4e3b] focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* For Business */}
          <Link
            to="/"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            <svg
              className="h-4 w-4 text-emerald-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>For Business</span>
          </Link>

          {/* Pay EMI */}
          <Link
            to="/"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            <svg
              className="h-4 w-4 text-emerald-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <span>Pay EMI</span>
          </Link>

          {/* Sign Up Button */}
          <button
            type="button"
            className="rounded-full bg-[#d2f37c] px-5 py-2 text-sm font-bold text-gray-950 shadow-sm transition hover:bg-[#c2e865] hover:shadow active:scale-95"
          >
            Sign Up
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white p-1"
            aria-label="Toggle Navigation Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile search bar dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-800/60 bg-[#07281c] px-4 py-3 space-y-3">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-200/70">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder="Search for power banks, mobiles, electronics..."
              className="w-full rounded-full bg-[#133c2d] py-2 pl-9 pr-4 text-xs text-white placeholder-emerald-200/50 border border-emerald-700/60 focus:outline-none"
            />
          </div>
          <div className="flex justify-around pt-1 text-xs text-white font-medium">
            <Link to="/" className="flex items-center gap-1.5 py-1">
              <span>🏢 For Business</span>
            </Link>
            <Link to="/" className="flex items-center gap-1.5 py-1">
              <span>💳 Pay EMI</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;