import { auth, signOut } from "@/auth";
import { DoorOpen } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./dark-mode-toggle";
import { Button } from "./ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import Image from "next/image";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export const Header = async () => {
  const session = await auth();

  const heads = headers();

  const pathname = heads.get("next-url");

  if (pathname === "/") return null;

  return (
    <header className="w-full">
      <div className="container flex items-center justify-between h-14 px-4 md:px-6 drop-shadow-sm">
        <div className="flex items-center space-x-4 p-y-2">
          <Link className="flex items-center space-x-2" href="/">
            <Image src={"/favicon.png"} width={36} height={36} alt="logo" />
            <h1 className={cn("text-3xl font-semibold", font.className)}>
              Smart Spending
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          {session && (
            <form
              action={async () => {
                "use server";
                await signOut({
                  redirect: true,
                  redirectTo: "/auth/login",
                });
              }}
            >
              <Button
                type="submit"
                size="icon"
                variant="secondary"
                title="sign out"
              >
                <DoorOpen className="w-4 h-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
};
