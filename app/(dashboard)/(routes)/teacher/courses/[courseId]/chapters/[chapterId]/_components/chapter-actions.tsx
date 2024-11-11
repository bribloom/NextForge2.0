"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
    disabled: boolean;
    courseId: string;
    chapterId: string;
    isPublished: boolean;
};


export const ChapterActions = ({
    disabled,
    courseId,
    chapterId,
    isPublished
}: ChapterActionsProps) => {
    const router = useRouter();
    const[isLoading, setIsLoading] = useState(false); 

    //THIS IS THE FUNCTION FOR PUBLISH BUTTON

    const onClick = async () => {
        try{
            setIsLoading(true);
            if (isPublished) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
                toast.success("Chapter unpublished");
            }else{
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
                toast.success("Chapter published");
            }

            router.refresh(); // refreshing the page to see the updated status of the chapter
        }catch{
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false);
        }
    }

    const onDelete = async () => { 
        try {
            setIsLoading(true);

            await  axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

            toast.success("Chapter deleted");
            router.refresh();
            router.push(`/teacher/courses/${courseId}`);
        }catch{
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false);
        }
    }


    //THIS IS FOR PUBLISH BUTTON
    return(
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm">

                    {isPublished ? "Unpublished" : "Publish"}
                </Button>
                <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4"/>
                </Button>
                </ConfirmModal>
        </div>
    )
}