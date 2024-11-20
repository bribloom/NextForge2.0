// app/api/badges/route.ts
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = auth();
    const { chapterId, courseId } = await req.json();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const badge = await db.badge.create({
        data: {
            userId,
            chapterId,
            courseId,
        },
    });

    return NextResponse.json(badge);
}