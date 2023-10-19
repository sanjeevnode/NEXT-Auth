"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onlogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      toast.success(res.data.message, {
        duration: 800,
      });
      router.push("/profile");
      setUser({ email: "", password: "" });
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong", {
        duration: 800,
      });
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/4 h-auto px-4 py-6 flex bg-[rgba(255,255,255,.3)] flex-col gap-4 rounded-sm">
        <span className="w-full text-center text-white text-[25px]">
          {loading ? "loading..." : "Login"}
        </span>

        <div className="w-full flex flex-col gap-4 px-8">
          <div className="w-full flex flex-col gap-2">
            <label className="text-slate-100 text-[14px]" htmlFor="email">
              Email
            </label>
            <input
              className="outline-none border border-slate-50 py-1 px-3 text-black rounded-sm"
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-slate-100 text-[14px]" htmlFor="password">
              Password
            </label>
            <input
              className="outline-none border border-slate-50 py-1 px-3 text-black rounded-sm"
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <div className="flex w-full justify-center items-center">
            <button
              style={
                disabled ? { cursor: "not-allowed" } : { cursor: "pointer" }
              }
              onClick={onlogin}
              disabled={disabled}
              className="py-1 px-3 hover:bg-gray-200 hover:text-black text-white border border-white rounded-sm"
            >
              <span>Login</span>
            </button>
          </div>
        </div>
        <div>
          <Link href="/signup">
            <span className="text-blue-50 text-[14px]">
              {"Don't have an account? Sign Up"}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
