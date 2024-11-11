"use client";

import { cn } from "@/lib/utils";

import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import path from "path";

interface SidebarItemProps {


    icon: LucideIcon
    label: string;
    href: string;
};




export const SidebarItem = ({


    icon: Icon,
    label,
    href,


}: SidebarItemProps) => {


    const pathname = usePathname();
    const router = useRouter();

    const isActive = 
    (pathname === "/" && href === "/") || 
    pathname === href || 
    pathname?.startsWith(`${href}/`)


    const onClick = () => {

        router.push(href);

    }



    return(

        <button 
            onClick={onClick}
            type="button"
            className={cn(

                "flex items-center gap-x-2 text-green-600 text-smfont-[500] pl-6 transition-all hover:text-green-600 hover:bg-green-500/20",

                isActive && "text-green-600 bg-green-600/20 hover:bg-white hover:text-green-600"

            )}
        >


        <div className="flex items-center gap-x-2 py-4">

        <Icon
        
            size={22}
            className={cn(

                "text-green-600",
                isActive && "text-green-600"
                
            )}

        />

            {label}

        </div>

        <div
        
        className={cn(

            "ml-auto opacity-0 border-4 border-green-500 h-full transition-all",
            isActive && "opacity-100"

        )}

        />


        </button>

    )

}