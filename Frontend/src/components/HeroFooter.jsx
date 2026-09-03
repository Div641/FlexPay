import { Link } from "react-router-dom";

function HeroFooter() {
  return (
    <footer className="w-full mt-10">
      {/* Top Banner: FlexPay for Business > */}
      <div className="w-full bg-[#eaf3ec] border-y border-emerald-100/80 px-6 lg:px-12 py-3.5 transition hover:bg-[#e1f0e4]">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm md:text-base font-bold text-emerald-900 hover:text-emerald-950 transition"
        >
          <span>FlexPay for Business</span>
          <svg
            className="w-4 h-4 text-emerald-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Deep Forest Green Footer */}
      <div className="relative w-full bg-gradient-to-b from-[#093524] via-[#082e20] to-[#041d14] text-white px-6 lg:px-12 py-12 overflow-hidden">
        {/* Ambient Background Wave SVG Lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 400"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M-100 200 C 300 100, 700 300, 1500 150"
              stroke="white"
              strokeWidth="1.5"
            />
            <path
              d="M-100 260 C 400 160, 800 360, 1500 210"
              stroke="white"
              strokeWidth="1"
            />
            <path
              d="M-100 320 C 500 220, 900 420, 1500 270"
              stroke="white"
              strokeWidth="0.8"
            />
          </svg>
        </div>

        {/* Footer Main Content Grid */}
        <div className="relative z-10 mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 p-1.5 backdrop-blur-xs">
                <img
                  src="/images/logo.png"
                  alt="FlexPay"
                  className="h-full w-full object-contain brightness-0 invert"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Flex<span className="text-[#a5f3bc]">Pay</span>
              </span>
            </div>

            <p className="text-xs font-semibold text-emerald-200/90 tracking-wide">
              FlexPay Credit Advisory Private Limited
            </p>

            <div className="text-[12px] leading-relaxed text-emerald-100/70 space-y-1">
              <p>1st Floor, Orchid Business Park, Sector 48, Gurugram</p>
              <p>Haryana 122001</p>
            </div>

            <div className="text-[12px] text-emerald-100/80 pt-1 space-y-0.5">
              <p>
                <span className="text-emerald-100/60">Contact number:</span> +91 7303323443
              </p>
              <p className="text-emerald-100/60">
                Monday to Sunday (10AM to 8PM)
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-emerald-300 tracking-wide mb-3.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80 font-normal">
              {[
                "About Us",
                "Careers",
                "FAQ",
                "Join as a EMI Store Merchant",
                "Request EMI Payment Solution",
                "Partners",
              ].map((link) => (
                <li key={link}>
                  <Link to="/" className="hover:text-white hover:underline transition">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div>
            <h4 className="text-sm font-bold text-emerald-300 tracking-wide mb-3.5">
              Support Links
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80 font-normal">
              {[
                "Return Policy",
                "Contact Us",
                "Terms and Conditions",
                "Refund Policy",
                "Privacy Policy",
                "Corporate Information",
                "Partnered Agencies",
              ].map((link) => (
                <li key={link}>
                  <Link to="/" className="hover:text-white hover:underline transition">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Download App & Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-emerald-300 tracking-wide mb-3">
              Download FlexPay Today
            </h4>

            {/* App Badges */}
            <div className="flex flex-col gap-2.5 max-w-[190px]">
              {/* Google Play */}
              <a
                href="#google-play"
                className="flex items-center gap-2 rounded-lg bg-black/80 px-3 py-2 border border-white/10 hover:border-white/30 transition hover:bg-black"
              >
                <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186A2.29 2.29 0 0 1 3 20.59V3.41c0-.623.23-1.189.609-1.596zm11.605 11.607l2.25 2.25-11.83 6.721 9.58-8.971zm0-2.842L5.634 1.608l11.83 6.721-2.25 2.25zM16.636 12l2.646-1.503a1.996 1.996 0 0 1 0 3.006L16.636 12z" />
                </svg>
                <div className="text-left">
                  <span className="block text-[8px] uppercase tracking-wider text-gray-300 leading-none">
                    GET IT ON
                  </span>
                  <span className="block text-[12px] font-bold text-white leading-tight">
                    Google Play
                  </span>
                </div>
              </a>

              {/* App Store */}
              <a
                href="#app-store"
                className="flex items-center gap-2 rounded-lg bg-black/80 px-3 py-2 border border-white/10 hover:border-white/30 transition hover:bg-black"
              >
                <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.88c.64-.78 1.08-1.86.96-2.88-1 .04-2.13.66-2.79 1.44-.59.68-1.1 1.77-.96 2.82 1.11.09 2.15-.6 2.79-1.38z" />
                </svg>
                <div className="text-left">
                  <span className="block text-[8px] uppercase tracking-wider text-gray-300 leading-none">
                    Download on the
                  </span>
                  <span className="block text-[12px] font-bold text-white leading-tight">
                    App Store
                  </span>
                </div>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                {
                  name: "Facebook",
                  svg: (
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  ),
                },
                {
                  name: "Instagram",
                  svg: (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  ),
                },
                {
                  name: "Twitter",
                  svg: (
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  ),
                },
                {
                  name: "YouTube",
                  svg: (
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  ),
                },
              ].map((soc) => (
                <a
                  key={soc.name}
                  href={`#${soc.name.toLowerCase()}`}
                  aria-label={soc.name}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-emerald-100 transition hover:bg-white hover:text-emerald-900"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    {soc.svg}
                  </svg>
                </a>
              ))}
            </div>

            <p className="text-xs text-emerald-200/60 pt-2 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#ff9933]" />
              <span>Proudly made in India</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HeroFooter;
