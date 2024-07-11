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
import { AtSign, LockKeyholeIcon } from "lucide-react";
import api from "../_api/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header2 from "@/components/header2";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de e-mail válido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

const LoginPage = () => {
  const [message, setMessage] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await api.post("/auth/login", {
        body: { email: values.email, password: values.password },
      });

      if (res?.status === 401) {
        setMessage("Erro ao realizar login: " + res.data.message);
      } else {
        setMessage("Login realizado com sucesso!");
        router.push("/");
        sessionStorage.setItem("token", res.data.access_token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setMessage("Erro desconhecido ao realizar login");
    }
  }

  return (
    <>
      <Header2 />
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="uppercase font-bold text-xl pb-12 lg:text-2xl">
          Faça seu login
        </h1>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                          type="text"
                          className="min-w-72"
                          placeholder="Digite seu email de cadastro"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-end">
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
                            placeholder="Digite sua senha"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <a
                  href="/register"
                  className="mt-1 text-sm text-blue-600 underline"
                >
                  Cadastre-se
                </a>
              </div>
              <div className="mt-14">
                <Button
                  className="min-w-[18.75rem] rounded-3xl font-bold text-xl"
                  type="submit"
                >
                  Entrar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
