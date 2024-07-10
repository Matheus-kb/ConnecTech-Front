"use client";

import Header from "@/components/header";
import Search from "../(home)/components/search";
import SearchItem from "./components/search-item";
import { useEffect, useState } from "react";
import { EventType } from "../_types/event";
import api from "../_api/api";
import { useRouter } from "next/navigation";

const EventsPage = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await api.get("/events");
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  return (
    <>
      {sessionStorage.getItem("user") === null ? (
        router.push("/login")
      ) : (
        <div>
          <Header />
          <div className="py-5">
            <Search />
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:justify-center">
            {events.map((event) => (
              <SearchItem key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;
