// app/api/courses/[courseId]/enroll/route.ts
import { db } from "@/lib/db";
import { currentUser  } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
    try {
        const user = await currentUser ();

        if (!user || !user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the course exists and is published
        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                isPublished: true,
            },
        });

        if (!course) {
            return new NextResponse("Not Found", { status: 404 });
        }

        // Check if the user is already enrolled
        const existingPurchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: params.courseId,
                },
            },
        });
                                                                                                                                                
        if (existingPurchase) {
            return new NextResponse("Already Enrolled", { status: 400 });
        }

        // Create a purchase record for the user
        await db.purchase.create({
            data: {
                userId: user.id,
                courseId: params.courseId,
            },
        });

        return new NextResponse("Enrolled Successfully", { status: 200 });
    } catch (error) {
        console.log("[COURSE_ENROLL]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}