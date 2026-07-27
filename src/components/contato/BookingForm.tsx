"use client";

import { useState } from "react";

import { ARTISTS } from "@/lib/artists";
import { waLink } from "@/lib/site";

const NO_PREFERENCE = "Ainda não sei — me indiquem";

const ERROR_MESSAGE = "Preenche nome, WhatsApp e a ideia da tattoo pra gente começar 🙂";

const LABEL =
  "font-mono text-ash mb-2 block text-[10px] leading-none font-bold tracking-[.12em] uppercase";

// O protótipo usava #5a5a60 no placeholder, que rende só 2.63:1 sobre #16161A.
// #82828A chega a 4.73:1 e mantém a hierarquia visual em relação ao texto digitado.
const FIELD =
  "bg-field text-bone w-full rounded-xl border border-white/12 px-[14px] py-[13px] text-[15px] transition-[border-color,box-shadow] duration-200 placeholder:text-[#82828A] focus:border-brand focus:shadow-[0_0_0_3px_rgba(255,92,0,.16)] focus-visible:outline-none";

type FormState = {
  name: string;
  phone: string;
  artist: string;
  idea: string;
  region: string;
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  artist: NO_PREFERENCE,
  idea: "",
  region: "",
};

/** Formulário de agendamento: valida no cliente e entrega a conversa pronta no WhatsApp. */
export function BookingForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(key: K) {
    return (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const { value } = event.target;
      setForm((prev) => ({ ...prev, [key]: value }));
    };
  }

  // TODO: hoje o envio abre o WhatsApp; trocar por uma Server Action + e-mail quando o estúdio tiver endpoint.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.idea.trim()) {
      setError(ERROR_MESSAGE);
      return;
    }

    setError("");

    const message = [
      "Olá! Vim pelo site da Dattebayo 🧡",
      "",
      `Nome: ${form.name}`,
      `WhatsApp: ${form.phone}`,
      `Artista: ${form.artist}`,
      `Ideia/estilo: ${form.idea}`,
      form.region ? `Região do corpo: ${form.region}` : "",
    ].join("\n");

    window.open(waLink(message), "_blank", "noopener,noreferrer");
  }

  // Só marca os campos depois de uma tentativa de envio — nada de vermelho num formulário intocado.
  const invalid = {
    name: error !== "" && !form.name.trim(),
    phone: error !== "" && !form.phone.trim(),
    idea: error !== "" && !form.idea.trim(),
  };
  const describedBy = error ? "form-erro" : undefined;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-white/9 bg-panel flex w-full flex-col gap-4 rounded-[18px] border p-[clamp(22px,3vw,32px)]"
    >
      <div>
        <label htmlFor="f-nome" className={LABEL}>
          Nome *
        </label>
        <input
          id="f-nome"
          name="nome"
          value={form.name}
          onChange={update("name")}
          autoComplete="name"
          placeholder="Como te chamamos?"
          required
          aria-invalid={invalid.name}
          aria-describedby={describedBy}
          className={FIELD}
        />
      </div>

      <div>
        <label htmlFor="f-wpp" className={LABEL}>
          WhatsApp / telefone *
        </label>
        <input
          id="f-wpp"
          name="whatsapp"
          value={form.phone}
          onChange={update("phone")}
          autoComplete="tel"
          inputMode="tel"
          placeholder="(11) 9 0000-0000"
          required
          aria-invalid={invalid.phone}
          aria-describedby={describedBy}
          className={FIELD}
        />
      </div>

      <div>
        <label htmlFor="f-art" className={LABEL}>
          Artista de preferência
        </label>
        <select
          id="f-art"
          name="artista"
          value={form.artist}
          onChange={update("artist")}
          className={`${FIELD} cursor-pointer`}
        >
          <option value={NO_PREFERENCE}>{NO_PREFERENCE}</option>
          {ARTISTS.map((artist) => (
            <option key={artist.slug} value={artist.name}>
              {artist.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="f-idea" className={LABEL}>
          Sua ideia / estilo da tattoo *
        </label>
        <textarea
          id="f-idea"
          name="ideia"
          value={form.idea}
          onChange={update("idea")}
          rows={4}
          placeholder="Ex.: Gojo do Jujutsu Kaisen, colorido, antebraço…"
          required
          aria-invalid={invalid.idea}
          aria-describedby={describedBy}
          className={`${FIELD} min-h-24 resize-y leading-[1.5]`}
        />
      </div>

      <div>
        <label htmlFor="f-reg" className={LABEL}>
          Região do corpo
        </label>
        <input
          id="f-reg"
          name="regiao"
          value={form.region}
          onChange={update("region")}
          placeholder="Ex.: antebraço, panturrilha…"
          className={FIELD}
        />
      </div>

      <div className="text-dim flex items-center gap-[7px] text-[12.5px]">
        <span aria-hidden="true">📎</span> Tem referências? Manda direto no WhatsApp — é mais rápido
        pra enviar imagens.
      </div>

      {/* `empty:sr-only` tira o vão do flex quando não há erro sem sumir com a região viva. */}
      <div id="form-erro" aria-live="polite" className="text-alert text-[13px] empty:sr-only">
        {error}
      </div>

      <button
        type="submit"
        className="bg-brand-gradient text-ink font-display mt-0.5 cursor-pointer rounded-xl border-0 p-4 text-base font-bold shadow-[0_12px_30px_-8px_rgba(255,92,0,.6)] transition-transform hover:-translate-y-px"
      >
        Enviar pelo WhatsApp →
      </button>
    </form>
  );
}
