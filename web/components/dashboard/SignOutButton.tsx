"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { IconLogout } from "@/components/ui/icons";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-semibold text-ink-secondary transition-colors hover:bg-bg hover:text-ink"
    >
      <IconLogout width={18} height={18} className="flex-shrink-0" />
      Cerrar sesión
    </button>
  );
}
