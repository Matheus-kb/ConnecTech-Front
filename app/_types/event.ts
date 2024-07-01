// src/types/event.ts
export interface EventType {
    id: string;
    title: string;
    description?: string;
    location: string;
    date: string; // Pode ser string ou Date dependendo de como você está recebendo a data da API
    organizerId: string;
    volunteerId?: string;
  }
  