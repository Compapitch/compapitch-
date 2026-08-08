import { IconUpload } from "./icons";

/**
 * Stand-in for a real photo. The Claude Design prototype used an
 * `<image-slot>` component (design-tool-only, not available in production);
 * drop the real file at the given `src` path once available and this
 * component becomes a plain `<img>`.
 */
export function PhotoPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(135deg,#E8EAEC_0px,#E8EAEC_1px,#F4F5F6_1px,#F4F5F6_14px)] p-6 text-center ${className}`}
    >
      <IconUpload width={22} height={22} className="text-ink-muted" />
      <span className="max-w-[220px] text-[13px] font-semibold leading-snug text-ink-muted">
        {label}
      </span>
    </div>
  );
}
