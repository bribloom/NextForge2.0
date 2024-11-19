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

    const onClick = async () => {
        try{
            setIsLoading(true);
            await axios.post(`/api/courses/${courseId}/enroll`)
            toast.success("Successfully enrolled in the course!");
            //window.location.assign(response.data.url);

        }catch{
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false)
        }
    }

    return(
        <Button 
        onClick={onClick}
        disabled={isLoading}
        size="sm"
        className="w-auto md:auto ">
            Enroll for free
    
        </Button>
    )

    //Enroll for {formatPrice(price)}

}