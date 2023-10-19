"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const UserProfile = ({ params }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/resetpasswordemail", {
        userId: params.id,
      });
      toast.success(res.data.message, {
        duration: 1000,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        duration: 1000,
      });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <span className="text-[20px]">Profile</span>
        <span className="text-[25px]">Profile id : {params.id}</span>
        <button
          onClick={handleReset}
          className="px-3 py-1 border border-slate-50 text-white hover:text-black hover:bg-slate-50 cursor-pointer"
        >
          <span>Reset Password</span>
        </button>
        {loading && <span className="w-full text-center">processing....</span>}
      </div>
    </div>
  );
};

export default UserProfile;
