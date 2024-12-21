import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust based on your project setup
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
    try {
        // Fetch all quizzes, including their questions
        const quizzes = await db.quiz.findMany({
            include: {
                questions: true, // Include questions in the response
            },
        });

        // Parse options for each question
        const quizzesWithParsedQuestions = quizzes.map((quiz) => ({
            ...quiz,
            questions: quiz.questions.map((question) => ({
                ...question,
                options: question.options ? JSON.parse(question.options) : [], // Parse JSON string
            })),
        }));

        return NextResponse.json(quizzesWithParsedQuestions);
    } catch (error) {
        console.error("[QUIZ_FETCH_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = auth(); // Get the userId from the authentication context
        const { title, description, questions } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const quiz = await db.quiz.create({
            data: {
                title,
                description,
                userId, // Include userId in the quiz creation
                questions: {
                    create: questions.map((question: any) => ({
                        question: question.question,
                        options: JSON.stringify(question.options ?? []), // Ensure options are always a JSON string
                        correctAnswer: question.correctAnswer,
                    })),
                },
            },
        });

        return NextResponse.json({ id: quiz.id });
    } catch (error) {
        console.error("[QUIZ_CREATION_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
