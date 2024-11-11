'use client'

import * as z from 'zod'
import axios from 'axios'
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, ImageIcon, Video, VideoIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Chapter, Course, MuxData } from '@prisma/client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/file-upload'

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null};
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({ 
  initialData,
   courseId,
   chapterId, 
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success('Chapter updated')
      toggleEdit()
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="mt-6 rounded-md border bg-purple-900 p-4 text-white">
      <div className="flex items-center justify-between font-semibold text-white">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-purple-200">
            <VideoIcon className="h-10 w-10 text-white" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
              <MuxPlayer
                playbackId={initialData?.muxData?.playbackId || ""} //to render the video
              />
          </div>
        ))}
      {isEditing && (
        <div className='text-white'>
          <FileUpload
          
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url })
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground text-white">Upload this chapter's video</div>
        </div>
      )}
      {initialData.videoUrl && !isEditing &&(
        <div className='text-xs text-muted-foreground mt-2 text-white'>
            Videos can take a few minutes to process. Refresh the page if video does not appear.
        </div>
      )}
    </div>
  )
}