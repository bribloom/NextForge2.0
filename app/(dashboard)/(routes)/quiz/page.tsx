"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";

const QuizPage = () => {
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState<{ [key: string]: string }>({});

    // Fetch all quizzes created by teachers
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const { data } = await axios.get("/api/quizzes"); // API endpoint to fetch all quizzes
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
        setCorrectAnswers({}); // Reset correct answers
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
            setCorrectAnswers(
                selectedQuiz.questions.reduce((acc: any, question: any) => {
                    acc[question.id] = question.correctAnswer;
                    return acc;
                }, {})
            );
            toast.success(`Your score is ${data.score} out of ${data.total}`);
        } catch (error) {
            console.error("Failed to submit quiz", error);
            toast.error("An error occurred while submitting the quiz.");
        }
    };

    if (selectedQuiz) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                {/* Add Toaster to enable toast notifications */}
                <Toaster />
                <h1 className="text-2xl font-bold mb-4">{selectedQuiz.title}</h1>
                <p className="mb-6">{selectedQuiz.description}</p>
                {selectedQuiz.questions?.length > 0 ? (
                    selectedQuiz.questions.map((question: any) => (
                        <div key={question.id} className="mb-4">
                            <h3 className="font-medium">{question.question}</h3>
                            {question.options?.length > 0 ? (
                                question.options.map((option: string, index: number) => (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`${question.id}-${index}`}
                                            name={question.id}
                                            value={option}
                                            onChange={() => handleAnswerChange(question.id, option)}
                                            disabled={submitted}
                                        />
                                        <label
                                            htmlFor={`${question.id}-${index}`}
                                            className="ml-2"
                                        >
                                            {option}
                                            {submitted &&
                                                correctAnswers[question.id] === option && (
                                                    <span className="ml-2 text-green-500">
                                                        (Correct Answer)
                                                    </span>
                                                )}
                                        </label>
                                    </div>
                                ))
                            ) : (
                                <p>No options available for this question.</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No questions available for this quiz.</p>
                )}
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
            <Toaster />
            <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
            {quizzes.length === 0 && <p>No quizzes available.</p>}
            <ul className="space-y-4">
                {quizzes.map((quiz) => (
                    <li key={quiz.id} className="border p-4 rounded-md">
                        <h2 className="font-medium text-lg">{quiz.title}</h2>
                        <p className="text-sm text-gray-600">{quiz.description}</p>
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
