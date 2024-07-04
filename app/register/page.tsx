import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const handleClient = () => { router.push('/register/client') }
  const handleOrganization = () => { router.push('/register/organization') }
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-[90vh]">
        <div className="flex flex-col gap-4 px-4">
          <h1 className="pb-12 font-bold text-center text-xl">Escolha o seu tipo de conta</h1>
          <Button className="rounded-3xl font-bold text-xl min-w-[18.75rem] min-h-11">
            Cliente
          </Button>
          <Button className="rounded-3xl font-bold text-xl min-w-[18.75rem] min-h-11">
            Organizador
          </Button>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
