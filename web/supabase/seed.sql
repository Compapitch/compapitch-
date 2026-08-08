-- Run after migrations: supabase db execute -f supabase/seed.sql
-- (or paste into the SQL editor in the Supabase dashboard).

insert into public.tools
  (slug, name, description, icon_key, category, cost_credits, status, output_type, charge_type, form_schema, checkmarks, icon_bg, icon_color, sort_order)
values
  (
    'smartcomps',
    'SmartComps',
    'Reporte de valuación con comparables reales.',
    'bars-chart',
    'Análisis comparativo',
    8,
    'active',
    'text_report',
    'per_use',
    '[
      {"key":"address","label":"Dirección o link de la propiedad","type":"text","required":true,"placeholder":"Ej. Av. Vallarta 1234, Guadalajara"},
      {"key":"property_type","label":"Tipo de propiedad","type":"select","required":true,"options":["Casa","Departamento","Terreno","Local comercial"]}
    ]'::jsonb,
    '["Comparativas inteligentes","Datos de mercado actualizados","Análisis de competencia","Exporta reportes"]'::jsonb,
    '#DDF3E4', '#2F9E5B', 1
  ),
  (
    'cotizador',
    'Cotizador',
    'Cotización lista para tu cliente en segundos.',
    'document',
    'Cálculos inteligentes',
    5,
    'coming_soon',
    'text_report',
    'per_use',
    '[]'::jsonb,
    '["Cálculos automáticos","Personalizable","Impuestos y comisiones","Descarga en PDF"]'::jsonb,
    '#FDF0D5', '#C98A1F', 2
  ),
  (
    'home-staging',
    'Home Staging',
    'Amuebla fotos de propiedades vacías con IA.',
    'house-base',
    'Diseño con IA',
    6,
    'coming_soon',
    'image',
    'per_use',
    '[]'::jsonb,
    '["Antes y después automático","Múltiples estilos de decoración","Alta resolución","Descarga inmediata"]'::jsonb,
    '#DDF4F1', '#1F9C8A', 3
  ),
  (
    'evaluador-airbnb',
    'Evaluador de Airbnb',
    'Analiza rentabilidad y ROI de una propiedad.',
    'house-check',
    'Análisis de rentabilidad',
    7,
    'coming_soon',
    'text_report',
    'per_use',
    '[]'::jsonb,
    '["Proyección de ingresos","Ocupación estimada","ROI y métricas clave","Análisis de ubicación"]'::jsonb,
    '#EDE3FB', '#7C51C9', 4
  ),
  (
    'crm-sheets',
    'CRM en Sheets',
    'Gestiona tus leads y seguimiento.',
    'grid',
    'Gestión de clientes',
    400,
    'coming_soon',
    'text_report',
    'one_time_unlock',
    '[]'::jsonb,
    '["Pipeline visual","Seguimiento de leads","Recordatorios automáticos","Reportes de ventas"]'::jsonb,
    '#DCE9FB', '#3B6FC4', 5
  ),
  (
    'comparador-tasas',
    'Comparador de Tasas',
    'Compara tasas hipotecarias de los principales bancos en segundos.',
    'house-columns',
    'Financiamiento',
    6,
    'coming_soon',
    'text_report',
    'per_use',
    '[]'::jsonb,
    '["Tasas actualizadas","Comparación por banco","Simulador de pagos","Descarga en PDF"]'::jsonb,
    '#FCE1D6', '#D96B3F', 6
  )
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  icon_key = excluded.icon_key,
  category = excluded.category,
  cost_credits = excluded.cost_credits,
  status = excluded.status,
  output_type = excluded.output_type,
  charge_type = excluded.charge_type,
  form_schema = excluded.form_schema,
  checkmarks = excluded.checkmarks,
  icon_bg = excluded.icon_bg,
  icon_color = excluded.icon_color,
  sort_order = excluded.sort_order;

-- Stripe price IDs (test mode, created manually in the Stripe Dashboard —
-- see scripts/seed-stripe.ts if you ever need to recreate these programmatically,
-- e.g. for live mode).
insert into public.credit_packages (id, name, credits, price_mxn_cents, stripe_price_id, is_featured, sort_order)
values
  ('starter', 'Starter', 100, 19900, 'price_1U2FsLHxlAYflp71h8KK7hFc', false, 1),
  ('popular', 'Popular', 300, 39900, 'price_1U2FsxHxlAYflp71xR0YzGL5', true, 2),
  ('pro', 'Pro', 700, 79900, 'price_1U2FrsHxlAYflp71JpGbexnK', false, 3)
on conflict (id) do update set
  name = excluded.name,
  credits = excluded.credits,
  price_mxn_cents = excluded.price_mxn_cents,
  stripe_price_id = excluded.stripe_price_id,
  is_featured = excluded.is_featured,
  sort_order = excluded.sort_order;
