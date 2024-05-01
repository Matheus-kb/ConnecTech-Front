import Image from "next/image";

const PersonItem = () => {
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
      <p className="font-medium text-center overflow-hidden text-ellipsis">Angelo Luz</p>
    </div>
  );
};

export default PersonItem;
