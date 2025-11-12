// types/next-auth.d.ts
import  { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** Add custom properties here */
      profileImage?: string | null;
    } & DefaultSession["user"];
  }
}
