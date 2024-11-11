'use client'

import * as z from 'zod'
import axios from 'axios'
import {PlusCircle, File, X } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Attachment, Course } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/file-upload'

interface AttachmentFormProps {
  initialData: Course & {attachment: Attachment[] };
  courseId: string;
};

const formSchema = z.object({
 url: z.string().min(1),
});

export const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);


  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachment`, values)
      toast.success('Course updated')
      toggleEdit()
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    }
  };

    const onDelete = async (id: string) => {

      try{
        setDeletingId(id);
        await axios.delete(`/api/courses/${courseId}/attachment/${id}`);
        toast.success("Attachment deleted");
        router.refresh();
      }catch{
        toast.error("Something went wrong");

      }finally{
        setDeletingId(null);
      }

    }

  return (
    <div className="mt-6 rounded-md border bg-purple-900 p-4">
      <div className="font-semibold flex items-center justify-between">
        Course attachment
        <Button className='bg-neutral-900' onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a file
            </>
          )}
      
        </Button>
      </div>
      {!isEditing && (
          <>
            {initialData.attachment.length === 0 && (
                <p className='text-sm mt-2 text-white italic'>
                  No attachments yet
                </p>
            )}
            {initialData.attachment.length > 0 && (
              <div className="space-y-2">
                {initialData.attachment.map((attachment) => (
                  <div 
                    key={attachment.id}
                    className="flex item-center p-3 w-full bg-purple-100 border-sky-200 border text-purple-800"
                    >
                        <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                        <p className='text-xs  line-clamp-1'>
                          {attachment.name}
                        </p>
                        {deletingId !== attachment.id && (
                            <button 
                              onClick={() => onDelete(attachment.id)}
                              className='bg-neutral-900 ml-auto hover:opacity-75 transition'
                            >
                              <X className='h-4 w-4'/>
                            </button>

                        )}
                  </div>
                ))}

              </div>
            )}
          </>
     
        )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url })
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground text-white">Add anything your students might need to complete the course.</div>
        </div>
      )}
    </div>
  )
}