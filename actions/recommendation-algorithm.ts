//RECOMMMENDATION: CONTENT-BASED FILTERING ALGORITHM

import { db } from "@/lib/db";
import { CourseWithProgresWithCategory } from "@/components/courses-list"; // Adjust the path as necessary


export const getCourseRecommendations = async (userId: string): Promise<{ recommendedCourses: CourseWithProgresWithCategory[] }> => {
    // Fetch the courses completed and in progress by the user
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

    const coursesInProgress = await db.userProgress.findMany({
        where: {
            userId,
            isCompleted: false,
        },
        include: {
            chapter: {
                include: {
                    course: true, // Include course details
                },
            },
        },
    });

    // Extract unique category IDs from completed and in-progress courses
    const getUniqueCategories = (courses: Array<{ chapter: { course: { categoryId: string | null } } }>): string[] => {
        const categories = courses.map(progress => progress.chapter.course.categoryId).filter((id): id is string => id !== null);
        return Array.from(new Set(categories)); // Remove duplicates and convert Set to Array
    };

    const completedCategories = getUniqueCategories(completedCourses);
    const inProgressCategories = getUniqueCategories(coursesInProgress);
    const allCategories = Array.from(new Set([...completedCategories, ...inProgressCategories])); // Combine and deduplicate

    // Fetch recommended courses based on the identified categories
    const recommendedCourses = await db.course.findMany({
        where: {
            id: {
                notIn: [
                    ...completedCourses.map(progress => progress.chapter.course.id),
                    ...coursesInProgress.map(progress => progress.chapter.course.id),
                ], // Exclude already completed and in-progress courses
            },
            categoryId: {
                in: allCategories, // Filter by the identified categories
            },
        },
        include: {
            chapters: true, // Include chapters
            category: true, // Include category
        },
    });

    // Calculate progress for each recommended course
    const coursesWithProgress = await Promise.all(recommendedCourses.map(async (course) => {
        const progress = await db.userProgress.count({
            where: {
                userId,
                chapter: {
                    courseId: course.id,
                },
                isCompleted: true,
            },
        });

        const totalChapters = await db.chapter.count({
            where: {
                courseId: course.id,
            },
        });

        const progressPercentage = totalChapters > 0 ? (progress / totalChapters) * 100 : 0;

        return {
            ...course,
            progress: progressPercentage,
            chapters: course.chapters.map(chapter => ({ id: chapter.id })), // Map chapters to the required format
        };
    }));

    // Return the structured response
    return {
        recommendedCourses: coursesWithProgress,
    };
};