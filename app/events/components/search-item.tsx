import { Card } from "@/components/ui/card";
import Image from "next/image";

const SearchItem = () => {
  return (
    <div className="min-w-full max-w-full px-7">
      <Card>
        <div className="py-0">
          <div className="w-full h-[5rem] relative">
            <Image
              src="/image.png"
              alt="Banner do evento"
              style={{ objectFit: "cover" }}
              fill
              className="rounded-2xl"
            />
          </div>
          <h1 className="font-bold text-2xl overflow-hidden text-ellipsis text-nowrap">
            Nome do evento kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
          </h1>
          <p className="font-semibold overflow-hidden text-ellipsis text-nowrap">
            Dia ° Data ° Horario
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SearchItem;
