import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust the import based on your project setup

// GET: Fetch a quiz by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        if (!id) {
            return new NextResponse("Quiz ID is required", { status: 400 });
        }

        const quiz = await db.quiz.findUnique({
            where: { id },
            include: { questions: true }, // Ensure the "questions" relation is fetched
        });

        if (!quiz) {
            return new NextResponse("Quiz not found", { status: 404 });
        }

        return NextResponse.json(quiz);
    } catch (error) {
        console.error("[QUIZ_FETCH_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

// PUT: Update a quiz by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { title, description, questions } = await req.json();

    try {
        if (!id) {
            return new NextResponse("Quiz ID is required", { status: 400 });
        }

        const updatedQuiz = await db.quiz.update({
            where: { id },
            data: {
                title,
                description,
                questions: {
                    deleteMany: {}, // Clear existing questions
                    create: questions.map((question: any) => ({
                        question: question.question,
                        options: JSON.stringify(question.options),
                        correctAnswer: question.correctAnswer,
                    })),
                },
            },
        });

        return NextResponse.json(updatedQuiz);
    } catch (error) {
        console.error("[QUIZ_UPDATE_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
