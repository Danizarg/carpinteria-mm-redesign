"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ease } from "@/lib/motion";
import { Button, ButtonAnchor } from "@/components/ui/Button";
import { contact, services, site, whatsappHref } from "@/data/site";
import type { ServiceKey } from "@/data/site";

type Data = {
  services: ServiceKey[];
  propertyType: string;
  location: string;
  timeline: string;
  description: string;
  name: string;
  phone: string;
  email: string;
};

const EMPTY: Data = {
  services: [],
  propertyType: "",
  location: "",
  timeline: "",
  description: "",
  name: "",
  phone: "",
  email: "",
};

const PROPERTY_TYPES = ["Vivienda", "Obra nueva", "Reforma", "Local u oficina"];
const TIMELINES = ["Lo antes posible", "En 1–3 meses", "En 3–6 meses", "Aún sin fecha"];

const STEPS = [
  { title: "El trabajo", hint: "Qué necesita" },
  { title: "El proyecto", hint: "Dónde y cuándo" },
  { title: "Sus datos", hint: "Para responderle" },
  { title: "Enviar", hint: "Por WhatsApp o email" },
];

/** Builds the plain-text request the visitor will send themselves. */
function composeMessage(data: Data) {
  const chosen = services
    .filter((s) => data.services.includes(s.key))
    .map((s) => s.title)
    .join(", ");

  return [
    `Solicitud de presupuesto — ${site.name}`,
    "",
    `Especialidades: ${chosen || "Por definir"}`,
    `Tipo de proyecto: ${data.propertyType || "No indicado"}`,
    `Localidad: ${data.location || "No indicada"}`,
    `Plazo: ${data.timeline || "No indicado"}`,
    "",
    "Descripción:",
    data.description || "—",
    "",
    "Datos de contacto:",
    `Nombre: ${data.name}`,
    `Teléfono: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function QuoteFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof Data>(key: K, value: Data[K]) => {
    setData((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const toggleService = (key: ServiceKey) =>
    setData((previous) => ({
      ...previous,
      services: previous.services.includes(key)
        ? previous.services.filter((s) => s !== key)
        : [...previous.services, key],
    }));

  const message = useMemo(() => composeMessage(data), [data]);

  const validate = (index: number) => {
    const next: Partial<Record<keyof Data, string>> = {};
    if (index === 0 && data.services.length === 0) {
      next.services = "Seleccione al menos una especialidad.";
    }
    if (index === 1) {
      if (!data.location.trim()) next.location = "Indíquenos la localidad.";
      if (!data.description.trim() || data.description.trim().length < 12) {
        next.description = "Cuéntenos brevemente qué necesita (mínimo 12 caracteres).";
      }
    }
    if (index === 2) {
      if (!data.name.trim()) next.name = "Necesitamos su nombre.";
      const phone = data.phone.replace(/[\s.-]/g, "");
      if (!phone) next.phone = "Necesitamos un teléfono de contacto.";
      else if (!/^\+?\d{9,15}$/.test(phone)) next.phone = "Revise el número de teléfono.";
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) {
        next.email = "Revise la dirección de email.";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const advance = () => {
    if (!validate(step)) return;
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    `Solicitud de presupuesto — ${data.name || "Nuevo contacto"}`
  )}&body=${encodeURIComponent(message)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="border border-ink/15 bg-ivory text-ink">
      {/* Progress */}
      <div className="border-b border-ink/12 px-[clamp(1.25rem,3vw,2.5rem)] py-5">
        <ol className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {STEPS.map((item, index) => (
            <li key={item.title} className="flex items-center gap-2.5">
              <span
                className={`label tabular-nums ${
                  index === step
                    ? "text-copper"
                    : index < step
                      ? "text-ink/70"
                      : "text-ink/30"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={`label ${
                  index === step ? "text-ink" : index < step ? "text-ink/60" : "text-ink/30"
                }`}
              >
                {item.title}
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-4 h-px w-full bg-ink/12">
          <motion.div
            className="h-full origin-left bg-copper"
            initial={false}
            animate={{ scaleX: (step + 1) / STEPS.length }}
            transition={{ duration: 0.55, ease: ease.outExpo }}
          />
        </div>
      </div>

      <div className="px-[clamp(1.25rem,3vw,2.5rem)] py-[clamp(1.75rem,4vw,3rem)]">
        <p className="sr-only" role="status" aria-live="polite">
          Paso {step + 1} de {STEPS.length}: {STEPS[step].title}
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.38, ease: ease.outExpo }}
          >
            {step === 0 && (
              <fieldset>
                <legend className="font-display text-d4">
                  ¿Qué necesita fabricar?
                </legend>
                <p className="mt-3 text-ink/60">Puede marcar más de una especialidad.</p>

                <div className="mt-7 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2">
                  {services.map((service) => {
                    const checked = data.services.includes(service.key);
                    return (
                      <label
                        key={service.key}
                        className={`flex cursor-pointer items-start gap-4 p-5 transition-colors ${
                          checked ? "bg-ink text-ivory" : "bg-ivory hover:bg-ink/4"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => toggleService(service.key)}
                        />
                        <span
                          aria-hidden
                          className={`mt-1 inline-block h-3 w-3 shrink-0 border transition-colors ${
                            checked ? "border-copper-2 bg-copper-2" : "border-ink/35"
                          }`}
                        />
                        <span>
                          <span className="block font-display text-[1.2rem] leading-tight">
                            {service.title}
                          </span>
                          <span
                            className={`mt-1.5 block text-sm ${
                              checked ? "text-ivory/65" : "text-ink/55"
                            }`}
                          >
                            {service.summary}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                <FieldError id="err-services" message={errors.services} />
              </fieldset>
            )}

            {step === 1 && (
              <div className="space-y-8">
                <h3 className="font-display text-d4">Cuéntenos del proyecto</h3>

                <Choice
                  legend="Tipo de proyecto"
                  options={PROPERTY_TYPES}
                  value={data.propertyType}
                  onChange={(value) => set("propertyType", value)}
                />

                <Field
                  label="Localidad"
                  id="location"
                  required
                  placeholder="Marbella, San Pedro, Estepona…"
                  value={data.location}
                  error={errors.location}
                  onChange={(value) => set("location", value)}
                />

                <Choice
                  legend="¿Para cuándo?"
                  options={TIMELINES}
                  value={data.timeline}
                  onChange={(value) => set("timeline", value)}
                />

                <Field
                  label="Descripción del trabajo"
                  id="description"
                  required
                  textarea
                  placeholder="Medidas aproximadas, madera o acabado que tiene en mente, si hay plano o fotos…"
                  value={data.description}
                  error={errors.description}
                  onChange={(value) => set("description", value)}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <h3 className="font-display text-d4">¿Cómo le localizamos?</h3>
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field
                    label="Nombre"
                    id="name"
                    required
                    autoComplete="name"
                    value={data.name}
                    error={errors.name}
                    onChange={(value) => set("name", value)}
                  />
                  <Field
                    label="Teléfono"
                    id="phone"
                    required
                    type="tel"
                    autoComplete="tel"
                    placeholder="600 000 000"
                    value={data.phone}
                    error={errors.phone}
                    onChange={(value) => set("phone", value)}
                  />
                </div>
                <Field
                  label="Email (opcional)"
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  error={errors.email}
                  onChange={(value) => set("email", value)}
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-display text-d4">Su solicitud está lista</h3>

                {/* Honest about what happens next — this site has no server. */}
                <p className="mt-4 max-w-2xl text-ink/70">
                  Esta web no almacena ni envía formularios por su cuenta. Hemos preparado el
                  texto de su solicitud: elija cómo prefiere enviárnoslo y se abrirá su
                  WhatsApp o su programa de correo con el mensaje ya escrito.
                </p>

                <pre className="mt-7 max-h-72 overflow-auto whitespace-pre-wrap border border-ink/15 bg-ink/4 p-5 font-sans text-sm leading-relaxed text-ink/80">
                  {message}
                </pre>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <ButtonAnchor
                    href={whatsappHref(message)}
                    target="_blank"
                    rel="noreferrer"
                    variant="solid"
                    className="!bg-ink !text-ivory hover:!text-ink"
                  >
                    Enviar por WhatsApp
                  </ButtonAnchor>
                  <ButtonAnchor href={mailtoHref} variant="outline" className="!text-ink">
                    Enviar por email
                  </ButtonAnchor>
                  <Button type="button" variant="ghost" onClick={copy} className="!text-ink">
                    {copied ? "Texto copiado ✓" : "Copiar el texto"}
                  </Button>
                </div>

                <p className="mt-6 text-sm text-ink/55">
                  ¿Prefiere llamarnos? {contact.phones[0].label} · {contact.phones[1].label} —
                  horario de oficina {contact.officeHours.join(" y ")}.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-ink/12 pt-7">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            disabled={step === 0}
            className="label text-ink/55 transition-colors enabled:hover:text-ink disabled:opacity-30"
          >
            ← Atrás
          </button>

          {step < STEPS.length - 1 ? (
            <Button type="button" variant="solid" onClick={advance} className="!bg-ink !text-ivory hover:!text-ink">
              Continuar
            </Button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setData(EMPTY);
                setStep(0);
              }}
              className="label text-ink/55 transition-colors hover:text-ink"
            >
              Empezar de nuevo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── field primitives ──────────────────────────────────────────────────── */

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-3 text-sm text-copper">
      {message}
    </p>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  required = false,
  textarea = false,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  textarea?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    value,
    placeholder,
    autoComplete,
    required,
    "aria-invalid": Boolean(error) || undefined,
    "aria-describedby": error ? errorId : undefined,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(event.target.value),
    className: `mt-2 w-full border-b bg-transparent px-0 py-3 text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-copper ${
      error ? "border-copper" : "border-ink/25"
    }`,
  };

  return (
    <div>
      <label htmlFor={id} className="label text-ink/55">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      {textarea ? (
        <textarea rows={5} {...shared} className={`${shared.className} resize-y`} />
      ) : (
        <input type={type} {...shared} />
      )}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function Choice({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="label text-ink/55">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = value === option;
          return (
            <label
              key={option}
              className={`label cursor-pointer border px-4 py-3 transition-colors ${
                checked
                  ? "border-ink bg-ink text-ivory"
                  : "border-ink/20 text-ink/65 hover:border-ink/45 hover:text-ink"
              }`}
            >
              <input
                type="radio"
                name={legend}
                className="sr-only"
                checked={checked}
                onChange={() => onChange(option)}
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
