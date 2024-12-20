"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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

const EditQuizPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const quizId = params.id;

    const [loading, setLoading] = useState(true);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            questions: [{ question: "", options: ["", ""], correctAnswer: "" }],
        },
    });

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const { data } = await axios.get(`/api/quizzes/${quizId}`);
                form.reset({
                    title: data.title,
                    description: data.description,
                    questions: data.questions.map((q: any) => ({
                        question: q.question,
                        options: JSON.parse(q.options),
                        correctAnswer: q.correctAnswer,
                    })),
                });
                setLoading(false);
            } catch (error) {
                toast.error("Failed to load quiz");
                router.push("/teacher/quizzes");
            }
        };

        fetchQuiz();
    }, [quizId, form, router]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.put(`/api/quizzes/${quizId}`, values);
            toast.success("Quiz Updated");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto flex flex-col p-6">
            <h1 className="text-2xl font-semibold">Edit Quiz</h1>
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
                    {/* Same layout for questions as in CreateQuizPage */}
                    {/* Add logic for adding/removing questions and options */}
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Updating..." : "Update Quiz"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default EditQuizPage;
