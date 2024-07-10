"use client"

import Header from "@/components/header";
import Search from "../(home)/components/search";
import SearchItem from "./components/search-item";
import { useEffect, useState } from "react";
import { EventType } from "../_types/event";
import api from "../_api/api";

const EventsPage = () => {
    const [events, setEvents] = useState<EventType[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
          const response = await api.get("/events");
          setEvents(response.data);
        };
        fetchEvents();
    }, []);
    return ( 
        <>
        <Header />
        <div className="py-5">
            <Search />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:justify-center">
        {events.map((event) => (
            <SearchItem key={event.id} event={event} />
          ))}
        </div>
        </>
     );
}
 
export default EventsPage;