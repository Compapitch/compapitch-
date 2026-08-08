"use client";

import Link from "next/link";
import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TextField } from "@/components/ui/Field";
import { PillButton } from "@/components/ui/Button";

function safeNext(value: string | null): string {
  if (!value) return "/dashboard";
  // Only allow same-app relative paths — blocks "//evil.com" and
  // absolute URLs from ever reaching emailRedirectTo / the redirect.
  if (!/^\/(?!\/)/.test(value)) return "/dashboard";
  return value;
}

function IniciarSesionForm() {
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
          next
        )}`,
      },
    });

    setStatus(error ? "error" : "sent");
  }

  return (
    <div className="w-full max-w-[440px] rounded-card border border-border bg-surface p-12">
      {status === "sent" ? (
        <div className="animate-fade-in text-center">
          <h1 className="mb-2 text-[28px] font-extrabold tracking-tight text-ink">
            Revisa tu correo
          </h1>
          <p className="text-[15px] leading-relaxed text-ink-secondary">
            Te enviamos un enlace mágico a <strong>{email}</strong>. Ábrelo
            desde este dispositivo para entrar.
          </p>
        </div>
      ) : (
        <>
          <h1 className="mb-2 text-[28px] font-extrabold tracking-tight text-ink">
            Iniciar sesión
          </h1>
          <p className="mb-8 text-[15px] leading-relaxed text-ink-secondary">
            Te mandamos un enlace mágico, sin contraseña.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField
              label="Correo electrónico"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {status === "error" && (
              <p className="text-[13px] font-semibold text-red-600">
                No pudimos enviar tu enlace. Intenta de nuevo.
              </p>
            )}

            <PillButton
              type="submit"
              variant="accent"
              className="mt-2 w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Enviando…" : "Enviar enlace mágico"}
            </PillButton>
          </form>

          <p className="mt-6 text-center text-[14px] text-ink-secondary">
            ¿Aún no tienes cuenta?{" "}
            <Link href="/registro" className="font-semibold">
              Únete gratis
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

export default function IniciarSesionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-8 py-12">
      <Suspense fallback={null}>
        <IniciarSesionForm />
      </Suspense>
    </div>
  );
}
