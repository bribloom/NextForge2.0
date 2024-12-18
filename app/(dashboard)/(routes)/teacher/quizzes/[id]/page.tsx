
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

const QuizPage = async ({ params }: { params: { id: string } }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    // Fetch quiz data
    const quiz = await db.quiz.findUnique({
        where: { id: params.id }, // Match the parameter name
        include: {
            questions: true, // Include related questions
        },
    });

    if (!quiz) {
        return redirect("/");// Renders the 404 page if quiz is not found
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <p className="text-lg text-gray-600">{quiz.description}</p>
            <div className="mt-8">
                <h2 className="text-xl font-semibold">Questions:</h2>
                <ul className="space-y-6">
                    {quiz.questions.map((question) => {
                        const options = Array.isArray(question.options)
                            ? question.options
                            : JSON.parse(question.options as string);

                        return (
                            <li key={question.id} className="p-4 border rounded-md">
                                <strong className="block mb-2">{question.question}</strong>
                                <ul className="space-y-2">
                                    {options.map((option: string, index: number) => (
                                        <li key={index} className="p-2 bg-slate-600 rounded-md">
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-2 text-sm text-green-600">
                                    <strong>Correct Answer:</strong> {question.correctAnswer}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default QuizPage;
