import { User as NextAuthUser } from "next-auth";

export interface MyUser extends NextAuthUser {
  id: string;
  email: string;
  name: string;
  type: string;
  accessToken: string;
}
