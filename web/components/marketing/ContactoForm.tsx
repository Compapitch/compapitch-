"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { TextField, TextAreaField, SelectField } from "@/components/ui/Field";
import { PillButton } from "@/components/ui/Button";

const BASE_TOPICS = [
  "Dudas sobre herramientas",
  "Servicios personalizados",
  "Créditos y pagos",
  "Otro",
];

export function ContactoForm() {
  const searchParams = useSearchParams();
  const topicFromUrl = searchParams.get("topic");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState(topicFromUrl || BASE_TOPICS[0]);
  const [message, setMessage] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );

  useEffect(() => {
    if (topicFromUrl) setTopic(topicFromUrl);
  }, [topicFromUrl]);

  const topicOptions = topicFromUrl && !BASE_TOPICS.includes(topicFromUrl)
    ? [topicFromUrl, ...BASE_TOPICS]
    : BASE_TOPICS;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      company: company || null,
      phone: phone || null,
      topic,
      message,
    });

    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return (
      <div className="animate-fade-in rounded-card border border-border bg-surface p-10 text-center">
        <h3 className="mb-2 text-[20px] font-extrabold">Mensaje enviado</h3>
        <p className="text-[15px] leading-relaxed text-ink-secondary">
          Gracias, {name.split(" ")[0] || "que tengas buen día"} — te
          respondemos en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-border bg-surface p-10">
      <h3 className="mb-6 text-[20px] font-bold">Envíanos un mensaje</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Nombre"
            placeholder="Tu nombre"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Correo"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Empresa"
            optional
            placeholder="Nombre de tu agencia"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <TextField
            label="Teléfono"
            optional
            type="tel"
            placeholder="+52 33 1234 5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <SelectField
          label="¿En qué podemos ayudarte?"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          options={topicOptions.map((t) => ({ value: t, label: t }))}
        />
        <TextAreaField
          label="Mensaje"
          placeholder="Cuéntanos qué necesitas"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <label className="flex cursor-pointer items-start gap-2.5">
          <input
            type="checkbox"
            required
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-0.5 flex-shrink-0"
          />
          <span className="text-[13px] leading-relaxed text-ink-secondary">
            Acepto el <a href="#" className="font-semibold">aviso de privacidad</a>{" "}
            de El Compapitch.
          </span>
        </label>

        {status === "error" && (
          <p className="text-[13px] font-semibold text-red-600">
            Algo salió mal. Intenta de nuevo.
          </p>
        )}

        <PillButton
          type="submit"
          variant="accent"
          className="mt-2"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Enviando…" : "Enviar mensaje"}
        </PillButton>
      </form>
    </div>
  );
}
