"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

interface QuizSetupProps {
    id: string;
    isPublished: boolean;
}

const QuizSetup: React.FC<QuizSetupProps> = ({ id, isPublished }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`/api/quizzes/${id}`);
            toast.success("Quiz deleted successfully");
            router.push("/teacher/quizzes"); // Redirect to quizzes list
        } catch (error) {
            toast.error("Failed to delete quiz");
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async () => {
        setLoading(true);
        try {
            await axios.patch(`/api/quizzes/${id}/publish`, { isPublished: !isPublished });
            toast.success(`Quiz ${isPublished ? "unpublished" : "published"} successfully`);
            router.push(`/teacher/quizzes/${id}`); // Redirect to the same quiz page to refresh
        } catch (error) {
            toast.error("Failed to update quiz status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-x-2">
            <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
            >
                {loading ? "Deleting..." : "Delete Quiz"}
            </Button>
            <Button
                variant="outline"
                onClick={handlePublish}
                disabled={loading}
            >
                {loading ? "Updating..." : isPublished ? "Unpublish Quiz" : "Publish Quiz"}
            </Button>
        </div>
    );
};

export default QuizSetup;