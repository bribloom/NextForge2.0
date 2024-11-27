
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { getRecommendations } from "@/actions/recommendation-algorithm";
import { getHybridRecommendations } from "@/actions/hybrid-recommendation-algorithm"; // Import the recommendation service from actions
import { UserButton } from "@clerk/nextjs"
import { CoursesList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs/server"
import { Clock, User } from "lucide-react"
import { redirect } from "next/navigation";

//LOAD ALL COURSE IN DASHBOARD
export default async function Dashboard() {

    const { userId } = auth();

    if(!userId) {
        return redirect("/nextforge");
    }
   // Fetch completed and in-progress courses
    const {completedCourses,coursesInProgress} = await getDashboardCourses(userId);

 // Fetch recommendations algorithm
 //const recommendedCourses = await getRecommendations(userId);
 


 // Fetch recommendations algorithm:  Hybrid Recommendation
 const recommendedCourses = await getHybridRecommendations(userId);


    return(

        <div className="p-6 space-y-4"> 
          
            
            <h2 className="mt-6 text-xl font-semibold">Your Completed Courses</h2>
            <CoursesList items={completedCourses} /> {/* Display completed courses */}

            <h2 className="mt-6 text-xl font-semibold">Courses In Progress</h2>
            <CoursesList items={coursesInProgress} /> {/* Display courses in progress */}

            <h2 className="mt-6 text-xl font-semibold">Recommended For You</h2>
            <CoursesList items={recommendedCourses} /> {/* Display recommended courses */}
        </div>

    )
}