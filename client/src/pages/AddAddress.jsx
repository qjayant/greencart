import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const InputField = ({
  type,
  placeholder,
  name,
  handleChange,
  address,
  label,
}) => (
  <div className="flex flex-col gap-1.5 relative group">
    {label && (
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">
        {label}
      </label>
    )}
    <input
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
      className="w-full px-4 py-3 bg-white/60 border border-slate-200/80 rounded-xl outline-none text-sm font-medium text-slate-700 placeholder-slate-400 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-sm hover:border-primary/40"
    />
  </div>
);

const AddAddress = () => {
  const { axios, user, navigate } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);

  return (
    <div className="mt-16 pb-16 animate-fade-in relative min-h-[70vh] flex flex-col items-center">
      {/* Background Blobs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #10b981, transparent)" }}
      />

      <div className="w-full max-w-5xl relative z-10 flex flex-col-reverse md:flex-row justify-center items-center gap-12 lg:gap-20">
        {/* Form Container */}
        <div className="flex-1 w-full max-w-lg">
          <div className="mb-8 text-center md:text-left">
            <div className="ocean-divider mb-3 w-16 mx-auto md:mx-0" />
            <p className="text-3xl md:text-4xl font-bold text-slate-800">
              Delivery <span className="gradient-text">Address</span>
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Add a new address. We'll save it for your future fast-checkouts!
            </p>
          </div>

          <form
            onSubmit={onSubmitHandler}
            className="glass-card rounded-[2rem] p-6 sm:p-8 border border-white shadow-xl shadow-sky-100/40 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="John"
                label="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Doe"
                label="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="you@example.com"
              label="Email Address"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="123 Main Street, Apt 4B"
              label="Street Address"
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="Mumbai"
                label="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="Maharashtra"
                label="State"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipcode"
                type="number"
                placeholder="400001"
                label="ZIP Code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="India"
                label="Country"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              label="Phone Number"
            />

            <button
              type="submit"
              disabled={loading}
              className="group w-full mt-6 py-4 rounded-xl text-white font-bold text-[15px] uppercase tracking-wider transition-all shadow-lg hover:shadow-sky-500/30 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #10b981)",
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
                {loading ? "Saving..." : "Save Delivery Address"}
                {!loading && (
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
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Hero Image */}
        <div className="flex-1 w-full max-w-sm md:max-w-md flex justify-center items-center drop-shadow-2xl hover:scale-105 transition-transform duration-500">
          <div className="relative">
            {/* Image background glow */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #10b981)",
              }}
            />
            <img
              className="relative z-10 w-full object-contain"
              src={assets.add_address_iamge}
              alt="Delivery Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
