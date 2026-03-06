import React from "react";
import { assets, footerLinks } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="mt-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #0c1e3d 60%, #022c22 100%)",
      }}
    >
      {/* Decorative background shapes */}
      <div
        className="absolute top-0 left-0 w-full h-0.5"
        style={{
          background:
            "linear-gradient(to right, transparent, #0ea5e9, #10b981, transparent)",
        }}
      />
      <div
        className="absolute -top-24 left-1/4 w-64 h-64 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }}
      />
      <div
        className="absolute -bottom-24 right-1/4 w-64 h-64 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #10b981, transparent)" }}
      />

      <div className="relative px-6 md:px-16 lg:px-24 xl:px-32 pt-14 pb-8">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="flex-1 min-w-0 max-w-xs">
            <div className="mb-4">
              <img
                src={assets.logo}
                alt="GreenCart"
                className="h-9 brightness-200"
              />
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              We deliver fresh groceries and artisan snacks straight to your
              door. Trusted by thousands — making healthy shopping simple and
              affordable.
            </p>
            {/* Social Buttons */}
            <div className="flex gap-3">
              {[
                { letter: "in", color: "#0077b5" },
                { letter: "TW", color: "#1da1f2" },
                { letter: "FB", color: "#1877f2" },
                { letter: "YT", color: "#ff0000" },
              ].map(({ letter, color }) => (
                <button
                  key={letter}
                  className="w-9 h-9 rounded-xl text-xs font-bold transition-all hover:scale-110 hover:-translate-y-0.5 flex items-center justify-center"
                  style={{
                    background: `${color}20`,
                    color,
                    border: `1px solid ${color}30`,
                  }}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-1 flex-wrap gap-10 md:gap-16">
            {footerLinks.map((section, i) => (
              <div key={i}>
                <h3
                  className="font-bold text-xs uppercase tracking-widest mb-5"
                  style={{
                    background: "linear-gradient(to right, #38bdf8, #34d399)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        to={link.url}
                        className="text-sm transition-all hover:translate-x-1 inline-block"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#38bdf8";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "rgba(255,255,255,0.5)";
                        }}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <p>
            Copyright {new Date().getFullYear()} © GreenCart by Jayant. All
            rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="#" className="hover:text-sky-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-sky-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-sky-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
