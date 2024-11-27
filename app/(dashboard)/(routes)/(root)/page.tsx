import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

//LOAD ALL COURSE IN DASHBOARD
export default async function Dashboard() {

    const { userId } = auth();

    if(!userId) {
        return redirect("/nextforge");
    }
   // Fetch completed and in-progress courses
    const {completedCourses,coursesInProgress} = await getDashboardCourses(userId);

 

    return(

        <div className="p-6 space-y-4"> 
          
            
            <h2 className="mt-6 text-xl font-semibold">Your Completed Courses</h2>
            <CoursesList items={completedCourses} /> {/* Display completed courses */}

            <h2 className="mt-6 text-xl font-semibold">Courses In Progress</h2>
            <CoursesList items={coursesInProgress} /> {/* Display courses in progress */}

            <h2 className="mt-6 text-xl font-semibold">Recommended For You</h2>
        </div>

    )
}