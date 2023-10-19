"use client";

import axios from "axios";
import { set } from "mongoose";
import Link from "next/link";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      const res = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="w-screen h-screen flex justify-center items-start">
      <div className="w-1/3 h-auto py-4 px-6 flex flex-col gap-4">
        <span className="text-[18px] text-white">Verify Email</span>

        <span className="text-[18px] text-green-500">
          {token.length > 0 ? token : "No token found"}
        </span>
        {verified && (
          <>
            <span className="text-[18px] text-green-500">
              Email verified successfully
            </span>

            <Link href="/login">
              <span className="text-[18px] text-white">Login</span>
            </Link>
          </>
        )}

        {error && (
          <span className="text-[18px] text-red-500">
            Error verifying email
          </span>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
