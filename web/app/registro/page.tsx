"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { TextField } from "@/components/ui/Field";
import { PillButton } from "@/components/ui/Button";

export default function RegistroPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const supabase = createClient();
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        data: {
          full_name: fullName,
          whatsapp: whatsapp || null,
        },
      },
    });

    if (otpError) {
      setError(
        "No pudimos enviar tu enlace. Revisa tu correo e intenta de nuevo."
      );
      setStatus("error");
      return;
    }

    setStatus("sent");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-8 py-12">
      <div className="w-full max-w-[440px] rounded-card border border-border bg-surface p-12">
        {status === "sent" ? (
          <div className="animate-fade-in text-center">
            <h1 className="mb-2 text-[28px] font-extrabold tracking-tight text-ink">
              Revisa tu correo
            </h1>
            <p className="text-[15px] leading-relaxed text-ink-secondary">
              Te enviamos un enlace mágico a <strong>{email}</strong>. Ábrelo
              desde este dispositivo para entrar a tu dashboard — sin
              contraseña.
            </p>
          </div>
        ) : (
          <>
            <h1 className="mb-2 text-[28px] font-extrabold tracking-tight text-ink">
              Únete gratis
            </h1>
            <p className="mb-8 text-[15px] leading-relaxed text-ink-secondary">
              Crea tu cuenta en menos de un minuto.
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <TextField
                label="Nombre completo"
                placeholder="Tu nombre"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                label="Correo electrónico"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="WhatsApp"
                optional
                type="tel"
                placeholder="+52 33 1234 5678"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />

              {error && (
                <p className="text-[13px] font-semibold text-red-600">
                  {error}
                </p>
              )}

              <PillButton
                type="submit"
                variant="accent"
                className="mt-2 w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Enviando…" : "Únete gratis"}
              </PillButton>
            </form>

            <p className="mt-5 text-center text-[13px] leading-relaxed text-ink-muted">
              Sin tarjeta, sin compromiso — recibe 80 créditos al instante.
            </p>

            <p className="mt-6 text-center text-[14px] text-ink-secondary">
              ¿Ya tienes cuenta?{" "}
              <Link href="/iniciar-sesion" className="font-semibold">
                Iniciar sesión
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
