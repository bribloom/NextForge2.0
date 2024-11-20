import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";
import { Banner } from "@/components/banner";


interface SearchPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
};

const SearchPage = async ({
    searchParams
}:SearchPageProps) => {

    //add the userId
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });
//passing the get-courses here
    const courses = await getCourses({
        userId,
        ...searchParams,
    });
 
   
    return ( 
        <>
            <div className="px-6 pt-6 md:hidden md:mb-0 block">
                <SearchInput/>
            </div>
            <div className="font-semibold mt-5">
            <Banner
                variant={"success"}
                label="Access our courses for free."
                />
            </div>
        <div className="p-6 space-y-7">
            <Categories
                items={categories}
            />
            <CoursesList items={courses}/>
        </div>
        </>
     );
}
 
export default SearchPage;
