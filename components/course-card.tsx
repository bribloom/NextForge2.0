import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "./course-progress";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number |null;
    category: string;
};


export const CourseCard = ({
    id,
     title,
     imageUrl,
     chaptersLength,
     price,
     progress,
     category
}:CourseCardProps) => {
    return(
        <Link href={`/courses/${id}`}>
            <div className="group hover:shadow-lg tranition overflow-hidden p-3 h-full border  rounded-3xl">
                <div className="relative w-full aspect-video overflow-hidden bg-slate-800">
                    <Image
                        fill
                        className="object-cover rounded-2xl"
                        alt={title}
                        src={imageUrl}
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-semibold group-hover:text-green-600 transition line-clamp-2 ">
                        {title}
                    </div>
                    <p className="text-xs font-medium border rounded-2xl px-2 flex bg-red-400">
                        {category}
                    </p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-white">
                             <IconBadge size="sm" icon={BookOpen} backgroundVariant={"success"} iconVariant={"success"}/>
                             <span className="font-semibold">
                                {chaptersLength} {chaptersLength === 1?  "Chapter": "Chapters"}
                             </span>
                        </div>
                    </div>
                    {progress !==null ? (
                        <CourseProgress
                        variant={progress === 100? "success" : "default"}    
                        size="sm"
                            value={progress}
                        />
                    ): (
                        <p className="text-md md:text-sm font-semibold text-white">
                                By NextForge
                        </p>
                    )}
                </div>
            </div>
        </Link>
    )
}