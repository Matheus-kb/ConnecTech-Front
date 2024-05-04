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
import Header from "@/components/header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  priceticket: z.number().min(1, {
    message: "Insira um preço para os ingressos",
  }),
  lots: z.number().min(2, {
    message: "Digite a quantidade de lotes",
  }),
  increaseperlot: z.number().min(2, {
    message: "Informe o aumento por lote",
  }),
  payment: z.string().min(10, {
    message: "Informe a forma de pagamento dos ingressos",
  }),
});

const TicketDefinition = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priceticket: undefined,
      lots: undefined,
      increaseperlot: undefined,
      payment: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-[90vh] px-4">
        <h1 className="uppercase font-bold text-xl pb-12">Ingresso e forma de pagamento</h1>
        <div className="mt-32">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-row gap-2 px-2">
                <FormField
                  control={form.control}
                  name="priceticket"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm">
                        Valor do ingresso
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="R$ 0,00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lots"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm">
                        N° de lotes
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="increaseperlot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm">
                        Valor por lote
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="R$ 0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="FORMAS DE PAGAMENTO" className="font-medium"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Pix</SelectItem>
                          <SelectItem value="2">Crédito</SelectItem>
                          <SelectItem value="3">Débito</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center">
                <Button
                  className="min-w-[18.75rem] rounded-3xl font-bold text-xl mt-32"
                  type="submit"
                >
                  Finalizar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default TicketDefinition;
