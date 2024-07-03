import NextAuth from "next-auth";
import { authOptions } from "@/app/_api/auth";

export default NextAuth(authOptions);
