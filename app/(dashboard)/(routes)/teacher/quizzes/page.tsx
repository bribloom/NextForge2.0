import { Button } from "@/components/ui/button";
import Link from "next/link";

const QuizzesPage = () => {
    return ( 
        <div className="p-6">
            <Link href="/teacher/create-quiz">
            
            <Button>
                Create New Quiz
            </Button>
            </Link>
        </div>
     );
}
 
export default QuizzesPage;