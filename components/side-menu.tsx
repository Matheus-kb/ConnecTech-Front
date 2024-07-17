"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Bolt, CalendarRange, Home, LogOut, TicketCheck, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useEffect, useState } from "react";
import router from "next/router";

const SideMenu = () => {
  const session = JSON.parse(sessionStorage.getItem("user") || "");
  const data = session !== "" ? session : "";
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    router.push("/login");
  };

  const handleProfile = () => {
    router.push("/profile"); // Redireciona para a página de perfil do usuário
  };

  const handleCreateEvent = () => {
    router.push("/events/create")
  }

  const handleHome = () => {
    router.push("/"); // Redireciona para a página inicial
  };

  const [imageUrl, setImageUrl] = useState<string>("");

  const getImageUrl = async () => {
    if (!data?.type || !data?.id) {
      console.error('Tipo ou ID não definidos');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/upload/${data.type}/${data.id}/photo`);

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      // Assuming the response returns the actual file name
      const imageName = await response.text(); // Adjust this according to your API response format
      console.log(imageName, 'imagem')
      // Construct the URL based on your server setup
      const imageUrl = `${imageName}`;

      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Erro ao buscar a imagem:', error);
    }
  };
  useEffect(() => {
    getImageUrl();
  }, []);

  return (
    <div>
      <div className="my-4">
        <div className="relative w-20 h-20">
          <Image
            src={imageUrl}
            alt="Foto de usuário"
            className="rounded-full"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <h1 className="text-2xl font-semibold pt-3">{data?.name}</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <User2 />
          <Button variant="ghost" onClick={handleProfile}>
            Perfil
          </Button>
        </div>
        {data.type === "organizer" && (
          <div className="flex items-center">
            <CalendarRange />
            <Button variant="ghost" onClick={handleCreateEvent}>
              Criar Evento
            </Button>
          </div>
        )}
        <div className="flex items-center lg:hidden">
          <Home />
          <Button variant="ghost" onClick={handleHome}>
            Inicio
          </Button>
        </div>
        <div className="flex items-center lg:hidden">
          <TicketCheck />
          <Button variant="ghost">Ingressos</Button>
        </div>
        <div className="flex items-center lg:hidden">
          <Bolt />
          <Button variant="ghost">Configurações</Button>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="flex items-center">
              <LogOut color="hsla(0, 100%, 35%, 1)" />
              <Button variant="ghost">Sair</Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-72 rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Você deseja mesmo sair?</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="flex flex-row justify-center items-center gap-12">
              <AlertDialogAction
                onClick={handleLogout}
                className="rounded-full text-xl"
              >
                Sim
              </AlertDialogAction>
              <AlertDialogCancel className="rounded-full text-xl bg-red-600 text-white">
                Não
              </AlertDialogCancel>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default SideMenu;
