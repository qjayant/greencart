import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const statusConfig = {
  "Order Placed": {
    color: "bg-sky-50 text-sky-600 border-sky-100",
    dot: "bg-sky-400",
  },
  Pending: {
    color: "bg-amber-50 text-amber-600 border-amber-100",
    dot: "bg-amber-400",
  },
  Processing: {
    color: "bg-purple-50 text-purple-600 border-purple-100",
    dot: "bg-purple-400",
  },
  Shipped: {
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    dot: "bg-indigo-400",
  },
  Delivered: {
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    dot: "bg-emerald-400",
  },
  Cancelled: {
    color: "bg-rose-50 text-rose-500 border-rose-100",
    dot: "bg-rose-400",
  },
};

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || {
    color: "bg-slate-50 text-slate-500 border-slate-200",
    dot: "bg-slate-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${cfg.color} shadow-sm`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`}
      ></span>
      {status}
    </span>
  );
};

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency, axios, user, navigate } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-16 animate-fade-in relative min-h-[60vh]">
      {/* Decorative blobs */}
      <div
        className="absolute top-10 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent)" }}
      />
      <div
        className="absolute bottom-10 left-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #34d399, transparent)" }}
      />

      <div className="mb-10 relative z-10">
        <div className="ocean-divider mb-3 w-16" />
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
          My <span className="gradient-text">Orders</span>
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-md">
          Track, view, and manage your recent grocery deliveries.
        </p>
      </div>

      {loading ? (
        <div className="space-y-5 relative z-10 w-full max-w-4xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card rounded-[2rem] p-6 animate-pulse border border-white"
            >
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <div className="h-5 bg-slate-100 rounded-md w-32"></div>
                <div className="h-5 bg-slate-100 rounded-md w-24"></div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="h-16 w-16 bg-slate-100 rounded-2xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                  <div className="h-3 bg-slate-50 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : myOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-[2rem] max-w-2xl mx-auto relative z-10 mt-10">
          <div className="w-24 h-24 bg-gradient-to-br from-sky-50 to-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white">
            <span className="text-4xl opacity-80">📦</span>
          </div>
          <p className="text-2xl font-bold text-slate-700 mb-3">
            No orders yet
          </p>
          <p className="text-slate-500 mb-8 max-w-sm">
            You haven't placed any orders yet. Start exploring our fresh
            products today!
          </p>
          <button
            onClick={() => navigate("/products")}
            className="group px-8 py-3.5 rounded-full text-white font-bold transition-all shadow-md hover:shadow-sky-500/30 hover:-translate-y-1 flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
            }}
          >
            Start Shopping
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="space-y-6 relative z-10 max-w-4xl mx-auto">
          {myOrders.map((order, index) => (
            <div
              key={order._id || index}
              className="glass-card rounded-[2rem] overflow-hidden hover:shadow-xl hover:shadow-sky-100/40 transition-shadow border border-white"
            >
              {/* Order Header */}
              <div
                className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 px-6 md:px-8 py-5"
                style={{ background: "rgba(240, 249, 255, 0.4)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner"
                    style={{
                      background: "linear-gradient(135deg, #0ea5e9, #10b981)",
                    }}
                  >
                    <span className="text-white text-sm">📦</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">
                      Order ID
                    </p>
                    <p className="font-mono text-sm font-semibold text-slate-800">
                      #{order._id?.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm bg-white/60 px-4 py-2 rounded-xl border border-white shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Date
                    </span>
                    <span className="font-semibold text-slate-700">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Total
                    </span>
                    <span className="font-black text-primary">
                      {currency}
                      {order.amount}
                    </span>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Method
                    </span>
                    <span className="font-semibold text-slate-600">
                      {order.paymentType === "COD" ? "💵 COD" : "💳 Online"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-slate-100/50 p-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 md:px-6 py-4 hover:bg-slate-50/50 rounded-2xl transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center p-2 flex-shrink-0 shadow-inner group"
                        style={{
                          background:
                            "linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%)",
                        }}
                      >
                        <img
                          src={item.product.image[0]}
                          alt={item.product.name}
                          className="max-w-full max-h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h3
                          className="font-bold text-slate-800 text-lg leading-tight cursor-pointer hover:text-primary transition-colors"
                          onClick={() => {
                            navigate(
                              `/products/${item.product.category.toLowerCase()}/${item.product._id}`,
                            );
                            scrollTo(0, 0);
                          }}
                        >
                          {item.product.name}
                        </h3>
                        <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mt-1">
                          {item.product.category}
                        </p>
                        <p className="text-xs font-semibold text-slate-500 mt-1 bg-white px-2 py-0.5 rounded-md inline-block border border-slate-100">
                          Qty:{" "}
                          <span className="text-slate-800">
                            {item.quantity || 1}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 ml-24 sm:ml-0 bg-white/40 p-3 rounded-2xl border border-white">
                      <StatusBadge status={order.status} />
                      <p className="font-black text-slate-700 text-lg">
                        {currency}
                        {(
                          item.product.offerPrice * (item.quantity || 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
