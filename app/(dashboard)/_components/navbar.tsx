import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {

        return (

            <div className="p-4 border-b border-neutral-900 h-full flex items-center bg-neutral-900 shadow-sm">

                <MobileSidebar />   
                <NavbarRoutes />
            </div>

        )


}