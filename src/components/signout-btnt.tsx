import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";

export function SignoutButton() {
  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) console.error(error);
  };

  return (
    <Button
      onClick={() => {
        handleSignOut();
      }}
    />
  );
}
