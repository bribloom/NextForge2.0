
//fetch the course in Browse
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getProgress } from "@/actions/get-progress";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import { Banner } from "@/components/banner";


const CourseLayout = async({
    children,
    params
}:{
    params: {courseId: string}
    children: React.ReactNode;
}) => {

     //fetch the userId
     const { userId } = auth();

     if (!userId) {
         return redirect("/")
 
     }
     const course = await db.course.findUnique({
         where: {
             id: params.courseId,
         },
         include: {
             chapters:{
                 where: {
                     isPublished: true,
                 },
                 include:{
                     userProgress: {
                         where: {
                             userId,
                         }
                     }
                 },
                 orderBy: {
                     position: "asc"
                 }
             },
         },
     });

     if (!course) {
        return redirect("/");
    }

    const progressCount = await getProgress(userId, course.id);


    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50 bg-neutral-900">
                <CourseNavbar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <div>
           
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50 bg-neutral-900">
                <CourseSidebar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            
            <main className="md:pl-80 pt-[80px] h-full bg-neutral-800"> 
            {children}
            </main>
        </div>
    )
}

//NOTE: REMOVE PT-[80px] in  <main className="md:pl-80 h-full"> 


export default CourseLayout