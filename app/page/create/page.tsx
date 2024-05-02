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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  pagename: z.string().min(2, {
    message: "O nome da página deve ter pelo menos 2 caracteres",
  }),
  description: z.string().min(10, {
    message: "A descrição da página deve ter pelo menos 10 caracteres",
  }),
});

const PageCreation = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pagename: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="uppercase font-bold text-xl pb-12">Monte sua página de eventos</h1>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="pagename"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Nome da página</FormLabel>
                    <div className="flex flex-row gap-2">
                      <User className="mt-2" />
                      <FormControl>
                        <Input
                          className="min-w-72"
                          placeholder="Escreva o nome da sua página"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <p className="text-sm underline">Escolha uma imagem para sua página</p>
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Descrição</FormLabel>
                    <div className="flex flex-row gap-2">
                      <AtSign className="mt-2" />
                      <FormControl>
                        <Textarea
                          placeholder="Faça uma descrição sobre sua página de eventos"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button
                  className="min-w-[18.75rem] rounded-3xl font-bold text-xl uppercase"
                  type="submit"
                >
                  Confirmar
                </Button>
              </div>
              <div className="mt-14">
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
    </>
  );
};

export default PageCreation;
