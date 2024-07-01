"use client";

import Header from "@/components/header";
import Search from "./components/search";
import EventItem from "./components/event-item";
import { Card } from "@/components/ui/card";
import PersonItem from "./components/person-item";
import { useEffect, useState } from "react";
import api from "../_api/api";
import { EventType } from "@/types/event";

export default function Home() {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await api.get("/events");
      setEvents(response.data);
    };

    fetchEvents();
  }, []);

  const sortedByDate = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <Header />
      <div className="px-5 pt-12 pb-2">
        <h1 className="font-bold text-3xl">Olá usuário!</h1>
        <p className="font-semibold">Confira os eventos de hoje</p>
      </div>
      <div className="pb-9">
        <Search />
      </div>
      <Card className="mb-5 py-2">
        <h2 className="font-semibold px-5 pb-3 uppercase">Eventos próximos</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      </Card>
      <Card className="mb-5 py-2">
        <h2 className="font-semibold px-5 pb-3 uppercase">Eventos Populares</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {sortedByDate.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      </Card>
      <Card className="mb-5 py-2">
        <h2 className="font-semibold px-5 pb-3 uppercase">
          Pessoas e empresas
        </h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <PersonItem />
          <PersonItem />
          <PersonItem />
          <PersonItem />
          <PersonItem />
          <PersonItem />
          <PersonItem />
          <PersonItem />
        </div>
      </Card>
    </>
  );
}
