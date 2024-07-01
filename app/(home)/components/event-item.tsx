import Image from "next/image";
import { EventType } from '@/types/event';
import { format } from 'date-fns';


interface EventItemProps {
  event: EventType;
}

const EventItem = ({event} : EventItemProps) => {
  return (
    <div className="min-w-52 max-w-52">
      <div className="py-0">
        <div className="w-full h-[5rem] relative">
          <Image
            src="/image.png"
            alt="Banner do evento"
            style={{ objectFit: "cover" }}
            fill
            className="rounded-2xl"
          />
        </div>
        <h1 className="font-bold text-2xl overflow-hidden text-ellipsis text-nowrap">
          {event.title}
        </h1>
        <p className="font-semibold overflow-hidden text-ellipsis text-nowrap">
        {format(new Date(event.date), 'dd/MM/yyyy HH:mm')}
        </p>
        <p className="font-semibold overflow-hidden text-ellipsis text-nowrap">
        {event.location}
        </p>
      </div>
    </div>
  );
};

export default EventItem;
