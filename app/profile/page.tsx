import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <>
    <Header />
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <div className="relative w-36 h-36">
        <Image
          src="/profile.png"
          alt="Foto de perfil"
          className="rounded-full"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="py-4">
        <h1 className="font-semibold text-2xl">
            Nome do usuário
        </h1>
      </div>
      <div className="py-8  w-48">
        <Button className="uppercase rounded-full font-semibold text-lg w-48">
            Editar perfil
        </Button>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
