import Header from "@/components/header";
import Search from "../(home)/components/search";
import SearchItem from "./components/search-item";

const EventsPage = () => {
    return ( 
        <>
        <Header />
        <div className="py-5">
            <Search />
        </div>
        <div className="flex flex-col gap-4">
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
        </div>
        </>
     );
}
 
export default EventsPage;