"use client";
import { ChevronLeft, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import SideMenu from "./side-menu";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const goBack = () => router.back();

  const sideMenuItems = [
    { label: "Inicio", path: "/", onClick: () => router.push("/") },
    { label: "Ingressos", onClick: () => {} },
    { label: "Opções", onClick: () => {} },
  ];

  return (
    <Card className="max-h-12">
      <CardContent className="flex flex-row justify-between items-center pt-1">
        <ChevronLeft  className="min-w-9 min-h-9 lg:hidden" />
        <Button variant="ghost" onClick={goBack} className="hidden lg:block"> 
        <div>
          <h1 className="font-bold text-3xl pt-[-0.5rem]">ConnecTech</h1>
        </div>
        </Button>
        <div className="hidden lg:flex space-x-4 items-end ml-auto">
          {sideMenuItems.slice(0, 3).map((item, index) => (
            <Button key={index} variant="ghost" onClick={item.onClick}>
              {item.label}
            </Button>
          ))}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Menu className="min-w-9 min-h-9 lg:hidden" />

              <div className="hidden lg:flex lg:flex-row-reverse items-center lg:gap-4 pl-12">
                <div className="relative w-7 h-7">
                  <Image
                    src="/profile.png"
                    alt="Foto de perfil"
                    className="rounded-full"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="font-semibold">User Name</p>
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
