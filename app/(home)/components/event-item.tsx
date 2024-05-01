import Image from "next/image";

const EventItem = () => {
  return (
    <div className="min-w-52 max-w-52">
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
        <p className="font-semibold overflow-hidden text-ellipsis text-nowrap">
          Modalidade - Local
        </p>
      </div>
    </div>
  );
};

export default EventItem;
