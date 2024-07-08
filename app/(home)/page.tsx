"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_api/auth";
import HomeContent from "./HomeContent";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      {sessionStorage.getItem("user") === null ? (
        router.push("/login")
      ) : (
        <HomeContent
          userName={JSON.parse(sessionStorage.getItem("user") || "").name}
        />
      )}
    </>
  );
}
