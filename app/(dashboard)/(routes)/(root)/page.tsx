import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { getCourseRecommendations } from "@/actions/recommendation-algorithm"; // Import the recommendation algorithm
import { CoursesList } from "@/components/courses-list";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// LOAD ALL COURSE IN DASHBOARD
export default async function Dashboard() {
    const { userId } = auth();

    if (!userId) {
        return redirect("/nextforge");
    }

    console.log("User  ID:", userId);


    // Fetch completed and in-progress courses
    const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);
    console.log("Completed Courses:", completedCourses); // Log completed courses
    console.log("Courses In Progress:", coursesInProgress); // Log courses in progress

    // Fetch recommendations based on completed and in-progress courses
    const { recommendedCourses } = await getCourseRecommendations(userId);
    console.log("Recommended Courses:", recommendedCourses); // Log recommended courses

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Courses In Progress</h2>
            <CoursesList items={coursesInProgress} />

            <h2 className="text-xl font-semibold">Completed Courses</h2>
            <CoursesList items={completedCourses} />

            <h2 className="text-xl font-semibold">Recommended Courses</h2>
            <CoursesList items={recommendedCourses} />
        </div>
    );
}