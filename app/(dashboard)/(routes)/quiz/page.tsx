"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const QuizPage = () => {
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [submitted, setSubmitted] = useState(false);

    // Fetch all quizzes created by teachers
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const { data } = await axios.get("/api/quizzes"); // API endpoint to fetch all quizzes
                console.log(data); // Check the response here
                setQuizzes(data);
            } catch (error) {
                console.error("Failed to load quizzes", error);
            }
        };
        fetchQuizzes();
    }, []);

    // Handle selecting a specific quiz
    const handleSelectQuiz = (quiz: any) => {
        setSelectedQuiz(quiz);
        setAnswers({}); // Reset answers when a new quiz is selected
        setSubmitted(false);
    };

    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = async () => {
        try {
            const { data } = await axios.post("/api/quizzes/submit", {
                quizId: selectedQuiz.id,
                answers,
            });
            setSubmitted(true);
            alert(`Your score is ${data.score} out of ${data.total}`);
        } catch (error) {
            console.error("Failed to submit quiz", error);
        }
    };

    if (selectedQuiz) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">{selectedQuiz.title}</h1>
                <p className="mb-6">{selectedQuiz.description}</p>
                {selectedQuiz.questions.map((question: any) => (
                    <div key={question.id} className="mb-4">
                        <h3 className="font-medium">{question.question}</h3>
                        {question.options.map((option: string, index: number) => (
                            <div key={index} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`${question.id}-${index}`}
                                    name={question.id}
                                    value={option}
                                    onChange={() => handleAnswerChange(question.id, option)}
                                    disabled={submitted}
                                />
                                <label htmlFor={`${question.id}-${index}`} className="ml-2">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                {!submitted && (
                    <Button onClick={handleSubmit} className="mt-4">
                        Submit Quiz
                    </Button>
                )}
                {submitted && <p className="mt-4">Quiz submitted! Thank you.</p>}
                <Button
                    onClick={() => setSelectedQuiz(null)}
                    className="mt-4 bg-gray-500 hover:bg-gray-700"
                >
                    Back to All Quizzes
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
            {quizzes.length === 0 && <p>No quizzes available.</p>}
            <ul className="space-y-4">
                {quizzes.map((quiz) => (
                    <li key={quiz.id} className="border p-4 rounded-3xl bg-green-600 ">
                        <h2 className="font-semibold text-lg ">{quiz.title}</h2>
                        <p className="text-sm">{quiz.description}</p>
                        <Button
                            onClick={() => handleSelectQuiz(quiz)}
                            className="mt-2"
                        >
                            Take Quiz
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizPage;
