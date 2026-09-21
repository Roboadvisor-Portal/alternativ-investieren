import React from "react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection({ faq, title = "Häufige Fragen (FAQ)" }) {
  return (
    <section className="py-4" data-testid="faq-section">
      <h2 className="mb-6 font-heading text-2xl font-bold tracking-tight text-petrol-dark sm:text-3xl">{title}</h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faq.map((f, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            data-testid={`faq-item-${i}`}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white px-5"
          >
            <AccordionTrigger className="py-4 text-left font-heading text-base font-semibold text-petrol-dark hover:no-underline">
              <h3 className="text-base font-semibold">{f.q}</h3>
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-slate-600">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function SectionTitle({ eyebrow, children, className = "" }) {
  return (
    <div className={className}>
      {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-wider text-cta">{eyebrow}</p>}
      <h2 className="font-heading text-2xl font-bold tracking-tight text-petrol-dark sm:text-3xl lg:text-4xl">{children}</h2>
    </div>
  );
}
