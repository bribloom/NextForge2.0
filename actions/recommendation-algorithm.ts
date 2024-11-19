// actions/recommendations.ts
import { db } from "@/lib/db";
import { Course, UserProgress } from "@prisma/client"; // Import your Prisma types

export const getRecommendations = async (userId: string): Promise<Course[]> => {
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

    // Get unique course recommendations from similar users
    const recommendedCourses = new Set<string>(); // Use Set<string> to ensure unique course IDs
    similarUsers.forEach(user => {
        recommendedCourses.add(user.chapter.course.id);
    });

    // Remove already completed courses from recommendations
    const finalRecommendations = Array.from(recommendedCourses).filter(courseId => !completedCourseIds.includes(courseId));

    // Fetch course details for the recommended course IDs
    const courses = await db.course.findMany({
        where: {
            id: {
                in: finalRecommendations,
            },
        },
    });

    return courses;
};

