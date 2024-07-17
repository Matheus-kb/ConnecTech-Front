import { useState, useEffect } from "react";
import { EventType } from "@/app/_types/event";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import api from "@/app/_api/api";
import toast from "react-hot-toast";
import axios from "axios";

interface EventInfoProps {
  event: EventType;
}

interface Volunteer {
  id: string;
  name: string;
}

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const data = sessionStorage.getItem("user") === null ? null : JSON.parse(sessionStorage.getItem("user") || "");

  useEffect(() => {
    getImageUrl();
    fetchVolunteers();
  }, []);

  const getImageUrl = async () => {
    try {
      const response = await fetch(`http://localhost:3000/upload/event/${event.id}/banner`);

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const imageName = await response.text();
      const imageUrl = `${imageName}`;
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Erro ao buscar a imagem:', error);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const response = await api.get(`/events/${event.id}/volunteers`);
      setVolunteers(response.data);
    } catch (error) {
      console.error("Erro ao buscar os voluntários:", error);
    }
  };

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

  const handleVolunteerAssociation = async () => {
    try {
      const userId = data.id; // Substitua com a lógica para obter o ID do usuário logado
      const response = await api.post(`/volunteers/${userId}/associate/${event.id}`);
      toast.success("Você se associou com sucesso ao evento!");
      fetchVolunteers(); // Atualize a lista de voluntários após a associação
    } catch (error) {
      console.error("Erro ao associar voluntário ao evento:", error);
      toast.error("Erro ao tentar se associar ao evento.");
    }
  };

  const uploadUrl = `http://localhost:3000/upload/banner/${event.id}`;

  async function uploadImage() {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Imagem enviada com sucesso!");
        getImageUrl(); // Atualiza a imagem após o upload
      } else {
        toast.error("Erro ao enviar imagem");
      }
    } catch (error) {
      toast.error(`Erro ao enviar imagem: ${error}`);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  }

  return (
    <div className="flex flex-col justify-center lg:items-center pb-5">
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
        <div>
          <h2 className="font-medium text-lg pb-4 lg:text-xl lg:font-bold">
            Voluntários Associados
          </h2>
          {volunteers.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b-2 border-gray-200 text-left">ID</th>
                  <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Nome</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((volunteer, index) => (
                  <tr key={volunteer.id}>
                    <td className="px-4 py-2 border-b border-gray-200">{index + 1}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{volunteer.name}</td>
                  </tr>

                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-red-500">Nenhum voluntário associado a este evento.</p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          className="min-w-[18.75rem] rounded-3xl font-bold text-xl mt-4"
          onClick={handleBuyTicket}
        >
          Comprar ingresso
        </Button>
        <Button
          className="min-w-[18.75rem] rounded-3xl font-bold text-xl mt-4 ml-4"
          onClick={handleVolunteerAssociation}
        >
          Associar-se como Voluntário
        </Button>
      </div>
      <div className="flex flex-col items-center mt-4">
        <input type="file" className="text-sm mb-2" onChange={handleFileChange} />
        <Button onClick={uploadImage}>
          Upload Imagem
        </Button>
      </div>
    </div>
  );
};

export default EventInfo;
