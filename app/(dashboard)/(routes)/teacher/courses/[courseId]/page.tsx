import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { File, CircleDollarSign, LayoutDashboard, ListCheck } from "lucide-react";
import { redirect } from "next/navigation";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";


const CourseIdPage = async({

    params

}:{

    params: {courseId: string}

}) => {

    const { userId } = auth();

    if (!userId){
            return redirect("/");
    }


    const course = await db.course.findUnique({

        where: {
            id: params.courseId,
            userId
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                },
            },
         attachment: {  //prollyerror  
                orderBy:{
                    createdAt: "desc",
                },
            },
        },

    });

    const categories = await db.category.findMany({

        orderBy:{

            name: "asc",
            
        },

    });
        //console.log(categories)

    if (!course){
        return redirect("/");
    }

    const requiredFields = [

        course.title,
        course.description,
        course.imageUrl,
       //DELETE course.price, to remove in Complete all fields and it will have a FREE COURSE
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),
        
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (  
       
       //This is a Banner. YELLOW ON TOP
       <> 
        
        {!course.isPublished && (
            <Banner variant="warning"
                label="This course is unpublished. It will not visible in the course list"
                />


        )}
        <div className="p-6 bg-neutral-800">

            <div className="flex items-center justify-between">

                <div className="flex flex-col gap-y-2">

                    <h1 className="text-2xl font-semibold">
                        
                        Course setup
                        
                    </h1>
                        <span className="text-sm">
                            Complete all fields {completionText}
                        </span>
                        <div>
                            <Actions
                                disabled={!isComplete}
                                courseId={params.courseId}
                                isPublished={course.isPublished}
                            
                            />
                        </div>
                </div>

            </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} //changes from line 77 - 80 adding line of codes to fix error
                        backgroundVariant="purple"
                      iconVariant="purple"
                        size="default"
                         />
                        <h2 className="text-xl font-semibold">
                            Customize your course
                        </h2>
                    </div>

                        <TitleForm
                        
                            initialData={course}
                            courseId={course.id}

                        />
                        <DescriptionForm
                        
                        initialData={course}
                        courseId={course.id}

                    />

                        <ImageForm
                        
                        initialData={course}
                        courseId={course.id}

                    />
                      <CategoryForm
                        
                        initialData={course}
                        courseId={course.id}
                        options={categories.map((category) => ({

                            label: category.name,
                            value: category.id,

                        }))}

                    />
                </div>
                            
                         <div className="space-y-6">

                            <div>
        

                          <div className="flex items-center mt-5 gap-x-2">
                            <IconBadge icon={ListCheck}
                            backgroundVariant="purple"
                             iconVariant="purple"
                             size="default" 
                                 />

                                <h2 className="text-xl font-semibold">Course chapters</h2>

                            </div>

                            <ChaptersForm
                        
                                initialData={course}
                                courseId={course.id}

                             />
                        </div>



                            <div className="flex items-center gap-x-2">

                                    <IconBadge icon={File}
                                    backgroundVariant="purple"
                                    iconVariant="purple"
                                    size="default"
                                    />

                                    <h2 className="text-xl font-semibold">

                                        Resources & Attachments

                                    </h2>

                                </div>
                                <AttachmentForm
                        
                                    initialData={course}
                                    courseId={course.id}

                                />

                            </div>

                </div>

        
        </>   //end of fragment    
    );
}
    

 
export default CourseIdPage;