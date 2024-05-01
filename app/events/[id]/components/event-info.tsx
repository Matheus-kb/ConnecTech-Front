import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const EventInfo = () => {
  return (
    <div>
      <div className="relative w-full h-44">
        <Image
          src="/image.png"
          alt="Banner do evento"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="px-7 py-6 flex flex-col gap-6">
        <div>
          <h1 className="font-bold text-2xl overflow-hidden text-ellipsis text-nowrap">
            Nome do evento kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
          </h1>
          <p className="font-semibold overflow-hidden text-ellipsis text-nowrap">
            Dia ° Data ° Horario
          </p>
          <p className="font-semibold overflow-hidden text-ellipsis text-nowrap">
            Modalidade - Local
          </p>
        </div>
        <div>
          <h2 className="font-medium text-lg pb-4">Descrição</h2>
          <p>
            O 2º Simpósio de Inovação, Tecnologia e Sustentabilidade é um evento
            dedicado a explorar e promover o papel crucial da inovação e da
            tecnologia na busca por soluções sustentáveis para os desafios
            contemporâneos. Este simpósio oferece uma plataforma dinâmica para
            líderes, profissionais, acadêmicos e estudantes se reunirem,
            compartilharem ideias inovadoras, e discutirem as últimas tendências
            e descobertas.
          </p>
        </div>
        <div>
          <h2 className="font-medium text-lg pb-4">Ingressos</h2>
          <p>Lote 1 - R$ 20,00</p>
          <p>Lote 2 - R$ 30,00</p>
          <p>Lote 4 - R$ 40,00</p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="rounded-full font-semibold text-xl mt-8">
              Comprar ingresso
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-72 rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Você será direcionado para realizar o pagamento</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="flex flex-row justify-center items-center gap-12">
              <AlertDialogAction className="rounded-full text-xl">
                CONFIMRAR
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default EventInfo;
