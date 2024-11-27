
//PASSING THE CODE FOR COURSE CARD IN COURSE LIST
import { Category, Course } from "@prisma/client";
import { CourseCard } from "@/components/course-card";


type CourseWithProgresWithCategory =  Course & {
    
    //Added
    id: string;
    userId: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    price: number | null;
    categoryId: string | null;
    createdAt: Date;
    updatedAt: Date;
    isPublished: boolean;
    //End

    //category: Category | null;
    //chapters: {id: string}[];
    chapters: { id: string }[]; // Assuming chapters have at least an id

    progress: number | null;
    category: { name: string; id: string } | null; // Include category and updated category


};

interface CoursesListProps {
    items: CourseWithProgresWithCategory[];
}

export const CoursesList = ({
    items
}:CoursesListProps) => {
    return(
        <div>

    
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {items.map((item) =>(
                    <CourseCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl!}
                        chaptersLength={item.chapters.length}
                        price={item.price!}
                        progress={item.progress}
                        category={item?.category?.name!}
                    />
               
            ))}  
            </div>
            {items.length === 0 &&(
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No courses found
                </div>
            )}
        </div>
    )
}