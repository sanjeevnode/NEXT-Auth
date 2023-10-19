"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const router = useRouter();
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/details");
      router.push(`/profile/${res.data.user._id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="w-screen h-screen pt-[50px]">
      <p className="text-5xl text-orange-500">Profile</p>
    </div>
  );
};

export default Profile;
