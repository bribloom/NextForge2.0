// actions/recommendations.ts
import { db } from "@/lib/db";
import { Course, UserProgress } from "@prisma/client"; // Import your Prisma types
import { NextResponse } from "next/server"; // Import NextResponse for returning responses

export const getRecommendations = async (userId: string): Promise<NextResponse> => {
    // Fetch the courses completed by the user
    
    const completedCourses = await db.userProgress.findMany({
        where: {
            userId,
            isCompleted: true,
        },
        include: {
            chapter: {
                include: {
                    course: true, // Include course details
                },
            },
        },
    });

    // Extract course IDs from completed courses
    const completedCourseIds: string[] = completedCourses.map(progress => progress.chapter.course.id);

    // Fetch other users who completed the same courses
    const similarUsers = await db.userProgress.findMany({
        where: {
            chapter: {
                courseId: {
                    in: completedCourseIds,
                },
            },
            userId: {
                not: userId, // Exclude the current user
            },
        },
        include: {
            chapter: {
                include: {
                    course: true,
                },
            },
        },
    });
    console.log("Similar Users:", similarUsers); // Log similar users

    // Get unique course recommendations from similar users
    const recommendedCourses = new Set<string>(); // Use Set<string> to ensure unique course IDs
    similarUsers.forEach(user => {
        recommendedCourses.add(user.chapter.course.id);
    });

    // Remove already completed courses from recommendations
    const finalRecommendations = Array.from(recommendedCourses).filter(courseId => !completedCourseIds.includes(courseId));
    console.log("Final Recommendations:", finalRecommendations); // Log final recommendations

    // Fetch course details for the recommended course IDs
    const courses = await db.course.findMany({
        where: {
            id: {
                in: finalRecommendations,
            },
        },
    });

    // Create a response object
    const response = {
        completedCourses: completedCourses.map(progress => progress.chapter.course), // Return completed courses
        similarUsers: similarUsers.map(user => user.chapter.course), // Extract course details from similar users
        recommendedCourses: courses,
    };


    
    // Return the response as JSON
    return NextResponse.json(response);
};