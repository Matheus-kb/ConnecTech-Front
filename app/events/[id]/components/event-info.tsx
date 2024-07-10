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
    <div className="lg:flex lg:flex-col lg:justify-center lg:items-center">
      <div className="relative w-full h-44 lg:h-96 lg:w-[80%] lg:mx-auto lg:my-8">
        <Image
          src="/image.png"
          alt="Banner do evento"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="px-7 py-6 lg:flex lg:flex-col gap-6">
        <div>
          <h1 className="font-bold text-2xl overflow-hidden text-ellipsis text-nowrap lg:text-3xl lg:pb-4">
            {event.title}
          </h1>
          <p className="font-semibold overflow-hidden text-ellipsis text-nowrap lg:pb-6">
            Dia: {new Date(event.date).toLocaleDateString()} ° Horário:{" "}
            {new Date(event.date).toLocaleTimeString()}
          </p>
          <p className="font-semibold overflow-hidden text-ellipsis text-nowrap lg:pb-6">
             {event.location}
          </p>
        </div>
        <div>
          <h2 className="font-medium text-lg pb-4 lg:text-xl lg:font-bold">Descrição</h2>
          <p className="break-words whitespace-normal max-w-96">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
