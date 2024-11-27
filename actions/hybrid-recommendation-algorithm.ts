// app/actions/recommendationService.ts

import { db } from "@/lib/db"; // Import your database connection
import { Course, UserProgress } from "@prisma/client"; // Import your Prisma types

// Function to get collaborative recommendations
const getCollaborativeRecommendations = async (userId: string): Promise<string[]> => {
    // Fetch user progress data
    const userProgress = await db.userProgress.findMany({ where: { userId } });

    // Fetch all chapters for the completed user progress
    const completedChapters = await db.chapter.findMany({
        where: {
            id: { in: userProgress.map(progress => progress.chapterId) }
        },
        select: {
            courseId: true // Select only the courseId
        }
    });

    const completedCourseIds = completedChapters.map(chapter => chapter.courseId);

    // Find similar users who have completed the same courses
    const similarUsers = await db.userProgress.findMany({
        where: {
            chapter: {
                courseId: { in: completedCourseIds }
            },
            userId: { not: userId } // Exclude the current user
        },
        select: {
            chapter: {
                select: {
                    courseId: true
                }
            }
        }
    });

    // Create a set to hold recommended course IDs
    const recommendedCourseIds = new Set<string>();

    // Iterate through similar users and add their completed course IDs
    similarUsers.forEach(user => {
        const courseId = user.chapter.courseId; // Access the courseId directly
        if (courseId) { // Check if courseId exists
            recommendedCourseIds.add(courseId);
        }
    });

    return Array.from(recommendedCourseIds); // Convert the set to an array
};

// Function to get content-based recommendations
const getContentBasedRecommendations = async (userId: string): Promise<string[]> => {
    // Fetch completed courses for the user
    const completedCourses = await db.userProgress.findMany({
        where: { userId },
        include: { chapter: { include: { course: true } } }
    });

    // Create a set to hold recommended course IDs
    const recommendedCourseIds = new Set<string>();

    // Iterate through completed courses and recommend similar ones based on attributes
    for (const progress of completedCourses) {
        const course = progress.chapter.course;

        // Fetch courses that share the same category or tags (assuming you have a category field)
        const similarCourses = await db.course.findMany({
            where: {
                id: { not: course.id }, // Exclude the current course
                categoryId: course.categoryId // Recommend based on the same category
            }
        });

        similarCourses.forEach(similarCourse => {
            recommendedCourseIds.add(similarCourse.id);
        });
    }

    return Array.from(recommendedCourseIds); // Convert the set to an array
};

// Hybrid recommendation function
export const getHybridRecommendations = async (userId: string): Promise<Course[]> => {
    // Get recommendations from both methods
    const collaborativeRecommendations = await getCollaborativeRecommendations(userId);
    const contentBasedRecommendations = await getContentBasedRecommendations(userId);

    // Combine recommendations and remove duplicates
    const combinedRecommendations = Array.from(new Set([...collaborativeRecommendations, ...contentBasedRecommendations]));

    // Fetch course details from the database
    const recommendedCourses = await db.course.findMany({
        where: { id: { in: combinedRecommendations } },
        include: {
            category: true, // Include the category relation
            chapters: true,  // Include chapters relation
            progress: { where: { userId } } // Include progress for the specific user
        }
    });
    return recommendedCourses; // Return the recommended courses
};
