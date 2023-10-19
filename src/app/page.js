import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/4 h-auto px-6 py-8 flex justify-center items-center border border-white bg-[rgb(0,0,0,.5)] flex-col gap-4">
        <span className="text-white text-[25px]">NEXT Authentication</span>
        <div className="flex justify-between w-full">
          <button className="outline-none border border-slate-50 py-1 px-3 hover:bg-gray-400 hover:text-black">
            <Link href="/login">
              <span>Login</span>
            </Link>
          </button>
          <button className="outline-none border border-slate-50 py-1 px-3 hover:bg-gray-400 hover:text-black">
            <Link href="/signup">
              <span>SignUp</span>
            </Link>
          </button>
        </div>
      </div>
    </main>
  );
}
