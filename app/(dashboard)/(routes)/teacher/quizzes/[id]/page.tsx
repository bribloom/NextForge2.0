"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

const EditQuizPage = ({ params }: { params: { id: string } }) => {
    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState<any>(null);
    const router = useRouter();

    const { register, handleSubmit, reset, setValue, watch } = useForm({
        defaultValues: {
            title: "",
            description: "",
            questions: [] as Question[],
        },
    });

    // Fetch Quiz Data
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const { data } = await axios.get(`/api/quizzes/${params.id}`);
                // Ensure each question has valid `options` parsed from JSON
                const sanitizedQuestions = data.questions.map((q: any) => ({
                    ...q,
                    options: q.options ? JSON.parse(q.options) : [], // Parse options JSON string
                }));

                setQuiz(data);

                // Pre-fill form values
                reset({
                    title: data.title,
                    description: data.description,
                    questions: sanitizedQuestions,
                });
            } catch (error) {
                console.error("Failed to load quiz", error);
            }
        };
        fetchQuiz();
    }, [params.id, reset]);

    // Watch for questions array
    const questions = watch("questions");

    const addQuestion = () => {
        const updatedQuestions = [
            ...questions,
            { question: "", options: ["", ""], correctAnswer: "" },
        ];
        setValue("questions", updatedQuestions);
    };

    const removeQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_: Question, i: number) => i !== index);
        setValue("questions", updatedQuestions);
    };

    const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setValue("questions", updatedQuestions);
    };

    const addOption = (questionIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.push("");
        setValue("questions", updatedQuestions);
    };

    const removeOption = (questionIndex: number, optionIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);
        setValue("questions", updatedQuestions);
    };

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            await axios.put(`/api/quizzes/${params.id}`, data);
            router.push("/teacher/quizzes");
        } catch (error) {
            console.error("Failed to update quiz", error);
        } finally {
            setLoading(false);
        }
    };

    if (!quiz) return <div>Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block font-medium mb-2">Quiz Title</label>
                    <Input {...register("title")} placeholder="Enter quiz title" />
                </div>
                <div>
                    <label className="block font-medium mb-2">Quiz Description</label>
                    <Textarea {...register("description")} placeholder="Enter quiz description" />
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Questions</h2>
                    {questions.map((question: Question, questionIndex: number) => (
                        <div key={questionIndex} className="border p-4 rounded-md mb-4">
                            <div>
                                <label className="block font-medium mb-2">Question</label>
                                <Input
                                    value={question.question}
                                    onChange={(e) =>
                                        setValue(`questions.${questionIndex}.question`, e.target.value)
                                    }
                                    placeholder={`Question ${questionIndex + 1}`}
                                />
                            </div>
                            <div className="mt-4">
                                <h3 className="font-medium mb-2">Options</h3>
                                {question.options.map((option: string, optionIndex: number) => (
                                    <div key={optionIndex} className="flex items-center mb-2">
                                        <Input
                                            value={option}
                                            onChange={(e) =>
                                                updateOption(questionIndex, optionIndex, e.target.value)
                                            }
                                            placeholder={`Option ${optionIndex + 1}`}
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => removeOption(questionIndex, optionIndex)}
                                            variant="destructive"
                                            className="ml-2"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() => addOption(questionIndex)}
                                    className="mt-2"
                                >
                                    Add Option
                                </Button>
                            </div>
                            <div className="mt-4">
                                <label className="block font-medium mb-2">Correct Answer</label>
                                <Input
                                    value={question.correctAnswer}
                                    onChange={(e) =>
                                        setValue(`questions.${questionIndex}.correctAnswer`, e.target.value)
                                    }
                                    placeholder="Correct answer"
                                />
                            </div>
                            <Button
                                type="button"
                                onClick={() => removeQuestion(questionIndex)}
                                variant="destructive"
                                className="mt-4"
                            >
                                Remove Question
                            </Button>
                        </div>
                    ))}
                    <Button type="button" onClick={addQuestion}>
                        Add Question
                    </Button>
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Quiz"}
                </Button>
            </form>
        </div>
    );
};

export default EditQuizPage;
