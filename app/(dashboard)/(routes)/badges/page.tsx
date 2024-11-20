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
        },
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => (
                <div key={badge.id} className="border rounded-lg p-4 bg-purple-900">
                    <h3 className="text-lg font-semibold">{badge.course.title}</h3>
                    <p className="text-sm">Completed Chapter: {badge.chapterId}</p>
                    <span className="badge">🏅 Badge Earned!</span>
                </div>
            ))}
        </div>
    );
};

export default BadgesPage;