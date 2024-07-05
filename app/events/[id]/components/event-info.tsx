// components/event-info.tsx
import { EventType } from "@/app/_types/event";
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

interface EventInfoProps {
  event: EventType;
}

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
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
            {event.title}
          </h1>
          <p className="font-semibold overflow-hidden text-ellipsis text-nowrap">
            Dia: {new Date(event.date).toLocaleDateString()} ° Horário: {new Date(event.date).toLocaleTimeString()}
          </p>
          <p className="font-semibold overflow-hidden text-ellipsis text-nowrap">
            Modalidade - {event.location}
          </p>
        </div>
        <div>
          <h2 className="font-medium text-lg pb-4">Descrição</h2>
          <p>{event.description}</p>
        </div>
        <div>
          <h2 className="font-medium text-lg pb-4">Ingressos</h2>
          {/* Adicione lógica para exibir ingressos, se necessário */}
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
                CONFIRMAR
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default EventInfo;
