import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { assets } from "../assets/assets";

const Loading = () => {
  const { navigate } = useAppContext();
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 3000);
    }
  }, [nextUrl]);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5 bg-white">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <img
          src={assets.logo}
          alt="GreenCart"
          className="h-10 opacity-70 animate-pulse"
        />
        <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-gray-200 border-t-primary"></div>
        <p className="text-sm text-gray-400 animate-pulse">
          Processing your order...
        </p>
      </div>
    </div>
  );
};

export default Loading;
