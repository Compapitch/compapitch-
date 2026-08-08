import fs from "fs";
import path from "path";
import { marked } from "marked";

export type Tutorial = {
  slug: string;
  title: string;
  description: string;
  pdfPath: string;
  contentHtml: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "tutoriales");

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const [, frontmatter, body] = match;
  const data: Record<string, string> = {};
  for (const line of frontmatter.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    data[key] = value;
  }
  return { data, body: body.trim() };
}

/**
 * The whole "no code to publish the next one" contract: drop a new
 * <slug>.md file here (frontmatter: title, description, pdf) plus the
 * matching PDF under public/tutoriales/, and it shows up automatically.
 */
export function getAllTutoriales(): Tutorial[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data, body } = parseFrontmatter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        pdfPath: data.pdf ?? "",
        contentHtml: marked.parse(body) as string,
      };
    });
}

export function getTutorial(slug: string): Tutorial | undefined {
  return getAllTutoriales().find((t) => t.slug === slug);
}
