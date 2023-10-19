"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const Layout = ({ children }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");

      router.push("/");
    } catch (error) {
      toast.error("Error in Logout", {
        duration: 1000,
      });
    }
  };
  return (
    <>
      <div className=" fixed w-full h-[50px] flex justify-between p-20 py-1  items-center bg-[rgb(56,56,56)]">
        <span className="text-[20px] text-slate-50">Profile</span>
        <button
          onClick={handleLogout}
          className="py-1 px-3 outline-none border border-slate-50 text-white hover:bg-slate-50 hover:text-black cursor-pointer"
        >
          <span className="text-[18px]">Logout</span>
        </button>
      </div>
      {children}
    </>
  );
};

export default Layout;
