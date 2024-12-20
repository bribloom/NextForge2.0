import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const { quizId, answers } = await req.json();

    try {
        const quiz = await db.quiz.findUnique({
            where: { id: quizId },
            include: { questions: true },
        });

        if (!quiz) {
            return new NextResponse("Quiz not found", { status: 404 });
        }

        // Calculate score
        let score = 0;
        quiz.questions.forEach((question) => {
            if (answers[question.id] === question.correctAnswer) {
                score++;
            }
        });

        return NextResponse.json({ score, total: quiz.questions.length });
    } catch (error) {
        console.error("[QUIZ_SUBMISSION_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
