"use client";

import { AwardIcon, Layout, BotMessageSquare, LayoutList, Settings, BookOpen, ChartColumnBig, Dices, SquarePlus} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";


const guestRoutes = [

    {
   
    icon: Layout,
    label: "Dashboard",
    href: "/"
    },
    {

    icon: BookOpen,
    label: "Find Course",
    href: "/search"
    },
    
   

    {
        icon: BotMessageSquare,
        label: "Next Chatbot",
        href:"/chatbot"
    },
    {
        icon: Dices,
        label: "Quiz",
        href:"/quiz"
        },

    {
        icon:AwardIcon,
        label:"Badges",
        href:"/badges"
        },
    


    {
    icon:Settings,
    label:"Settings",
    href:"/settingside"
    },
  


    

];


const teacherRoutes = [

    {
   
        icon: LayoutList,
        label: "Instructor Course",
        href: "/teacher/courses"
    },
    {

    
        icon: Dices,
        label: "Quizzes",
        href: "/teacher/quizzes"
    },
    {
    
        icon: ChartColumnBig,
        label: "Course Analytics",
        href: "/teacher/analytics"
    },

]

export const SidebarRoutes = () => {

    const pathname = usePathname();
    
    const isTeacherPage = pathname?.includes("/teacher");

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (

        <div className="flex flex-col w-full">

            {routes.map((route) =>(
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                  
                />

            ))}

        </div>

    )

}