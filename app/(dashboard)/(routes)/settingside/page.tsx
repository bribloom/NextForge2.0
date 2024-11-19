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
            // Example: await axios.delete(`/api/users/${user.id}`);
            alert("User  deleted successfully!"); // Replace with actual deletion logic
            signOut(); // Sign out the user after deletion
            router.push("/"); // Redirect to home or sign-in page
        }
    };

    return (
        <div className="h-full flex items-center justify-center font-bold flex-col">
            <h1 className="text-2xl font-semibold mb-4">Settings</h1>

            {/* Display User Name */}
            {user && (
                <div className="text-lg font-semibold mb-4">
                   Name: {user.firstName} {user.lastName}
                </div>
            )}

            {/* Separator for Danger Zone */}
            <Separator className="my-4" />

            <div className="flex flex-col">
                <h2 className="text-lg font-semibold">Danger Zone</h2>
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
