import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const InitialPage = () => {
    const router = useRouter();

    const handleLogin = () => { router.push('/login') }
    const handleRegister = () => { router.push('/register') }
    return ( 
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-1 px-4 mt-80">
            <Button className="rounded-3xl font-bold min-w-[18.75rem] min-h-11" onClick={handleLogin}>Login</Button>
            <p className="text-center font-bold">ou</p>
            <Button className="rounded-3xl font-bold min-w-[18.75rem] min-h-11" onClick={handleRegister}>Cadastre-se</Button>
        </div>
        </div>
     );
}
 
export default InitialPage;