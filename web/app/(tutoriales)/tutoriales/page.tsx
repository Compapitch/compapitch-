import type { Metadata } from "next";
import Link from "next/link";
import { getAllTutoriales } from "@/lib/tutoriales";
import { HubCTA } from "@/components/tutoriales/HubCTA";

export const metadata: Metadata = {
  title: "Tutoriales gratis",
  description: "Guías cortas para vender más, sin necesidad de saber de IA.",
};

export default function TutorialesIndexPage() {
  const tutoriales = getAllTutoriales();

  return (
    <main className="mx-auto max-w-[640px] px-6 py-10">
      <h1 className="mb-2 text-[26px] font-extrabold tracking-tight">
        Tutoriales gratis
      </h1>
      <p className="mb-8 text-[15px] leading-relaxed text-ink-secondary">
        Guías cortas para vender más, sin necesidad de saber de IA.
      </p>

      <div className="mb-14 flex flex-col gap-3">
        {tutoriales.map((t) => (
          <Link
            key={t.slug}
            href={`/t/${t.slug}`}
            className="block rounded-card border border-border bg-surface p-6 transition-colors hover:border-accent"
          >
            <h2 className="mb-1.5 text-[17px] font-bold text-ink">{t.title}</h2>
            <p className="text-[14px] leading-relaxed text-ink-secondary">
              {t.description}
            </p>
          </Link>
        ))}
        {tutoriales.length === 0 && (
          <p className="text-[14px] text-ink-muted">
            Todavía no hay tutoriales publicados.
          </p>
        )}
      </div>

      <HubCTA />
    </main>
  );
}
