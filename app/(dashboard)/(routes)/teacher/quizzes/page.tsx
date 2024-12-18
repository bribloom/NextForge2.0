import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/column";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";





const QuizzesPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
        
    }

    const quiz = await db.quiz.findMany({
        where: {
            userId,
        },

    });
   
    return ( 

        <div className="p-6">
      <DataTable columns={columns} data={quiz} />
        </div>

     );
}
 
export default QuizzesPage;