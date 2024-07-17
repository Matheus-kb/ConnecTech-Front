import api from "@/app/_api/api";
import { EventType } from "@/app/_types/event";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

interface EventInfoProps {
  event: EventType;
}

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const handleBuyTicket = async () => {
    try {
      const response = await api.post("/payment", {
        userId: 1,
        eventId: event.id,
        value: 1000,
        expiration: 5,
        eventTitle: event.title,
        image: "https://via.placeholder.com/150",
      });
      const confirma = window.confirm("Confirme sua compra de ingresso");
      if (confirma) {
        window.alert("Compra realizada com sucesso!");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        window.alert(error.response?.data.message);
      }
    }
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

  console.log(imageUrl, 'imageUrl')


  return (
    <div className="flex flex-col justify-center lg:items-center">
      <div className="relative w-full h-44 lg:h-96 lg:w-[80%] lg:mx-auto lg:my-8">
        <Image
          src={imageUrl || '/image.png'}
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
          <h2 className="font-medium text-lg pb-4 lg:text-xl lg:font-bold">
            Descrição
          </h2>
          <p className="break-words whitespace-normal max-w-96">
            {event.description}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          className="min-w-[18.75rem] rounded-3xl font-bold text-xl mt-4"
          onClick={handleBuyTicket}
        >
          Comprar ingresso
        </Button>
      </div>
    </div>
  );
};

export default EventInfo;
