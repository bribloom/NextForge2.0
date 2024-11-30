// app/landingpage/page.tsx

import React from 'react';
import Link from 'next/link';
import { Logo } from '../(dashboard)/_components/logohome';

const NextForge = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b bg-neutral-900 text-white">
            {/* Hero Section */}
            <header className="flex flex-col items-center justify-center flex-grow py-20 text-center">
            <Logo />
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
                    <h2 className="text-4xl font-bold text-center mb-12">Why Nextforge?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-neutral-900 border border-white rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Comprehensive Courses</h3>
                            <p>Explore different topics and enhance your skills with our designed courses.</p>
                        </div>
                        <div className="p-6 bg-neutral-900 border border-white rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
                            <p>Enjoy the freedom to learn at your own pace with our online courses. Access materials anytime, anywhere, and fit your education around your busy schedule.</p>
                        </div>
                        <div className="p-6 bg-neutral-900 border border-white rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Earn Badges</h3>
                            <p>Showcase your achievements with our digital badges! Complete courses and earn badges that highlight your skills and accomplishments.</p>
                        </div>
                    </div>
                </div>
            </section>
                    {/* About Us Section */}
                    <section className="py-20 bg-neutral-800 text-white">
                                    <div className="max-w-6xl mx-auto px-4 text-center">
                                        <h2 className="text-4xl font-bold mb-8">About Us</h2>
                                        <p className="text-lg mb-4">
                                            NextForge is a project developed as part of our thesis. 
                                            Our aim is to provide a comprehensive platform for 2nd Year Computer Science learners to enhance their skills through 
                                            a variety of courses and resources.
                                        </p>
                                      
                                    </div>
                                </section>
            {/* Footer Section */}
            <footer className="py-10 bg-neutral-900 text-center">
                <p className="text-sm">© {new Date().getFullYear()} Nextforge. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default NextForge;