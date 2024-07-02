import Image from "next/image";
import { Button } from "./ui/button";
import { Bolt, Home, LogOut, TicketCheck, User2 } from "lucide-react";
import { useUser } from "@/app/_context/userContext"; 
import { useRouter } from 'next/navigation';

const SideMenu = () => {
  const { user, logout } = useUser(); // Obtendo os dados do usuário do contexto
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login'); // Redireciona para a página de login após o logout
  };

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
        <h1 className="text-2xl font-semibold pt-3">{user?.name}</h1>
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
          <Button variant="ghost" onClick={handleLogout}>Sair</Button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
