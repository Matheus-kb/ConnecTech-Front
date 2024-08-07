// app/(home)/HomeContent.tsx
"use client";

import Header from "@/components/header";
import Search from "./components/search";
import EventItem from "./components/event-item";
import { Card } from "@/components/ui/card";
import PersonItem from "./components/person-item";
import { useEffect, useState } from "react";
import api from "../_api/api";
import { EventType } from "@/app/_types/event";
import { OrganizerType } from "@/app/_types/organizers";
import Image from "next/image";

interface HomeContentProps {
  userName: string;
}

const HomeContent: React.FC<HomeContentProps> = ({ userName }) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [organizers, setOrganizers] = useState<OrganizerType[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await api.get("/events");
      setEvents(response.data);
      const eventIds = response.data.map((event: EventType) => event.id);
      getImageUrls(eventIds);
    };
    fetchEvents();

    const fetchOrganizers = async () => {
      const response = await api.get("/organizers");
      setOrganizers(response.data);
    };
    fetchOrganizers();
  }, []);

  const sortedByDate = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getImageUrls = async (eventIds: string[]) => {
    try {
      const urls = await Promise.all(
        eventIds.map(async (id) => {
          const response = await fetch(`http://localhost:3000/upload/event/${id}/banner`);
          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
          }
          const imageName = await response.text(); // Ajuste conforme o formato da resposta da sua API
          return imageName; // Construa a URL conforme necessário
        })
      );
      setImageUrls(urls);
    } catch (error) {
      console.error('Erro ao buscar as imagens:', error);
    }
  };
  console.log(events, 'events')
  console.log(organizers, 'organizers')

  return (
    <div>
      <Header />
      <Card className="flex lg:mb-5">
        <div className="flex-1 px-5 pt-12 pb-2 lg:pb-0">
          <div className="px-7">
            <h1 className="font-bold text-3xl lg:pb-4">Olá {userName}!</h1>
            <p className="font-semibold pb-3">Confira os eventos de hoje</p>
          </div>
          <div className="pb-9 lg:max-w-96">
            <Search />
          </div>
        </div>
        <div className="flex-1 relative hidden lg:block">
          <Image
            src={imageUrls[0] || "/image.png"} // Exibindo a primeira imagem do array como exemplo
            alt="Banner do evento"
            fill
            style={{ objectFit: "cover" }}
            className="absolute inset-0"
          />
        </div>
      </Card>

      <Card className="mb-5 py-2 lg:pl-4">
        <h2 className="font-semibold px-5 pb-3 uppercase">Eventos próximos</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden lg:gap-12">
          {events.map((event, index) => (
            <EventItem key={event.id} event={event} imageUrl={imageUrls[index]} />
          ))}
        </div>
      </Card>
      <Card className="mb-5 py-2 lg:pl-4">
        <h2 className="font-semibold px-5 pb-3 uppercase">Eventos Populares</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden lg:gap-12">
          {sortedByDate.map((event, index) => (
            <EventItem key={event.id} event={event} imageUrl={imageUrls[index]} />
          ))}
        </div>
      </Card>
      <Card className="mb-5 py-2 lg:pl-4">
        <h2 className="font-semibold px-5 pb-3 uppercase">
          Pessoas e empresas
        </h2>
        <div className="flex px-5 gap-4 overflow-x-auto lg:gap-24 lg:px-10">
          {organizers.map((organizer) => (
            <PersonItem key={organizer.id} organizer={organizer} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeContent;
