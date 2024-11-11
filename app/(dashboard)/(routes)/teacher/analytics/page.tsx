import { getAnlytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { DataCard } from "./_components/data-card";

 
const AnalyticsPage = async() => {
    
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const {
        data,
        totalRevenue,
        totalSales,
    } = await getAnlytics(userId);

    return ( 
        
        <div className="p-6">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DataCard
                    label="Total Students"
                    value={totalSales}
                />
                 <DataCard
                    label="Total Revenue"
                    value={totalRevenue}
                />
            </div>
        </div>


     );
}
 
export default AnalyticsPage;