import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { IconChevronDown } from "./icons";

function Label({
  children,
  optional,
}: {
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label className="mb-2 block text-[13px] font-semibold text-ink">
      {children}
      {optional && (
        <span className="font-normal text-ink-muted"> (opcional)</span>
      )}
    </label>
  );
}

const fieldClasses =
  "w-full rounded-input border border-border bg-bg px-[18px] py-[14px] font-sans text-[15px] text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/40";

export function TextField({
  label,
  optional,
  ...props
}: { label: string; optional?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label optional={optional}>{label}</Label>
      <input className={fieldClasses} {...props} />
    </div>
  );
}

export function TextAreaField({
  label,
  optional,
  ...props
}: {
  label: string;
  optional?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <Label optional={optional}>{label}</Label>
      <textarea className={`${fieldClasses} resize-y`} {...props} />
    </div>
  );
}

export function SelectField({
  label,
  optional,
  options,
  ...props
}: {
  label: string;
  optional?: boolean;
  options: { value: string; label: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <Label optional={optional}>{label}</Label>
      <div className="relative">
        <select
          className={`${fieldClasses} appearance-none pr-11`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <IconChevronDown
          width={16}
          height={16}
          className="pointer-events-none absolute right-[18px] top-1/2 -translate-y-1/2 text-ink-secondary"
        />
      </div>
    </div>
  );
}
