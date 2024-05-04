import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SuccessCreationPage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center h-[90vh]">
        <div className="flex flex-col justify-center items-center flex-grow">
          <div>
            <Image src="/check.svg" alt="check" width={100} height={100} />
          </div>
          <div className="py-4">
            <h1 className="font-bold text-xl">Evento criado com sucesso!</h1>
          </div>
        </div>
        <div className="mt-auto">
          <Button className="min-w-[18.75rem] rounded-3xl font-bold text-xl">
            Voltar para o inicio
          </Button>
        </div>
      </div>
    </>
  );
};

export default SuccessCreationPage;
