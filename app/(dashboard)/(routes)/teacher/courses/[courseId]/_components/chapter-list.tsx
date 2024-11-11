"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Grip, Pencil, Rss } from "lucide-react";
//for drag
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import { Badge } from "@/components/ui/badge";



interface ChaptersListProps {

    items: Chapter[];
    onReorder: (updateData: {id: string; position: number} []) => void;
    onEdit: (id: string) => void;
};



export const ChaptersList = ({
    items,
    onReorder,
    onEdit
}: ChaptersListProps) => {

    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setChapters(items);
    }, [items]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(chapters);
        const [reoderedItem] = items.splice (result.source.index, 1);
        items.splice(result.destination.index, 0, reoderedItem);


        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updateChapters = items.slice(startIndex, endIndex + 1);

        setChapters(items);

        const bulkUpdateData = updateChapters.map((chapter) =>({
            id: chapter.id,
            position: items.findIndex((item) => item.id === chapter.id)
        }));

        onReorder(bulkUpdateData);
    }

    if (!isMounted) {
        return null;
    }

    return (

        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {chapters.map((chapter, index) => (
                        <Draggable key={chapter.id}
                         draggableId={chapter.id}
                          index={index}> 
                            {(provided) => (
                                <div
                                    className={cn(
                                        "flex items-center gap-x-2 bg-purple-200 border-purple-200 border textt-slate-700 rounded-md mb-4 text-sm",
                                        chapter.isPublished && "bg-purple-100 border-purple-200 text-purple-800"
                                    )}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                >
                                    <div className={cn(
                                        "px-2 py-3 border-r bg-purple-200 hover:bg-slate-300 rounded-l-md transition",
                                        chapter.isPublished && "border-r-purple-200 hover:bg-purple-200"
                                    )}
                                    {...provided.dragHandleProps}
                                    >
                                        <Grip 
                                            className="h-5 w-5"
                                        />
                                    </div>
                                        {chapter.title}
                                        <div className="ml-auto pr-2 flex items-center  gap-x-2">
                                            {chapter.isFree && (
                                                //free
                                                <Badge className="bg-green-500"> 
                                                    Free
                                                </Badge>

                                            )}

                                            <Badge
                                                className={cn(
                                                    "bg-purple-900", chapter.isPublished && "bg-purple-800"
                                                )}
                                            >
                                                {chapter.isPublished ? "Published":"Draft"}
                                            </Badge>
                                                <Pencil
                                                    onClick={() => onEdit(chapter.id)}
                                                    className="w-4 h-4 cursor-pointer hover:opacity-55 transition"
                                                />
                                        </div>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
            </Droppable>
        </DragDropContext>

    )

}