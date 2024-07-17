"use client";
import Header2 from "@/components/header2";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const InitialPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };
  const handleRegister = () => {
    router.push("/register");
  };
  return (
    <>
      <Header2 />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-1 px-4 mt-80 lg:mt-44">
          <Button
            className="rounded-3xl font-bold min-w-[18.75rem] min-h-11 lg:text-base"
            onClick={handleLogin}

          >
            Login
          </Button>
          <p className="text-center font-bold">ou</p>
          <Button
            className="rounded-3xl font-bold min-w-[18.75rem] min-h-11 lg:text-base"
            onClick={handleRegister}
          >
            Cadastre-se
          </Button>
        </div>
      </div>
    </>
  );
};

export default InitialPage;
