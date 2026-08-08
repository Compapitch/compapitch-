import { PillButton } from "@/components/ui/Button";

export function HubCTA() {
  return (
    <div className="rounded-card border border-border bg-surface p-8 text-center">
      <h3 className="mb-2 text-[19px] font-extrabold tracking-tight">
        Todas mis herramientas, gratis para empezar
      </h3>
      <p className="mb-6 text-[14px] text-ink-secondary">
        Créditos de bienvenida al registrarte.
      </p>
      <PillButton href="/registro" variant="accent" size="sm">
        Entrar al hub
      </PillButton>
    </div>
  );
}
