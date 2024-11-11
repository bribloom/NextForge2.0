export const isInstructor = (userId?: string | null) => {
    return userId === process.env.NEXT_PUBLIC_INSTRUCTOR_ID;
}