// app/landing/page.tsx

import { SignIn, SignUp } from "@clerk/nextjs";
import Link from "next/link";

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to NextForge</h1>
            <p className="text-lg mb-8">Join us and explore amazing courses.</p>
            <div className="flex space-x-4">
                <Link href="/sign-in">
                    <button className="px-6 py-3 bg-emerald-500 text-black rounded-md hover:bg-emerald-400 transition">
                        Sign In
                    </button>
                </Link>
                <Link href="/sign-up">
                    <button className="px-6 py-3 border-2 border-emerald-500 text-emerald-500 rounded-md hover:bg-emerald-500 hover:text-black transition">
                        Sign Up
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;