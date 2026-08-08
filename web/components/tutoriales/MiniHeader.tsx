import Image from "next/image";
import Link from "next/link";

export function MiniHeader() {
  return (
    <header className="flex items-center justify-center border-b border-border px-6 py-4">
      <Link href="/" className="flex-shrink-0">
        <Image
          src="/images/logo-compapitch.png"
          alt="compapitch!"
          width={120}
          height={22}
          className="h-[22px] w-auto"
          priority
        />
      </Link>
    </header>
  );
}
