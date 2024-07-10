import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card copy";

const Header2 = () => {
  const router = useRouter();
  return (
    <Card className="hidden max-h-12 lg:flex flex-row justify-center items-center py-5">
      <CardContent className="">
        <Button
          variant="ghost"
          onClick={() => {
            router.push("/");
          }}
        >
          <div>
            <h1 className="font-bold text-3xl">ConnecTech</h1>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header2;
