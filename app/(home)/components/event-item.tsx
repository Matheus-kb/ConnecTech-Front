"use client"

import Image from "next/image";
import { EventType } from '@/app/_types/event';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

interface EventItemProps {
  event: EventType;
}


const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleClick = () => {
    router.push(`/events/${event.id}`);
  };

  const getImageUrl = async () => {

    try {
      const response = await fetch(`http://localhost:3000/upload/event/${event.id}/banner`);

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      // Assuming the response returns the actual file name
      const imageName = await response.text(); // Adjust this according to your API response format
      console.log(imageName, 'imagem')
      // Construct the URL based on your server setup
      const imageUrl = `${imageName}`;

      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Erro ao buscar a imagem:', error);
    }
  };
  console.log(imageUrl, 'url')
  useEffect(() => {
    getImageUrl();
  }, []);
  return (
    <div onClick={handleClick} className="min-w-52 max-w-52 cursor-pointer lg:min-w-96 lg:max-w-96 ">
      <div className="py-0">
        <div className="w-full h-[5rem] relative lg:h-[9rem]">
          <Image
            src={imageUrl}
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
