import React from "react";
import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";

const AuthLayout = ({
    children
}:{
    children: React.ReactNode 
}) => {
    return ( 
        <div className="h-full">


            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50 bg-neutral-900">

                <Navbar/>

            </div>

            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 bg-neutral-900">


                <Sidebar/>


            </div>

            <main className="md:pl-56 pt-[80px]  h-full bg-neutral-800 ">

            {children}

            </main>

          

        </div>
     );
}
 
export default AuthLayout;