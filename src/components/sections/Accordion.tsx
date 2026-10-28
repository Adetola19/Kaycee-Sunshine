"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type AccordionItem = { title: string; content: React.ReactNode };

/** Disclosure list; panels open over duration-base with ease-in-out. */
export function Accordion({ items, headingLevel = 3 }: { items: AccordionItem[]; headingLevel?: 2 | 3 }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        const triggerId = `${base}-t${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div className="accordion__item" key={item.title}>
            <Heading className="t-h3" style={{ margin: 0 }}>
              <button
                id={triggerId}
                type="button"
                className="accordion__trigger t-h3"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.title}
                <Icon name="plus" />
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={triggerId} className={isOpen ? "accordion__panel is-open" : "accordion__panel"}>
              <div>
                <div className="accordion__body">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
