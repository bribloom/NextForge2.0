"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs"; // Import useAuth
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps{
    chapterId: string;
    courseId: string;
    nextChapterId?: string; 
    isCompleted?: boolean;
};

export const CourseProgressButton = ({
    chapterId,
    courseId,
    nextChapterId,
    isCompleted,
}:CourseProgressButtonProps) => {

    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useAuth(); // Retrieve userId from useAuth

    const onClick = async () => {
        try{
            setIsLoading(true);

            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,{
                isCompleted: !isCompleted
            });

            //adding for badge
            if (!isCompleted) {
                // Grant badge logic here
                await axios.post(`/api/badges`, {
                    userId: userId, // Assuming you have the userId available
                    chapterId: chapterId,
                    courseId: courseId,
                });
    
                // Show toast notification
                toast.success("Congratulations! You've received a new badge!");
            }

            if(!isCompleted && !nextChapterId) {
                confetti.onOpen();
            }

            if (!isCompleted && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }

            toast.success("Progress updated");
            router.refresh();

        }catch{
            toast.error("Something went wrong")
        }finally{
            setIsLoading(false);
        }
    }


    const Icon = isCompleted? XCircle : CheckCircle

    return(
        <Button
            onClick={onClick}
            type="button"
            variant={isCompleted? "outline": "success"}
        >
            {isCompleted? "Not Completed" : "Mark as complete"} 
            <Icon className="h-4 w-4 ml-2"/>
        </Button>
    )

}