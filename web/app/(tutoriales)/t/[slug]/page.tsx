import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTutoriales, getTutorial } from "@/lib/tutoriales";
import { HubCTA } from "@/components/tutoriales/HubCTA";
import { IconDownload } from "@/components/ui/icons";

export async function generateStaticParams() {
  return getAllTutoriales().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) return {};

  return {
    title: tutorial.title,
    description: tutorial.description,
    openGraph: {
      title: tutorial.title,
      description: tutorial.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: tutorial.title,
      description: tutorial.description,
    },
  };
}

const PROSE_CLASSES =
  "[&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-[19px] [&_h2]:font-bold [&_h2]:text-ink [&_h2]:first:mt-0 " +
  "[&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-[17px] [&_h3]:font-bold [&_h3]:text-ink " +
  "[&_p]:mb-4 [&_p]:leading-relaxed " +
  "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 " +
  "[&_li]:mb-2 [&_li]:leading-relaxed " +
  "[&_strong]:font-bold [&_strong]:text-ink " +
  "[&_a]:font-semibold [&_a]:text-accent " +
  "[&_img]:my-6 [&_img]:w-full [&_img]:rounded-image";

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) notFound();

  return (
    <main className="mx-auto max-w-[640px] px-6 py-10">
      <h1 className="mb-6 text-[26px] font-extrabold leading-tight tracking-tight">
        {tutorial.title}
      </h1>

      <div
        className={`mb-8 text-[16px] text-ink-secondary ${PROSE_CLASSES}`}
        dangerouslySetInnerHTML={{ __html: tutorial.contentHtml }}
      />

      {tutorial.pdfPath && (
        <a
          href={tutorial.pdfPath}
          download
          className="mb-16 inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-6 py-3 text-[14px] font-bold text-ink hover:bg-bg"
        >
          <IconDownload width={16} height={16} />
          Descargar PDF
        </a>
      )}

      <HubCTA />
    </main>
  );
}
