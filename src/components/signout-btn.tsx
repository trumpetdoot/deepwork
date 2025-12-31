import { endSession } from "@/lib/sessionApi";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase/client";

export default function SignoutButton() {
  const handleSignOut = async () => {
    await endSession();
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) console.error(error);
  };

  return (
    <Button
      onClick={() => {
        handleSignOut();
      }}
    >
      Sign Out
    </Button>
  );
}
