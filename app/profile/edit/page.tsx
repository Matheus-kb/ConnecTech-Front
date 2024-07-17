"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AtSign, LockKeyholeIcon, User } from "lucide-react";
import Header from "@/components/header";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import api from "@/app/_api/api";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import email from "next-auth/providers/email";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "O nome de usuário deve ter pelo menos 2 caracteres",
  }),
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de e-mail válido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  repeatpassword: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(10, { message: "A senha deve ter no máximo 10 caracteres" }),
});

const EditProfilePage = () => {
  const data =
    sessionStorage.getItem("user") === null
      ? null
      : JSON.parse(sessionStorage.getItem("user") || "");
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatpassword: "",
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const uploadUrl = `http://localhost:3000/upload/${data?.type}/${data?.id}`;
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


  console.log(imageUrl, 'url')
  useEffect(() => {
    getImageUrl();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.repeatpassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    try {
      const response = await api.put(`/${data?.type}s/${data?.id}`, {
        name: values.username,
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        const user = data;

        user.name = values.username;
        user.email = values.email;
        user.password = values.password;

        sessionStorage.setItem("user", JSON.stringify(user));

        toast.success("Perfil atualizado com sucesso!");

        if (selectedFile) {
          await uploadImage();
        }

        router.push("/profile");
      } else {
        toast.error(`Erro ao atualizar perfil: ${response.statusText}`);
      }
    } catch (error) {
      toast.error(`Erro ao atualizar perfil: ${error}`);
    }
  }

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

  return (
    <>
      <Toaster />
      {sessionStorage.getItem("user") === null ? (
        router.push("/login")
      ) : (
        <div className="lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
          <Header />
          <div className="flex flex-col items-center justify-center my-4 lg:flex-row lg:justify-evenly lg:my-auto">
            <div className="flex flex-row gap-4 pb-12 lg:flex-col lg:justify-center lg:items-center">
              <div className="relative w-12 h-12 lg:w-72 lg:h-72">
                <Image
                  src={imageUrl}
                  alt="Foto de perfil"
                  className="rounded-full"
                  layout="fill"
                  objectFit="cover"
                />

              </div>
              <h1 className="uppercase font-bold text-xl pt-2 lg:hidden">
                Edite seu perfil
              </h1>
              <h1 className="hidden uppercase font-bold text-xl pt-2 lg:block">
                {data.name}
              </h1>
            </div>
            <div>
              <Form {...form}>
                <form className="space-y-8">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Nome do usuário
                        </FormLabel>
                        <div className="flex flex-row gap-2">
                          <User className="mt-2" />
                          <FormControl>
                            <Input
                              className="min-w-72"
                              placeholder={data?.name}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Email</FormLabel>
                        <div className="flex flex-row gap-2">
                          <AtSign className="mt-2" />
                          <FormControl>
                            <Input
                              className="min-w-72"
                              placeholder={data?.email}
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Senha</FormLabel>
                        <div className="flex flex-row gap-2">
                          <LockKeyholeIcon className="mt-2" />
                          <FormControl>
                            <Input
                              type="password"
                              className="min-w-72"
                              placeholder="Digite uma senha de 6 á 10 caracteres"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="repeatpassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Confirmar senha
                        </FormLabel>
                        <div className="flex flex-row gap-2">
                          <LockKeyholeIcon className="mt-2" />
                          <FormControl>
                            <Input
                              type="password"
                              className="min-w-72"
                              placeholder="Digite sua senha novamente"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <input type="file" onChange={handleFileChange} />
                  </div>
                  <div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="min-w-[18.75rem] rounded-3xl font-bold text-xl uppercase">
                          Confirmar
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="max-w-72 rounded-lg">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Confirmar as alterações?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="flex flex-row justify-center items-center gap-12">
                          <AlertDialogAction
                            className="rounded-full"
                            onClick={() => {
                              form.trigger().then((isValid) => {
                                if (isValid) {
                                  onSubmit(form.getValues());
                                } else {
                                  toast.error(
                                    "Por favor, preencha todos os campos"
                                  );
                                }
                              });
                            }}
                          >
                            SIM
                          </AlertDialogAction>
                          <AlertDialogCancel className="mt-0 rounded-full">
                            NÃO
                          </AlertDialogCancel>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <div>
                    <Button
                      className="min-w-[18.75rem] rounded-3xl font-bold text-xl uppercase"
                      variant="outline"
                      onClick={() => router.push("/profile")}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfilePage;
