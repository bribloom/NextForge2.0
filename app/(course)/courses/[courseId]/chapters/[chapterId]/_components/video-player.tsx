"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { Loader2, Lock } from "lucide-react";

interface VideoPlayerProps {
    playbackId: string;
    courseId: string;
    chapterId: string;
    nextChapterId?: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    title: string;
};

export const VideoPlayer = ({
    playbackId,
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    completeOnEnd,
    title,
}: VideoPlayerProps) => {

    const [isReady, setIsReady] = useState(false);
    const [recordingDetected, setRecordingDetected] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();

    // Monitor focus and visibility change
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setRecordingDetected(true);
                toast.error("Screen recording software detected. Please disable it to continue.");
            } else {
                setRecordingDetected(false);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    // If the video is done, automatically go to the next video
    const onEnd = async () => {
        try {
            if (completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true,
                });
                
                if (!nextChapterId) {
                    confetti.onOpen();
                }

                toast.success("Progress updated");
                router.refresh();

                if (nextChapterId) {
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
                }
            }
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="relative aspect-video">
            {!isLocked && !isReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900 ">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary"/>
                </div>
            )}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                    <Lock className="h-8 w-8"/>
                    <p className="text-sm">This chapter is locked</p>
                </div>
            )}
            {!isLocked && !recordingDetected && (
                <MuxPlayer
                    title={title}
                    className={cn(!isReady && "hidden")}
                    onCanPlay={() => setIsReady(true)}
                    onEnded={onEnd}
                    playbackId={playbackId}
                />
            )}
            {recordingDetected && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-600 flex-col gap-y-2 text-white">
                    <p className="text-lg font-bold">Recording Detected</p>
                    <p>Please stop any screen recording software to continue watching.</p>
                </div>
            )}
        </div>
    );
};