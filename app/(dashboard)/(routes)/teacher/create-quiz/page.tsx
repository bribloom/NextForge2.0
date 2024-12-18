import { getAnlytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

 
const CreateQuiz = async() => {
    
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    return ( 
        
        <div className="p-6">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    THIS IS FOR CREATING QUIZ
            </div>
        </div>


     );
}
 
export default CreateQuiz;