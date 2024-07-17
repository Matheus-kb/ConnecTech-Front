"use client";
import { ChevronLeft, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import SideMenu from "./side-menu";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header = () => {
  const session = JSON.parse(sessionStorage.getItem("user") || "");
  const data = session !== "" ? session : "";
  const router = useRouter();

  const sideMenuItems = [
    { label: "Inicio", path: "/", onClick: () => router.push("/") },
    { label: "Ingressos", onClick: () => { } },
    { label: "Opções", onClick: () => { } },
    { label: "Criar Evento", onClick: () => router.push("/events/create") }
  ];

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
    <Card className="max-h-12">
      <CardContent className="flex flex-row justify-between items-center pt-1">
        <ChevronLeft className="min-w-9 min-h-9 lg:hidden" />
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="hidden lg:block"
        >
          <div>
            <button onClick={() => router.push("/")}>     <h1 className="font-bold text-3xl pt-[-0.5rem]">ConnecTech</h1></button>
          </div>
        </Button>
        <div className="hidden lg:flex space-x-4 items-end ml-auto">
          <div>
            {sideMenuItems.slice(0, 3).map((item, index) => (
              <Button key={index} variant="ghost" onClick={item.onClick}>
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Menu className="min-w-9 min-h-9 lg:hidden" />

              <div className="hidden lg:flex lg:flex-row-reverse items-center lg:gap-4 pl-12">
                <div className="relative w-7 h-7">
                  <Image
                    src={imageUrl}
                    alt="Foto de perfil"
                    className="rounded-full"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="font-semibold">
                  {JSON.parse(sessionStorage.getItem("user") || "").name}
                </p>
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
