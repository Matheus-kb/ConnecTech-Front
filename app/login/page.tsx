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
import { AtSign, LockKeyholeIcon } from "lucide-react";
import Header from "@/components/header";
import api from "../_api/api";
import { useContext, useState } from "react";
import axios from "axios";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
      <Header />
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="uppercase font-bold text-xl pb-12">Faça seu login</h1>
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
