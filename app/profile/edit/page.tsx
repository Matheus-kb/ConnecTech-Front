"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import api from "@/app/_api/api";
import { useRouter } from "next/navigation";

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.repeatpassword) {
      window.alert("As senhas não coincidem");
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

        router.push("/profile");
      } else {
        window.alert(`Erro ao atualizar perfil: ${response.statusText}`);
      }
    } catch (error) {
      window.alert(`Erro ao atualizar perfil: ${error}`);
    }
  }

  return (
    <>
      {sessionStorage.getItem("user") === null ? (
        router.push("/login")
      ) : (
        <div>
          <Header />
          <div className="flex flex-col items-center justify-center my-4">
            <div className="flex flex-row gap-4  pb-12">
              <div className="relative w-12 h-12">
                <Image
                  src="/profile.png"
                  alt="Foto de perfil"
                  className="rounded-full"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h1 className="uppercase font-bold text-xl pt-2">
                Edite seu perfil
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
                                  window.alert(
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
