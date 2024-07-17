import { EventType } from "@/app/_types/event";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface EventItemProps {
  event: EventType;
}



const SearchItem: React.FC<EventItemProps> = ({ event }) => {
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

  console.log(imageUrl, 'imageUrl')
  return (
    <div onClick={handleClick} className="min-w-full max-w-full px-7 lg:max-w-72 lg:min-w-72 lg:py-8 lg:px-0">
      <Card className=" lg:max-w-72 lg:max-h-60">
        <div className="py-0">
          <div className="w-full h-[5rem] relative lg:w-72 lg:h-60">
            <Image
              src={imageUrl || '/images/placeholder.png'}
              alt="Banner do evento"
              style={{ objectFit: "cover" }}
              fill
              className="rounded-2xl"
            />
          </div>
          <h1 className="font-bold text-2xl overflow-hidden text-ellipsis text-nowrap">
            {event.title}
          </h1>
          <p className="font-semibold">
            {format(new Date(event.date), 'dd/MM/yyyy HH:mm')}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SearchItem;
