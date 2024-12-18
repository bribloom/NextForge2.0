"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import toast from "react-hot-toast";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    }),
    questions: z.array(z.object({
        question: z.string().min(1, {
            message: "Question is required",
        }),
        options: z.array(z.string().min(1)).min(2, {
            message: "At least two options are required",
        }),
        correctAnswer: z.string().min(1, {
            message: "Correct answer is required",
        }),
    })).min(1, {
        message: "At least one question is required",
    }),
});

const CreateQuizPage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            questions: [{ question: "", options: ["", ""], correctAnswer: "" }],
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/quizzes", values); // Send data to the API route
            toast.success("Quiz Created");
            router.push(`/teacher/quizzes/${response.data.id}`); // Redirect to the created quiz
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="max-w-5xl mx-auto flex flex-col p-6">
            <h1 className="text-2xl font-semibold">Create a New Quiz</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quiz Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter quiz title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quiz Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter quiz description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Questions Section */}
                    <div>
                        <h2 className="text-xl font-semibold">Questions</h2>
                        {form.watch("questions").map((_, index) => (
                            <div key={index} className="border p-4 rounded-md mb-4">
                                <FormField
                                    control={form.control}
                                    name={`questions.${index}.question`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Question {index + 1}</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter question" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`questions.${index}.options`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Options</FormLabel>
                                            <FormControl>
                                                <>
                                                    {field.value.map((option, optionIndex) => (
                                                        <div key={optionIndex} className="flex items-center mb-2">
                                                            <Input
                                                                placeholder={`Option ${optionIndex + 1}`}
                                                                value={option}
                                                                onChange={(e) => {
                                                                    const newOptions = [...field.value];
                                                                    newOptions[optionIndex] = e.target.value;
                                                                    form.setValue(`questions.${index}.options`, newOptions);
                                                                }}
                                                            />
                                                            <Button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newOptions = field.value.filter((_, i) => i !== optionIndex);
                                                                    form.setValue(`questions.${index}.options`, newOptions);
                                                                }}
                                                                variant="destructive"
                                                                className="ml-2"
                                                            >
                                                                Remove Option
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </>
                                            </FormControl>
                                            <FormMessage />
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    const newOptions = [...field.value, ""];
                                                    form.setValue(`questions.${index}.options`, newOptions);
                                                }}
                                            >
                                                Add Option
                                            </Button>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`questions.${index}.correctAnswer`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Correct Answer</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter the correct answer"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="button"
                                    onClick={() => {
                                        const currentQuestions = form.getValues("questions");
                                        const newQuestions = [...currentQuestions];
                                        newQuestions.splice(index, 1);
                                        form.setValue("questions", newQuestions);
                                    }}
                                    variant="destructive"
                                >
                                    Remove Question
                                </Button>
                            </div>
                        ))}

                        <Button
                            type="button"
                            onClick={() => {
                                const currentQuestions = form.getValues("questions");
                                const newQuestions = [...currentQuestions, { question: "", options: ["", ""], correctAnswer: "" }];
                                form.setValue("questions", newQuestions);
                            }}
                        >
                            Add Question
                        </Button>
                    </div>

                    <Button type="submit" disabled={isSubmitting || !isValid}>
                        {isSubmitting ? "Creating..." : "Create Quiz"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateQuizPage;
