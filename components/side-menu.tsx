import Image from "next/image";
import { Button } from "./ui/button";
import { Bolt, Home, LogOut, TicketCheck, User2 } from "lucide-react";

const SideMenu = () => {
  return (
    <div>
      <div className="my-4">
        <div className="relative w-20 h-20">
          <Image
            src="/profile.png"
            alt="Foto de usuário"
            className="rounded-full"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <h1 className="text-2xl font-semibold pt-3">Nome de usuário</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <User2 />
          <Button variant="ghost">Perfil</Button>
        </div>
        <div className="flex items-center">
          <Home />
          <Button variant="ghost">Inicio</Button>
        </div>
        <div className="flex items-center">
          <TicketCheck />
          <Button variant="ghost">Ingressos</Button>
        </div>
        <div className="flex items-center">
          <Bolt />
          <Button variant="ghost">Configurações</Button>
        </div>
        <div className="flex items-center">
          <LogOut color="hsla(0, 100%, 35%, 1)" />
          <Button variant="ghost">Sair</Button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
