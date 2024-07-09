"use client";

import Header2 from "@/components/header2";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  return (
    <>
      <Header2 />
      <div className="flex justify-center items-center h-[90vh]">
        <div className="flex flex-col gap-4 px-4">
          <h1 className="pb-12 font-bold text-center text-xl lg:text-2xl">
            Escolha o seu tipo de conta
          </h1>
          <Button
            onClick={() => {
              router.push("/register/client");
            }}
            className="rounded-3xl font-bold text-xl min-w-[18.75rem] min-h-11"
          >
            Cliente
          </Button>
          <Button
            onClick={() => {
              router.push("/register/organization");
            }}
            className="rounded-3xl font-bold text-xl min-w-[18.75rem] min-h-11"
          >
            Organizador
          </Button>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
