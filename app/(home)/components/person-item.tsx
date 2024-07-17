import { OrganizerType } from "@/app/_types/organizers";
import Image from "next/image";
import { useEffect, useState } from "react";

interface OrganizerItemProps {
  organizer: OrganizerType;
}

const PersonItem = ({ organizer }: OrganizerItemProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const getImageUrl = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/upload/organizer/${organizer.id}/photo`
      );

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      // Assuming the response returns the actual file name
      const imageName = await response.text(); // Adjust this according to your API response format
      console.log(imageName, "imagem");
      // Construct the URL based on your server setup
      const imageUrl = `${imageName}`;

      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Erro ao buscar a imagem:", error);
    }
  };
  console.log(imageUrl, "url");
  useEffect(() => {
    getImageUrl();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-w-20 max-w-20">
      <div className="relative w-14 h-14 lg:w-36 lg:h-36">
        <Image
          src={imageUrl}
          alt="Pessoas em destaque"
          className="rounded-full"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <p className="font-medium text-center overflow-hidden text-ellipsis">
        {organizer.name}
      </p>
    </div>
  );
};

export default PersonItem;
