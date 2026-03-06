import React, { useState } from "react";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    toast.success("Thanks for subscribing! 🎉");
    setEmail("");
  };

  return (
    <div
      className="mt-24 relative overflow-hidden rounded-3xl"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #0c4a6e 50%, #064e3b 100%)",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent)" }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #34d399, transparent)" }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full opacity-8"
        style={{
          background: "radial-gradient(circle, #a78bfa, transparent)",
          transform: "translateY(-50%)",
        }}
      />

      <div className="relative flex flex-col items-center justify-center text-center py-16 px-6">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(14,165,233,0.3), rgba(16,185,129,0.3))",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <span className="text-3xl">🌊</span>
        </div>

        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
          style={{
            background: "linear-gradient(to right, #67e8f9, #6ee7b7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Stay in the Loop
        </p>

        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
          Never Miss a{" "}
          <span
            style={{
              background: "linear-gradient(to right, #38bdf8, #34d399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Deal!
          </span>
        </h2>
        <p
          className="text-sm md:text-base max-w-md mb-8"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Subscribe to get the latest offers, new arrivals, and exclusive weekly
          discounts delivered to your inbox.
        </p>

        {subscribed ? (
          <div
            className="px-8 py-4 rounded-2xl text-center animate-fade-in-scale"
            style={{
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.3)",
            }}
          >
            <p className="text-2xl mb-2">✅</p>
            <p className="text-emerald-400 font-bold">
              You're in! Welcome to the community.
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Look out for your first deal in your inbox.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 w-full px-5 py-3 rounded-full outline-none text-sm font-medium"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
              }}
            />
            <button
              type="submit"
              className="w-full sm:w-auto rounded-full px-7 py-3 text-sm font-semibold text-white whitespace-nowrap transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #10b981)",
                boxShadow: "0 6px 20px rgba(14,165,233,0.4)",
              }}
            >
              Subscribe →
            </button>
          </form>
        )}

        <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          🔒 No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default NewsLetter;
