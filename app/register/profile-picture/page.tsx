"use client";

import Header2 from "@/components/header2";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ProfilePicture = () => {
  const data =
    sessionStorage.getItem("user") === null
      ? null
      : JSON.parse(sessionStorage.getItem("user") || "");
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const uploadUrl = `http://localhost:3000/upload/${data?.type}/${data?.id}`;
  const getImageUrl = async () => {
    if (!data?.type || !data?.id) {
      console.error("Tipo ou ID não definidos");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/upload/${data.type}/${data.id}/photo`
      );

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      // Assuming the response returns the actual file name
      const imageName = await response.text(); // Adjust this according to your API response format
      console.log(imageName, "imagem");
      // Construct the URL based on your server setup
      const imageUrl = `${imageName}`;

      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Erro ao buscar a imagem:", error);
    }
  };

  console.log(imageUrl, "url");
  useEffect(() => {
    getImageUrl();
  }, []);

  async function uploadImage() {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Imagem enviada com sucesso!");
        getImageUrl(); // Atualiza a imagem após o upload
      } else {
        toast.error("Erro ao enviar imagem");
      }
    } catch (error) {
      toast.error(`Erro ao enviar imagem: ${error}`);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  }

  const onSubmit = async () => {
    if (selectedFile) {
      await uploadImage();
      setTimeout(() => {
        window.location.href = "/";
      }, 1000 * 3);
    }
  };

  return (
    <>
      <Toaster />
      {sessionStorage.getItem("user") === null ? (
        router.push("/login")
      ) : (
        <div className="min-h-screen flex flex-col justify-center">
          <Header2 />
          <div className="flex flex-col items-center justify-center my-4 lg:flex-row lg:justify-evenly lg:my-auto">
            <div className="flex  gap-4 pb-12 flex-col justify-center items-center">
              <div className="relative w-48 h-48 lg:w-72 lg:h-72">
                <Image
                  src={imageUrl}
                  alt="Foto de perfil"
                  className="rounded-full"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h1 className="uppercase font-bold text-xl pt-2">{data.name}</h1>
            </div>
            <div className="flex flex-col gap-6 items-center">
              <h1 className="text-lg font-semibold">
                Defina sua foto de perfil
              </h1>
              <div className="min-w-[18.75rem] flex">
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="fileInput"
                  className="w-full rounded-3xl font-medium text-sm uppercase border text-[hsl(var(--foreground))] text-center py-2 cursor-pointer"
                >
                  Escolher Foto
                </label>
              </div>
              {!selectedFile ? "" : <Button
                onClick={onSubmit}
                className="min-w-[18.75rem] rounded-3xl font-bold text-xl uppercase"
              >
                Enviar
              </Button>}
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePicture;
