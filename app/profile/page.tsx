"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../_api/auth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const data =
    sessionStorage.getItem("user") === null
      ? null
      : JSON.parse(sessionStorage.getItem("user") || "");
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/profile/edit");
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
    <>
      {sessionStorage.getItem("user") === null ? (
        router.push("/login")
      ) : (
        <div>
          <Header />
          <div className="flex flex-col justify-center items-center h-[90vh]">
            <div className="relative w-36 h-36">
              <Image
                src={imageUrl}
                alt="Foto de perfil"
                className="rounded-full"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="py-4">
              <h1 className="font-semibold text-2xl">{data?.name}</h1>
            </div>
            <div className="py-8  w-48">
              <Button
                className="uppercase rounded-full font-semibold text-lg w-48"
                onClick={handleEditProfile}
              >
                Editar perfil
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
