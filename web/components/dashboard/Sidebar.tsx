"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconBolt,
  IconCoins,
  IconLayoutGrid,
  IconUser,
} from "@/components/ui/icons";
import { SignOutButton } from "./SignOutButton";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: IconLayoutGrid },
  { label: "Herramientas", href: "/dashboard/herramientas", icon: IconBolt },
  { label: "Mi cuenta", href: "/dashboard/mi-cuenta", icon: IconUser },
  { label: "Créditos", href: "/dashboard/creditos", icon: IconCoins },
];

export function Sidebar({ fullName }: { fullName: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-[260px] flex-shrink-0 flex-col border-r border-border bg-surface lg:flex">
      <Link href="/dashboard" className="flex items-center px-7 py-7">
        <Image
          src="/images/logo-compapitch.png"
          alt="compapitch!"
          width={130}
          height={24}
          className="h-6 w-auto"
        />
      </Link>

      <nav className="flex flex-1 flex-col gap-1 px-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-semibold transition-colors ${
                isActive
                  ? "bg-ink text-white"
                  : "text-ink-secondary hover:bg-bg hover:text-ink"
              }`}
            >
              <Icon width={18} height={18} className="flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="mb-2 flex items-center gap-3 px-4 py-2">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent-light text-[12px] font-bold text-accent-hover">
            {initials(fullName)}
          </span>
          <span className="truncate text-[14px] font-semibold text-ink">
            {fullName}
          </span>
        </div>
        <SignOutButton />
      </div>
    </aside>
  );
}

export function MobileTopBar({ fullName }: { fullName: string }) {
  return (
    <header className="flex h-14 flex-shrink-0 items-center justify-between border-b border-border bg-surface px-4 lg:hidden">
      <Link href="/dashboard" className="flex items-center">
        <Image
          src="/images/logo-compapitch.png"
          alt="compapitch!"
          width={110}
          height={20}
          className="h-5 w-auto"
        />
      </Link>
      <Link
        href="/dashboard/mi-cuenta"
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent-light text-[11px] font-bold text-accent-hover"
      >
        {initials(fullName)}
      </Link>
    </header>
  );
}

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden">
      {navItems.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${
              isActive ? "text-ink" : "text-ink-muted"
            }`}
          >
            <Icon width={20} height={20} className="flex-shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
