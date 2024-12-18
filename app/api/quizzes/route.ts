import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust the import based on your database setup
import { auth } from "@clerk/nextjs/server";


export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { title, description, questions } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const quiz = await db.quiz.create({
            data: {
                title,
                description,
                userId,
                questions: {
                    create: questions.map((question: any) => ({
                        question: question.question,
                        options: JSON.stringify(question.options),
                        correctAnswer: question.correctAnswer,
                    })),
                },
            },
        });

        return NextResponse.json({ id: quiz.id }); // Return the created quiz's ID
    } catch (error) {
        console.error("[QUIZ_CREATION_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
