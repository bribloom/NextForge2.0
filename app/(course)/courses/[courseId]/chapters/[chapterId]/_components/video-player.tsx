"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import toast, { Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { Loader2, Lock } from "lucide-react";


interface VideoPlayerProps{ 
    playbackId: string;
    courseId: string;
    chapterId: string;
    nextChapterId?:string;
    isLocked: boolean;
    completeOnEnd: boolean;
    title: string;
};

export const VideoPlayer =({
    playbackId,
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    completeOnEnd,
    title, 
}:VideoPlayerProps) => {

    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();

    //IF THE VIDEO DONE THEN AUTOMATICALLY GO TO NEXT VID
    const onEnd = async () => {
        try {
            if (completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                     isCompleted: true,
                });
            
                if (!nextChapterId) {
                    confetti.onOpen();
                }

                toast.success("Progress updated")
                router.refresh();

                if (nextChapterId) {
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
                }
            }
        } catch{
            toast.error("Something went wrong");
        }
    }


        return(
            <div className="relative aspect-video">
                {!isLocked && !isReady &&(
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900 ">
                        <Loader2 className="h-8 w-8 animate-spin text-secondary"/>
                    </div>
                )}
                {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                        <Lock className="h-8 w-8"/>
                        <p className="text-sm">
                            This chapter is locked
                        </p>
                    </div>
                )}
                {!isLocked &&(
                    <MuxPlayer
                        title={title}
                        className={cn(
                          !isReady && "hidden"  
                        )}
                        onCanPlay={() => setIsReady(true)}
                        onEnded={onEnd}
                        //if you want to autoPlay the video "autoPlay"
                        playbackId={playbackId}
                    />
                )}

            </div> 

        )

}