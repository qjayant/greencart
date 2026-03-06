import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });
      if (data.success) {
        navigate("/");
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center text-sm bg-slate-900/60 backdrop-blur-md px-4"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col gap-5 items-start p-8 py-10 w-full max-w-[400px] rounded-[2.5rem] shadow-2xl border border-white/40 overflow-hidden animate-fade-in-scale"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,249,255,0.95) 100%)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Decorative corner blobs */}
        <div
          className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #0ea5e9, transparent)",
          }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #10b981, transparent)",
          }}
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowUserLogin(false)}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
        >
          ✕
        </button>

        {/* Header */}
        <div className="w-full text-center mb-2 relative z-10">
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-inner border border-white"
            style={{ background: "linear-gradient(135deg, #e0f2fe, #ecfdf5)" }}
          >
            <img
              src={assets.logo}
              alt="GreenCart"
              className="h-6 brightness-110 drop-shadow-sm"
            />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {state === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {state === "login"
              ? "Sign in to your GreenCart account"
              : "Join thousands of fresh food lovers"}
          </p>
        </div>

        <div className="w-full space-y-4 relative z-10 mt-2">
          {/* Name (Register only) */}
          {state === "register" && (
            <div className="w-full group">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">
                Full Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Your full name"
                className="w-full px-4 py-3 bg-white border border-slate-200/80 rounded-2xl outline-none text-sm font-medium text-slate-700 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-sm"
                type="text"
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="w-full group">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="you@email.com"
              className="w-full px-4 py-3 bg-white border border-slate-200/80 rounded-2xl outline-none text-sm font-medium text-slate-700 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-sm"
              type="email"
              required
            />
          </div>

          {/* Password */}
          <div className="w-full group">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">
                Password
              </label>
              {state === "login" && (
                <a
                  href="#"
                  className="text-[11px] font-bold text-primary hover:text-emerald-500 transition-colors"
                >
                  Forgot?
                </a>
              )}
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white border border-slate-200/80 rounded-2xl outline-none text-sm font-medium text-slate-700 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-sm"
              type="password"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="group w-full py-4 mt-2 rounded-2xl text-white font-bold text-[15px] uppercase tracking-wider transition-all shadow-lg hover:shadow-sky-500/30 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 relative overflow-hidden z-10"
          style={{ background: "linear-gradient(135deg, #0ea5e9, #10b981)" }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
            }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <svg
                className="animate-spin w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12z"
                ></path>
              </svg>
            ) : state === "register" ? (
              "Create Account"
            ) : (
              "Sign In to GreenCart"
            )}
          </span>
        </button>

        {/* Toggle */}
        <p className="text-[13px] text-slate-500 text-center w-full relative z-10 font-medium">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setState("login");
                  setName("");
                  setPassword("");
                  setEmail("");
                }}
                className="text-primary cursor-pointer font-bold hover:text-emerald-500 transition-colors"
              >
                Sign in instead
              </span>
            </>
          ) : (
            <>
              New to GreenCart?{" "}
              <span
                onClick={() => {
                  setState("register");
                  setName("");
                  setPassword("");
                  setEmail("");
                }}
                className="text-primary cursor-pointer font-bold hover:text-emerald-500 transition-colors"
              >
                Create account
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
