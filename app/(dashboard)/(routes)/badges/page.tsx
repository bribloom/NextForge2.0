// app/(dashboard)/(routes)/badges/page.tsx
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"; // Add this import

const BadgesPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const badges = await db.badge.findMany({
        where: { userId },
        include: {
            course: true, // Assuming you want course details
            chapter: true, // Include the chapter details
        },
    });

    return (
        <div className="mt-5 ml-5 mr-5 mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Check if the badges array is empty */}
            {badges.length === 0 ? (
                <p className="text-gray-500 text-center col-span-full">You have no badges yet. Keep learning to earn badges!</p>
            ) : (
                badges.map((badge) => (
                    <div key={badge.id} className="border rounded-lg p-4 bg-emerald-600">
                        <h3 className="text-lg font-semibold">{badge.course.title}</h3>
                        <p className="text-sm font-semibold">Completed Chapter: {badge.chapter.title}</p>
                        <span className="badge">🏅 Badge Earned!</span>
                    </div>
                ))
            )}
        </div>
    );
};

export default BadgesPage;