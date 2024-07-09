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
import { AtSign, CaptionsIcon, LockKeyholeIcon, User } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import api from "@/app/_api/api";
import Header2 from "@/components/header2";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "O nome de usuário deve ter pelo menos 2 caracteres",
  }),
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de e-mail válido" }),
  document: z
    .string()
    .min(11, { message: "Por favor, insira um documento válido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  repeatpassword: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(10, { message: "A senha deve ter no máximo 10 caracteres" }),
});

const RegisterOrganizationPage = () => {
  const [message, setMessage] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      document: "",
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
      const response = await api.post("/organizers", {
        name: values.username,
        email: values.email,
        cnpj: values.document,
        password: values.password,
      });
      window.alert("Conta de organizador criada com sucesso!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        window.alert(
          "Erro ao criar a conta de organizador: " +
            (error.response?.data?.message || error.message)
        );
      } else {
        window.alert("Erro desconhecido ao criar a conta de organizador");
      }
    }
  }

  return (
    <>
      <Header2 />
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="uppercase font-bold text-xl pb-12 lg:text-2xl">Faça seu cadastro</h1>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Nome do usuário</FormLabel>
                    <div className="flex flex-row gap-2">
                      <User className="mt-2" />
                      <FormControl>
                        <Input
                          className="min-w-72"
                          placeholder="Digite o nome"
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
                          placeholder="Digite um email válido"
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
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">CNPJ/CPF</FormLabel>
                    <div className="flex flex-row gap-2">
                      <CaptionsIcon className="mt-2" />
                      <FormControl>
                        <Input
                          className="min-w-72"
                          placeholder="Digite seu CNPJ ou CPF"
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
                    <FormLabel className="font-bold">Confirmar senha</FormLabel>
                    <div className="flex flex-row gap-2">
                      <LockKeyholeIcon className="mt-2" />
                      <FormControl>
                        <Input
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
              <div className="mt-14">
                <Button
                  className="min-w-[18.75rem] rounded-3xl font-bold text-xl"
                  type="submit"
                >
                  Cadastrar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterOrganizationPage;
