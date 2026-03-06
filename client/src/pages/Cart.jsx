import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) tempArray.push({ ...product, quantity: cartItems[key] });
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) setSelectedAddress(data.addresses[0]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress)
        return toast.error("Please select a delivery address");
      setIsPlacingOrder(true);

      const endpoint =
        paymentOption === "COD" ? "/api/order/cod" : "/api/order/stripe";
      const { data } = await axios.post(endpoint, {
        userId: user._id,
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: selectedAddress._id,
      });

      if (data.success) {
        if (paymentOption === "COD") {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          window.location.replace(data.url);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const removeItem = (itemId) => {
    let cartData = structuredClone(cartItems);
    delete cartData[itemId];
    setCartItems(cartData);
    toast.success("Item removed from cart");
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) getCart();
  }, [products, cartItems]);
  useEffect(() => {
    if (user) getUserAddress();
  }, [user]);

  const tax = Math.round(getCartAmount() * 2) / 100;
  const total = getCartAmount() + tax;

  // Empty cart
  if (products.length > 0 && Object.keys(cartItems).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] mt-10 text-center animate-fade-in relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #0ea5e9, transparent)",
          }}
        />

        <div className="glass-card p-12 rounded-[2rem] flex flex-col items-center max-w-md w-full relative z-10">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner"
            style={{
              background: "linear-gradient(135deg, #e0f2fe 0%, #ecfdf5 100%)",
            }}
          >
            <span className="text-4xl opacity-80">🛒</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-3">
            Your cart is empty
          </h2>
          <p className="text-slate-500 mb-8 max-w-xs">
            Looks like you haven't added anything to your cart yet. Discover
            fresh products today!
          </p>
          <button
            onClick={() => navigate("/products")}
            className="group w-full py-4 rounded-full text-white font-bold text-lg transition-all shadow-lg hover:shadow-sky-500/30 hover:-translate-y-1 flex items-center justify-center gap-2"
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
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col lg:flex-row mt-12 gap-10 animate-fade-in relative pb-16">
      <div
        className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #34d399, transparent)" }}
      />

      {/* Cart Items */}
      <div className="flex-1 relative z-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="ocean-divider mb-3 w-16" />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              <span className="gradient-text">Shopping</span> Cart
            </h1>
          </div>
          <span
            className="text-sm font-bold text-white px-4 py-1.5 rounded-full shadow-sm"
            style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)" }}
          >
            {getCartCount()} item{getCartCount() !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_auto] text-xs font-bold uppercase tracking-widest text-slate-400 pb-4 border-b border-slate-200/60 px-4">
          <p>Product</p>
          <p className="text-center">Qty</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Remove</p>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {cartArray.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-[2fr_1fr_1fr_auto] items-center p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm hover:shadow-md transition-all"
            >
              {/* Product */}
              <div className="flex items-center gap-4">
                <div
                  onClick={() => {
                    navigate(
                      `/products/${product.category.toLowerCase()}/${product._id}`,
                    );
                    scrollTo(0, 0);
                  }}
                  className="cursor-pointer w-20 h-20 flex items-center justify-center bg-gradient-to-br from-sky-50 to-emerald-50 rounded-xl flex-shrink-0 p-2 shadow-inner group"
                >
                  <img
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
                    src={product.image[0]}
                    alt={product.name}
                  />
                </div>
                <div className="min-w-0 pr-2">
                  <p
                    className="font-bold text-slate-800 truncate text-base hover:text-primary transition-colors cursor-pointer"
                    onClick={() => {
                      navigate(
                        `/products/${product.category.toLowerCase()}/${product._id}`,
                      );
                      scrollTo(0, 0);
                    }}
                  >
                    {product.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-primary/60 mt-0.5">
                    {product.category}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-bold text-slate-700">
                      {currency}
                      {product.offerPrice}
                    </p>
                    {product.price !== product.offerPrice && (
                      <span className="line-through text-slate-400 text-xs font-medium">
                        {currency}
                        {product.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Qty */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  <select
                    onChange={(e) =>
                      updateCartItem(product._id, Number(e.target.value))
                    }
                    value={cartItems[product._id]}
                    className="appearance-none font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-xl pl-4 pr-10 py-2 outline-none hover:border-primary/50 focus:border-primary transition-colors cursor-pointer shadow-sm"
                  >
                    {Array(Math.max(cartItems[product._id], 15))
                      .fill("")
                      .map((_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    ▼
                  </span>
                </div>
              </div>

              {/* Subtotal */}
              <p className="text-center font-bold text-primary text-lg ml-2">
                {currency}
                {(product.offerPrice * product.quantity).toFixed(2)}
              </p>

              {/* Remove */}
              <button
                onClick={() => removeItem(product._id)}
                className="mx-auto mx-2 w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm group"
                title="Remove item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group flex items-center mt-8 gap-2 font-bold text-slate-600 hover:text-primary transition-colors hover:bg-white px-5 py-2.5 rounded-full shadow-sm hover:shadow-md border border-transparent hover:border-slate-200"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Continue Shopping
        </button>
      </div>

      {/* Order Summary */}
      <div className="lg:max-w-[400px] w-full relative z-10">
        <div className="glass-card rounded-[2rem] p-7 sticky top-28 shadow-xl shadow-sky-100/50 border border-white">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">🧾</span> Order Summary
          </h2>

          {/* Delivery Address */}
          <div className="mb-6 bg-white/50 p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Delivery Address
              </p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-[11px] font-bold text-primary uppercase tracking-wider hover:text-emerald-500 transition-colors"
              >
                {selectedAddress ? "Change" : "Select"}
              </button>
            </div>

            <div className="relative">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {selectedAddress ? (
                    `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                  ) : (
                    <span className="text-slate-400 italic">
                      No address selected
                    </span>
                  )}
                </p>
              </div>

              {/* Address Dropdown */}
              {showAddress && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-xl text-sm z-20 overflow-hidden animate-slide-down">
                  {addresses.map((address, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedAddress(address);
                        setShowAddress(false);
                      }}
                      className="px-4 py-3 hover:bg-sky-50 cursor-pointer border-b border-slate-100 last:border-0 transition-colors flex items-start gap-3"
                    >
                      <input
                        type="radio"
                        checked={selectedAddress?._id === address._id}
                        readOnly
                        className="mt-1 accent-primary"
                      />
                      <p className="font-medium text-slate-700">
                        {address.street}, {address.city}, {address.state}
                      </p>
                    </div>
                  ))}
                  <button
                    onClick={() => navigate("/add-address")}
                    className="w-full text-center font-bold text-primary bg-slate-50 px-4 py-3 hover:bg-sky-50 transition-colors"
                  >
                    + Add New Address
                  </button>
                </div>
              )}
            </div>

            {!user && (
              <p className="text-xs font-bold text-rose-500 bg-rose-50 px-3 py-2 rounded-xl mt-3 text-center border border-rose-100">
                Please login to select a delivery address
              </p>
            )}
          </div>

          {/* Payment Method */}
          <div className="mb-6 bg-white/50 p-4 rounded-2xl border border-slate-100 shadow-sm relative">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              Payment Method
            </p>
            <div className="relative">
              <select
                onChange={(e) => setPaymentOption(e.target.value)}
                value={paymentOption}
                className="w-full appearance-none bg-white border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none hover:border-primary/50 focus:border-primary transition-colors cursor-pointer shadow-sm"
              >
                <option value="COD">💵 Cash On Delivery</option>
                <option value="Online">💳 Online Payment (Card)</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-bold">
                ▼
              </span>
            </div>
          </div>

          <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          {/* Price Breakdown */}
          <div className="space-y-3.5 mb-6">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-500">
              <span>Subtotal</span>
              <span className="text-slate-800">
                {currency}
                {getCartAmount().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm font-semibold text-slate-500">
              <span>Shipping</span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                Free
              </span>
            </div>
            <div className="flex justify-between items-center text-sm font-semibold text-slate-500">
              <span>Tax (2%)</span>
              <span className="text-slate-800">
                {currency}
                {tax.toFixed(2)}
              </span>
            </div>

            <div className="pt-4 border-t border-slate-200 border-dashed flex justify-between items-end">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Total Amount
              </span>
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500 drop-shadow-sm">
                {currency}
                {total.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={isPlacingOrder || !user}
            className="group w-full py-4 relative overflow-hidden text-white font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
              }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isPlacingOrder
                ? "Processing Order..."
                : paymentOption === "COD"
                  ? "Place Order 📦"
                  : "Proceed to Payment 💳"}
            </span>
          </button>

          {!user && (
            <p className="text-center text-xs font-semibold text-slate-400 mt-4 bg-white py-2 rounded-xl">
              Please{" "}
              <button
                onClick={() => {}}
                className="text-primary hover:text-emerald-500 transition-colors uppercase tracking-wider"
              >
                login
              </button>{" "}
              to place order
            </p>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;
