"use client"

import { useAuth, UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {LogOut} from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";

//required import for protection instructor
import { isInstructor } from "@/lib/instructor";


export const NavbarRoutes =() => {

//fetch userId needs: to protection instructor
     const { userId } = useAuth();

    const pathname = usePathname();
   // const router = useRouter();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";



    return(
        <>
        {isSearchPage && (
            <div className="hidden md:block">
                <SearchInput/>
            </div>
        )}
            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isCoursePage ? (
                    <Link href="/">
                    <Button size="sm" >

                        <LogOut className="h-4 w-4 mr-2" />
                        Exit
                    </Button>
                    </Link>
                ) : isInstructor(userId) ? (

                   <Link href="/teacher/courses">

                    <Button size="sm" >
                        Instructor mode
                    </Button>

                   </Link>

                ): null}
            
            <UserButton

                afterSignOutUrl="/"

            />

        </div>
        </>
    )




}