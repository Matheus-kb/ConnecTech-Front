"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import { Bolt, Home, LogOut, TicketCheck, User2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_api/auth"; 
import { signOut, useSession } from "next-auth/react";

const SideMenu = () => {
  const { data } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.push('/login'); // Redireciona para a página de login após o logout
  };

  const handleProfile = () => { 
    router.push('/profile'); // Redireciona para a página de perfil do usuário
  }

  const handleHome = () => {
    router.push('/'); // Redireciona para a página inicial
  }



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
        <h1 className="text-2xl font-semibold pt-3">{data?.user?.name}</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <User2 />
          <Button variant="ghost" onClick={handleProfile}>Perfil</Button>
        </div>
        <div className="flex items-center">
          <Home />
          <Button variant="ghost" onClick={handleHome}>Inicio</Button>
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
