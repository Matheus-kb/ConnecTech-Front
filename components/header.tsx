"use client"
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const goBack = () => router.back();

    return ( 
        <div className="flex bg-primary-foreground">
            <ChevronLeft onClick={goBack} className="min-w-9 min-h-9 m-2"/>
        </div>
     );
}
 
export default Header;