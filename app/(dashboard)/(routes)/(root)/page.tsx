import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { Banner } from "@/components/banner";
import { CoursesList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCourseRecommendations } from "@/actions/content-based-algorithm"; // Import the recommendation algorithm

// LOAD ALL COURSE IN DASHBOARD
export default async function Dashboard() {
    const { userId } = auth();

    if (!userId) {
        return redirect("/nextforge");
    }

    console.log("User  ID:", userId);

    // Fetch recommendations based on completed and in-progress courses
    const { recommendedCourses } = await getCourseRecommendations(userId);
    console.log("Recommended Courses:", recommendedCourses); // Log recommended courses

    // Fetch completed and in-progress courses
    const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);
    console.log("Completed Courses:", completedCourses); // Log completed courses
    console.log("Courses In Progress:", coursesInProgress); // Log courses in progress

   

    return (
        <div>
            <div className="font-semibold mt-1">

            {completedCourses.length === 0 && coursesInProgress.length === 0 && (
                <Banner
                    variant="warning"
                    label="You currently have no courses. Go to 'Find Course' to enroll in new courses!"
                />
            )}
            <div className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Courses In Progress</h2>
                <CoursesList items={coursesInProgress} />

                <h2 className="text-xl font-semibold">Completed Courses</h2>
                <CoursesList items={completedCourses} />

                <h2 className="text-xl font-semibold">Recommended Courses</h2>
                <CoursesList items={recommendedCourses} />

             </div>
         </div>
         </div>
    );
}