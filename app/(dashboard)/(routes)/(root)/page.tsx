
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { getRecommendations } from "@/actions/recommendation-algorithm";
import { CoursesList } from "@/components/courses-list";
import { UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { Clock, User } from "lucide-react"
import { redirect } from "next/navigation";

//LOAD ALL COURSE IN DASHBOARD
export default async function Dashboard() {

    const { userId } = auth();

    if(!userId) {
        return redirect("/sign-in");
    }

    const {
        completedCourses,
        coursesInProgress,
    } = await getDashboardCourses(userId);

 // Fetch recommendations algorithm
 const recommendedCourses = await getRecommendations(userId);

    return(

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
            <CoursesList
                items={[...coursesInProgress, ...completedCourses]} //DISPLAY FIRST THE COURSEINPROGRESS AND LAST IS COMPLETEDPROGRESS
            />
        </div>

    )
}