"use client";

import { useState } from "react";
import { IconChevronDown } from "./icons";

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto flex max-w-[760px] flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.question}
            className="rounded-[24px] border border-border bg-surface px-7 py-6"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 bg-transparent p-0 text-left font-sans"
            >
              <span className="text-[16px] font-bold text-ink">
                {item.question}
              </span>
              <IconChevronDown
                width={18}
                height={18}
                strokeWidth={1.8}
                className={`flex-shrink-0 text-ink-secondary transition-transform duration-brand ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
