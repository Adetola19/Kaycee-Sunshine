import type { Metadata } from "next";
import { portraits } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";

export const metadata: Metadata = pageMetadata({
  title: "International Interpretation",
  description:
    "Professional interpretation with Kaycee Sunshine, offered as a distinct service. Share your languages, setting and date to request interpretation.",
  path: "/interpretation",
});

const details: { label: string; pending: string }[] = [
  { label: "Language combinations", pending: "language combinations, including direction (into / from)" },
  { label: "Modes", pending: "interpretation modes offered, e.g. simultaneous, consecutive or remote" },
  { label: "Specialisations", pending: "subject areas and sectors" },
  { label: "Settings", pending: "typical settings, e.g. conferences, meetings, delegations" },
  { label: "Qualifications", pending: "interpreting qualifications and professional memberships" },
  { label: "Availability", pending: "regions served, travel and lead times" },
];

const steps = [
  { title: "Share the essentials", text: "The languages required, the date, the setting and the subject matter." },
  { title: "Name the mode, if you know it", text: "If you are unsure which mode suits your setting, say so — that is part of the conversation." },
  { title: "Kaycee replies", text: "You will hear back about availability and the details of the assignment." },
];

export default function InterpretationPage() {
  return (
    <>
      <PageHero
        tone="charcoal"
        eyebrow="International Interpretation"
        title={
          <>
            Meaning, carried <em>faithfully</em>.
          </>
        }
        lede="Professional interpretation, offered as a distinct service with its own enquiry route — so that people can understand one another across languages."
        actions={
          <ButtonLink href="/contact?type=interpretation" variant="primary" arrow>
            Request interpretation
          </ButtonLink>
        }
        visual={portraits.interpretation}
      />

      <section className="section section--ivory" aria-labelledby="service-title">
        <div className="container">
          <SectionHeader
            id="service-title"
            eyebrow="The service"
            title="Interpretation details"
            lede="The specifics below are being confirmed. Until then, describe what you need and Kaycee will tell you what is possible."
          />
          <dl className="facts facts--grid">
            {details.map((d, i) => (
              <Reveal key={d.label} index={i}>
                <dt className="t-eyebrow">{d.label}</dt>
                <dd>
                  <Pending>{d.pending}</Pending>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--sage-wash" aria-labelledby="request-title">
        <div className="container grid split-head">
          <div className="split-head__label">
            <SectionHeader id="request-title" eyebrow="Requesting interpretation" title="How to request" size="h2" />
          </div>
          <Reveal index={1} className="split-head__body stack stack-lg">
            <ol className="num-list" role="list">
              {steps.map((s) => (
                <li key={s.title}>
                  <div>
                    <h3 className="t-h3">{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ButtonLink href="/contact?type=interpretation" variant="primary" arrow>
              Request interpretation
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <ClosingInvitation
        eyebrow="Interpretation enquiries"
        title={
          <>
            Be <em>understood</em>, in every room.
          </>
        }
        lede="Tell Kaycee the languages, setting and date you have in mind."
        cta={{ label: "Request interpretation", href: "/contact?type=interpretation" }}
      />
    </>
  );
}
