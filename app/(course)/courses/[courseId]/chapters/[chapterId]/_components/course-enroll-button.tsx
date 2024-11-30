"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


interface CourseEnrollButtonProps{
    //price: number;
    courseId: string;
}

export const CourseEnrollButton = ({
    //price,
    courseId
}:CourseEnrollButtonProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false); // State to track enrollment

    const onClick = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`/api/courses/${courseId}/enroll`);
            if (response.status === 200) {
                setIsEnrolled(true); // Update the state to reflect enrollment
                toast.success("Successfully enrolled in the course!");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <Button 
        onClick={onClick}
        disabled={isLoading || isEnrolled} // Disable button if loading or already enrolled
        size="sm"
        className="w-auto md:auto ">
            Enroll for free
    
        </Button>
    )

    //Enroll for {formatPrice(price)}

}