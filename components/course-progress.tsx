import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface CourseProgressProps{
    value: number;
    variant?: "default" | "success",
    size?: "default" | "sm";
};

   const colorByVariant = {
    default: "text-green-600",
    success: "text-green-600",
   } 
   const sizeByVariant = {
    default: "text-sm",
    sm: "text-xs",
   } 

export const CourseProgress = ({
    value,
    variant,
    size,
}:CourseProgressProps) => {
    
    
    return(
        <div>
           <Progress
                className="h-3"
                value={value}
                variant={variant}
           />

            <p className={cn(
                "font-medium mt-2 text-purple-200",
                colorByVariant[variant || "default"],
                sizeByVariant[size || "default"],
            )}> 
                {Math.round(value)}% Complete
            </p>

        </div>
    )
}