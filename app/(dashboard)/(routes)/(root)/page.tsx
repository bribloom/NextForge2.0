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

    // Fetch completed and in-progress courses
    const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);

    // Fetch recommendations based on completed and in-progress courses
    const { recommendedCourses } = await getCourseRecommendations(userId);

    return (
        <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/** 
                 *  <InfoCard
                    icon={Clock}
                    label="In Progress"
                    numberOfItems={coursesInProgress.length}
                /> 
                 */}
            </div>
            <h2 className="text-xl font-semibold">Courses In Progress</h2>
            <CoursesList items={coursesInProgress} />
            <h2 className="text-xl font-semibold">Completed Courses</h2>
            <CoursesList items={completedCourses} />
            <h2 className="text-xl font-semibold">Recommended For You</h2>
            <CoursesList items={recommendedCourses} />
        </div>
    );
}