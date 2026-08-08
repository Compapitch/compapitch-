import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { IconArrowRight } from "./icons";

type Variant = "accent" | "dark" | "light" | "disabled";
type Size = "md" | "sm";

const variantClasses: Record<Variant, string> = {
  accent:
    "bg-accent text-white hover:bg-accent-hover",
  dark: "bg-ink text-white hover:bg-ink/90",
  light: "bg-white text-ink hover:bg-accent-light",
  disabled: "bg-border text-ink-muted cursor-not-allowed",
};

const sizeClasses: Record<Size, string> = {
  md: "text-[16px] font-bold px-8 py-4",
  sm: "text-[14px] font-bold px-5 py-3",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps & {
  href: string;
  type?: undefined;
};

export function PillButton(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "dark",
    size = "md",
    icon = false,
    className = "",
    children,
    ...rest
  } = props;

  const classes = `inline-flex items-center justify-center gap-2 rounded-pill font-sans transition-colors duration-brand ease-out disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href } = props;
    return (
      <Link href={href} className={classes}>
        {children}
        {icon && <IconArrowRight width={size === "sm" ? 14 : 16} height={size === "sm" ? 14 : 16} strokeWidth={2} />}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonRest}>
      {children}
      {icon && <IconArrowRight width={size === "sm" ? 14 : 16} height={size === "sm" ? 14 : 16} strokeWidth={2} />}
    </button>
  );
}
