// app/(home)/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_api/auth";
import HomeContent from "./HomeContent";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || "usuário";

  return <HomeContent userName={userName} />;
}
