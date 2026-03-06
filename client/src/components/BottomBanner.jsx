import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div
      className="mt-24 relative overflow-hidden rounded-3xl"
      style={{
        background:
          "linear-gradient(135deg, #0c4a6e 0%, #0e7490 40%, #065f46 100%)",
      }}
    >
      {/* Decorative blobs inside banner */}
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent)" }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #34d399, transparent)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 opacity-10"
        style={{ background: "radial-gradient(ellipse, #67e8f9, transparent)" }}
      />

      <div className="relative px-8 md:px-14 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="inline-block mb-3 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            Why Choose GreenCart
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Everything You Need,{" "}
            <span
              style={{
                background: "linear-gradient(to right, #67e8f9, #6ee7b7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Delivered
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(14,165,233,0.3) 0%, rgba(16,185,129,0.3) 100%)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <img
                  className="w-7 h-7 brightness-[5]"
                  src={feature.icon}
                  alt={feature.title}
                />
              </div>
              <div>
                <p className="font-bold text-white mb-1">{feature.title}</p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
