"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItermProps{
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean;
}


export const CourseSidebarItem = ({
    label,
    id,
    isCompleted,
    courseId,
    isLocked
}:CourseSidebarItermProps) =>{

    const pathname = usePathname();
    const router = useRouter();

    //dynamically changing icon
    const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
    //  main:  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);


    const isActive = pathname?.includes(id);
    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`)
    }
    return(
       
        <button 
        onClick={onClick}
        type="button"
        className={cn(
            "flex items-center  gap-x-2 text-white text-sm font-[600] pl-8 transition-all hover:text-slate-650 hover:bg-slate-350/50",
            isActive && "text-slate-200 bg-slate-220/30 hover:bg-slate-220/30 hover:text-slate-300",
            isCompleted && "text-emerald-600 hover:text-emerald-600",
            isCompleted && isActive && "bg-emerald-220/30",
        )}
        >
        <div className="flex items-center gap-x-2 py-4">
            <Icon
                size={22}
                className={cn(
                    "text-white", isActive && "text-slate-200", isCompleted && "text-emerald-600"
                )}
            />
            {label}
        </div>
        <div className={cn(
            "ml-auto opacity-5 border-2 border-slate-200 h-full transition-all", 
            isActive && "opacity-100",
             isCompleted && "border-emerald-600"
        )}/>


        </button>
    )
}