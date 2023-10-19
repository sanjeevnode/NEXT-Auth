"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState({
    pass: "",
    cpass: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (password.pass.length > 0 && password.cpass.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password]);

  const handleReset = async () => {
    try {
      setLoading(true);
      if (password.pass !== password.cpass) {
        setLoading(false);
        return toast.error("Passwords do not match", {
          duration: 1000,
        });
      }

      const urlToken = window.location.search.split("=")[1];
      const res = await axios.post("/api/users/resetpassword", {
        token: urlToken,
        password: password.pass,
      });
      setLoading(false);
      toast.success("Password reset successful", {
        duration: 1000,
      });
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      setLoading(false);
      toast.error("Something went Wromg", {
        duration: 1000,
      });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/3 h-auto py-8 px-4 flex flex-col gap-4 bg-[rgba(255,255,255,.3)] rounded-sm">
        <span className="w-full text-center text-[25px] text-orange-500">
          {loading ? "Processing..." : "Reset Password"}
        </span>
        <div className="w-full flex flex-col gap-4 px-8">
          <div className="w-full flex flex-col gap-2 justify-start">
            <label className="text-slate-100 text-[14px]" htmlFor="password">
              Password
            </label>
            <input
              className="outline-none border border-slate-50 py-1 px-3 text-black rounded-sm"
              type="text"
              id="password"
              name="password"
              value={password.pass}
              onChange={(e) =>
                setPassword({ ...password, pass: e.target.value })
              }
            />
          </div>
          <div className="w-full flex flex-col gap-2 justify-start">
            <label
              className="text-slate-100 text-[14px]"
              htmlFor="confirmpassword"
            >
              Confirm Password
            </label>
            <input
              className="outline-none border border-slate-50 py-1 px-3 text-black rounded-sm"
              type="text"
              id="confirmpassword"
              name="confirmpassword"
              value={password.cpass}
              onChange={(e) =>
                setPassword({ ...password, cpass: e.target.value })
              }
            />
          </div>

          <div className="flex w-full justify-center items-center">
            <button
              style={
                disabled ? { cursor: "not-allowed" } : { cursor: "pointer" }
              }
              onClick={handleReset}
              disabled={disabled}
              className="py-1 px-3 hover:bg-gray-200 hover:text-black text-white border border-white rounded-sm"
            >
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
