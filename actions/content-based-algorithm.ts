// RECOMMENDATION: CONTENT-BASED FILTERING ALGORITHM

import { db } from "@/lib/db";
import { CourseWithProgresWithCategory } from "@/components/courses-list"; // Adjust the path as necessary
import { cosineSimilarity } from "@/utils/cosine-similarity"; // Importing the utility function for cosine similarity

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

    if (completedCourses.length === 0) {
        return { recommendedCourses: [] }; // Return empty recommendations if no completed courses
    }

    // Fetch all courses to analyze content
    const allCourses = await db.course.findMany({
        where: {
            isPublished: true,
        },
        include: {
            chapters: true, // Include chapters
            category: true, // Include category
        },
    });

    // Filter out the completed courses
    const filteredCourses = allCourses.filter(course => {
        const isCompleted = completedCourses.some(progress => progress.chapter.course.id === course.id);
        return !isCompleted;
    });
//////////////////////////////////////////////////////////////////////////

    // Content vector for each course based on title and description
    const courseVectors = filteredCourses.map(course => ({
        id: course.id,
        title: course.title,
        vector: createContentVector(course.title || "", course.description || ""), // Include description
    }));

    // Calculate similarity scores based on completed courses
    const similarityScores = courseVectors.map(course => {
        const scores = completedCourses.map(completed => {
            const completedCourse = completed.chapter.course;
            const completedVector = createContentVector(completedCourse.title || "", completedCourse.description || ""); // Include description
            const score = cosineSimilarity(course.vector, completedVector); // Calculate cosine similarity
            return {
                id: completedCourse.id,
                title: completedCourse.title, // Get the title of the completed course
                score: score,
            };
        });

        // Sum scores for all completed courses
        const totalScore = scores.reduce((acc, curr) => acc + curr.score, 0);

        // Log similarity scores with course titles
        scores.forEach(({ title, score }) => {
            console.log(`Course Title: ${title}, Similarity Score: ${score}`);
        });

        return { courseId: course.id, totalScore };
    });

    console.log("Course Vectors:", courseVectors);
 // Sort courses by similarity score in descending order
 const threshold = 0.5; // Example threshold
 const recommendedCourseIds = similarityScores
     .filter(item => item.totalScore > threshold) // Filter based on threshold
     .sort((a, b) => b.totalScore - a.totalScore)
     .map(item => item.courseId);

 // Fetch recommended courses based on sorted IDs
 const recommendedCourses = await db.course.findMany({
     where: {
         id: {
             in: recommendedCourseIds,
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

 return {
     recommendedCourses: coursesWithProgress,
 };
};

// Function to create a content vector from title and description
const createContentVector = (title: string, description: string): number[] => {
 const combinedText = (title + " " + description).toLowerCase(); // Combine title and description
 const words = combinedText.split(/\W+/); // Split combined text into words
 const uniqueWords = Array.from(new Set(words)); // Get unique words

 // Create a vector representation
 const vector = uniqueWords.map(word => {
     return words.filter(w => w === word).length; // Count occurrences of each word
 });

 return vector;
};