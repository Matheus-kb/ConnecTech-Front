// app/events/[id]/page.tsx
import { notFound } from "next/navigation";
import api from "@/app/_api/api";
import { EventType } from "@/app/_types/event";
import EventInfo from "./components/event-info"; 
import Header from "@/components/header";

interface EventDetailProps {
  params: {
    id: string;
  };
}

const fetchEvent = async (id: string): Promise<EventType | null> => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

const EventDetail: React.FC<EventDetailProps> = async ({ params }) => {
  const event = await fetchEvent(params.id);

  if (!event) {
    notFound();
  }

  return (
    <>
      <Header />
      <EventInfo event={event} />
    </>
  );
};

export default EventDetail;
