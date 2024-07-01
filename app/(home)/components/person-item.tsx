import { OrganizerType } from "@/app/_types/organizers";
import Image from "next/image";

interface OrganizerItemProps {
  organizer: OrganizerType;
}

const PersonItem = ({organizer} : OrganizerItemProps) => {
  return (
    <div className="flex flex-col justify-center items-center min-w-20 max-w-20">
      <div className="relative w-14 h-14">
        <Image
          src="/angelo.png"
          alt="Pessoas em destaque"
          className="rounded-full"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <p className="font-medium text-center overflow-hidden text-ellipsis">{organizer.name}</p>
    </div>
  );
};

export default PersonItem;
