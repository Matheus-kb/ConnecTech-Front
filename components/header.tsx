"use client";
import { ChevronLeft, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import SideMenu from "./side-menu";

const Header = () => {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <Card className="max-h-12">
      <CardContent className="flex flex-row justify-between items-center pt-1">
        <ChevronLeft onClick={goBack} className="min-w-9 min-h-9" />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Menu className="min-w-9 min-h-9" />
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
