import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { FaSignOutAlt } from "react-icons/fa";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-200 dark:from-gray-900 dark:to-black">
      {JSON.stringify(session, null, 2)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit" variant="outline">
          <FaSignOutAlt />
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;
