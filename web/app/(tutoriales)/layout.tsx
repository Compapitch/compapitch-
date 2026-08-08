import { MiniHeader } from "@/components/tutoriales/MiniHeader";

export default function TutorialesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <MiniHeader />
      {children}
    </div>
  );
}
