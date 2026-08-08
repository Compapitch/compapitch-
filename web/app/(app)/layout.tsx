import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Sidebar,
  MobileTopBar,
  MobileTabBar,
} from "@/components/dashboard/Sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/iniciar-sesion");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .single();

  const fullName = profile?.full_name || profile?.email || user.email || "Broker";

  return (
    <div className="flex min-h-screen bg-bg text-ink">
      <Sidebar fullName={fullName} />
      <div className="flex min-h-screen flex-1 flex-col">
        <MobileTopBar fullName={fullName} />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          {children}
        </main>
        <MobileTabBar />
      </div>
    </div>
  );
}
