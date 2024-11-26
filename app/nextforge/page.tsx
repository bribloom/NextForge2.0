// app/landingpage/page.tsx

import React from 'react';
import Link from 'next/link';

const NextForge = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b bg-neutral-900 text-white">
            {/* Hero Section */}
            <header className="flex flex-col items-center justify-center flex-grow py-20 text-center">
                <h1 className="text-5xl font-bold mb-4">Welcome to NextForge</h1>
                <p className="text-lg mb-8">Unlock your potential with our comprehensive courses and resources.</p>
                <div className="flex space-x-4">
                    <Link href="/sign-in">
                        <button className="px-6 py-3 bg-white text-black rounded-lg shadow-lg hover:bg-gray-200 transition duration-200">
                            Sign In
                        </button>
                    </Link>
                    <Link href="/sign-up">
                        <button className="px-6 py-3 border border-white rounded-lg shadow-lg hover:bg-white hover:text-black transition duration-200">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 bg-neutral-900 text-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-neutral-900 border border-white rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Comprehensive Courses</h3>
                            <p>Explore a wide range of topics and enhance your skills with our expertly designed courses.</p>
                        </div>
                        <div className="p-6 bg-neutral-900 border border-white rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                            <p>Learn from industry professionals who bring real-world experience to the classroom.</p>
                        </div>
                        <div className="p-6 bg-neutral-900 border border-white rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Community Support</h3>
                            <p>Join a vibrant community of learners and get support from peers and mentors.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="py-10 bg-neutral-900 text-center">
                <p className="text-sm">© {new Date().getFullYear()} Your Learning Platform. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default NextForge;