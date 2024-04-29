import { Button } from "@/components/ui/button";

const InitialPage = () => {
    return ( 
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-1 px-4 mt-80">
            <Button className="rounded-3xl font-bold min-w-[300px] min-h-11">Login</Button>
            <p className="text-center font-bold">ou</p>
            <Button className="rounded-3xl font-bold min-w-[300px] min-h-11">Cadastre-se</Button>
        </div>
        </div>
     );
}
 
export default InitialPage;