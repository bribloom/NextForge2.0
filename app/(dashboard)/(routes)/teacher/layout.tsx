
//THIS LAYOUT IS FOR PROTECTING THE INSTRUCTOR FEATURES
import { isInstructor } from "@/lib/instructor";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const TeacherLayout = ({
    children
}:{
    children: React.ReactNode;
}) => {

    const { userId } = auth();

    if(!isInstructor(userId)) {
        return redirect("/");
    }

    return <>{children}</>
}
 
export default TeacherLayout;