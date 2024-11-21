// app/(dashboard)/(routes)/settingside/page.tsx
"use client";

import { useAuth, useUser  } from "@clerk/nextjs"; // Import useUser  to get user details
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"; // Import the Separator component
import { useRouter } from "next/navigation";

const SettingsPage = () => {
    const { signOut } = useAuth(); // Get the signOut function from Clerk
    const { user } = useUser (); // Get user details using useUser  
    const router = useRouter();

    const handleDeleteUser  = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (confirmed) {
            // Call your API to delete the user
            alert("User  deleted successfully!"); // Replace with actual deletion logic
            signOut(); // Sign out the user after deletion
            router.push("/"); // Redirect to home or sign-in page
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-6 bg-neutral-800">

            {/* Display User Profile */}
            {user && (
                <div className="text-lg font-semibold text-white mb-6 text-center">
                    <h2 className="text-2xl mb-2">User  Profile</h2>
                    {/* Profile Picture Container */}
                    <div className="flex justify-center mb-4">
                        {user.imageUrl ? (
                            <img
                                src={user.imageUrl}
                                alt="Profile Picture"
                                className="rounded-full w-32 h-32 border-2 border-gray-300"
                            />
                        ) : (
                            <div className="rounded-full w-32 h-32 bg-gray-300 flex items-center justify-center">
                                <span className="text-gray-500">No Image</span>
                            </div>
                        )}
                    </div>
                    <p className="text-lg">Name: {user.firstName} {user.lastName}</p>
                    <p className="text-lg">Email: {user.emailAddresses[0]?.emailAddress}</p>
                </div>
            )}

            {/* Separator for Danger Zone */}
            <Separator className="my-6 w-full" />

            <div className="flex flex-col items-center">
                <h2 className="text-lg font-semibold text-white mb-4">Danger Zone</h2>
                <Button variant="destructive" onClick={handleDeleteUser } className="mt-2 rounded-md">
                    Delete User
                </Button>
                <Button variant="outline" onClick={() => signOut()} className="mt-2 rounded-md">
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default SettingsPage;