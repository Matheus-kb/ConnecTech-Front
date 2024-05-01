import Header from "@/components/header";
import Search from "./components/search";
import EventItem from "./components/event-item";
import { Card } from "@/components/ui/card";
import PersonItem from "./components/person-item";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-12 pb-2">
        <h1 className="font-bold text-3xl">Olá usuário!</h1>
        <p className="font-semibold">Confira os eventos de hoje</p>
      </div>
      <div className="pb-9">
        <Search />
      </div>
      <Card className="mb-5 py-2">
        <h2 className="font-semibold px-5 pb-3 uppercase">Eventos próximos</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <EventItem />
          <EventItem />
          <EventItem />
        </div>
      </Card>
      <Card className="mb-5 py-2">
        <h2 className="font-semibold px-5 pb-3 uppercase">Eventos Populares</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <EventItem />
          <EventItem />
          <EventItem />
        </div>
      </Card>
      <Card className="mb-5 py-2">
        <h2 className="font-semibold px-5 pb-3 uppercase">Pessoas e empresas</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <PersonItem />
          <PersonItem />
          <PersonItem />
          <PersonItem />
          <PersonItem />
          <PersonItem />
          <PersonItem />
          <PersonItem />
        </div>
      </Card>
    </>
  );
}
