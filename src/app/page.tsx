import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-200 dark:from-gray-900 dark:to-black">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold dark:text-white text-emerald-500 drop-shadow-md",
            font.className
          )}
        >
          💵 Smart Spending
        </h1>
        <p className="dark:text-gray-400 text-gray-400 text-lg">
          A smart way to organize your spending!
        </p>
        <div>
          <LoginButton>
            <Button variant="default" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
