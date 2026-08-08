# El Compapitch Tools

Hub de herramientas de IA para brokers inmobiliarios. Next.js 14 + Supabase + Stripe, desplegado en Netlify.

## Setup (primera vez)

### 1. Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Corre las migraciones, en orden, desde el SQL Editor del dashboard (o con la CLI de Supabase: `supabase db push` apuntando a `supabase/migrations/`):
   - `0001_extensions.sql`
   - `0002_tables.sql`
   - `0003_functions.sql`
   - `0004_policies.sql`
   - `0005_storage.sql`
3. Corre `supabase/seed.sql` para cargar el catálogo de herramientas y los paquetes de créditos.
4. En **Authentication → Providers → Email**, deja el magic link habilitado y desactiva "Confirm email" si quieres el flujo más directo (el registro ya no depende de eso — los 80 créditos se otorgan en cuanto se crea la fila en `auth.users`, antes de que hagan clic en el enlace).
5. Copia `Project URL`, `anon public key` y `service_role key` desde **Project Settings → API** a tu `.env.local`.

### 2. Anthropic

Crea una API key en [console.anthropic.com](https://console.anthropic.com) y ponla en `ANTHROPIC_API_KEY`. Es lo único que usa SmartComps (con la tool de búsqueda web integrada de la API — no se llama a ningún servicio externo aparte).

### 3. Stripe

1. Crea una cuenta de Stripe (o usa una existente) y activa el modo de prueba.
2. Copia la `Secret key` de modo prueba a `STRIPE_SECRET_KEY`.
3. Corre `npm run seed:stripe` — crea los 3 productos/precios de los paquetes de créditos en modo prueba y guarda sus `price_id` en `credit_packages`.
4. Para probar el webhook en local: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`, copia el `whsec_...` que imprime a `STRIPE_WEBHOOK_SECRET`.
5. Apple Pay se habilita solo dentro de Stripe Checkout (no requiere verificación de dominio manual) — aparece automáticamente en dispositivos compatibles.
6. En producción: agrega el endpoint `/api/webhooks/stripe` en el Dashboard de Stripe (Developers → Webhooks) suscrito a `checkout.session.completed`, y usa ese `whsec_...`.

### 4. Variables de entorno

Copia `.env.example` a `.env.local` y llena todo.

### 5. Correr en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Pendientes que no puedo resolver por ti

- **Fotos reales de Rodrigo.** Todos los `<image-slot>` del diseño original se reemplazaron por un placeholder gris (`components/ui/PhotoPlaceholder.tsx`). Reemplázalos por `<Image>` de Next.js apuntando a archivos reales en `public/images/` cuando los tengas.
- **WhatsApp real de contacto.** Contacto, Servicios → Solicitar, y el footer usan `+52 33 1234 5678` (el mismo placeholder que ya traía el diseño) — cámbialo por tu número real en `app/(marketing)/contacto/page.tsx` y `app/(marketing)/servicios/solicitar/SolicitarServicioForm.tsx`.
- **Cuentas de Supabase/Stripe/Anthropic reales** — ver arriba.
- **Herramientas nuevas** (Cotizador, Home Staging, Evaluador de Airbnb, CRM en Sheets, Comparador de Tasas): agrega una fila en `tools` con su `form_schema`, cambia `status` a `active`, y escribe un adapter en `lib/tools/adapters/` registrado en `lib/tools/registry.ts` — el resto del sistema (cobro, reembolso, marca del broker, catálogo, dashboard) ya las soporta sin cambios.

## Estructura

```
app/
  (marketing)/          landing pública, herramientas, servicios, nosotros, contacto
  registro/, iniciar-sesion/, auth/callback/   auth por magic link
  (app)/dashboard/       área autenticada: dashboard, herramienta/[slug], mi-cuenta, creditos
  api/tools/[slug]/run   cobra créditos, corre el adapter, reembolsa si falla
  api/checkout/, api/webhooks/stripe/   Stripe Checkout + webhook
components/
lib/
  supabase/              clientes (browser, server, service-role, middleware)
  tools/                 registry.ts (slug → adapter) + adapters/
supabase/
  migrations/            schema, RLS, funciones SECURITY DEFINER
  seed.sql                catálogo de herramientas + paquetes de créditos
scripts/seed-stripe.ts    crea productos/precios de Stripe en modo prueba
```
