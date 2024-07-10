"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/app/_api/api';
import { EventType } from '@/app/_types/event';
import EventInfo from './components/event-info';
import Header from '@/components/header';

interface EventDetailProps {
  params: {
    id: string;
  };
}

const EventDetail: React.FC<EventDetailProps> = ({ params }) => {
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${params.id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        router.push('/404'); // Redireciona para a página 404 se o evento não for encontrado
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!event) {
    return null; // Ou alguma mensagem de erro personalizada
  }

  return (
    <>
      <Header />
      <EventInfo event={event} />
    </>
  );
};

export default EventDetail;
