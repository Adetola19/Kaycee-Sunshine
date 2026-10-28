import type { Metadata } from "next";
import { socialList } from "@/content/site";
import { isEnquiryType } from "@/lib/enquiry";
import { pageMetadata } from "@/lib/seo";
import { Pending } from "@/components/ui/Pending";
import { Icon } from "@/components/ui/Icon";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Enquiries",
  description:
    "Enquire about leadership coaching, speaking, interpretation, language learning, media or partnerships with Kaycee Sunshine.",
  path: "/contact",
});

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string | string[] }> }) {
  const { type } = await searchParams;
  const initialType = isEnquiryType(type) ? type : undefined;

  return (
    <>
      <PageHero
        eyebrow="Contact & enquiries"
        title={
          <>
            Start a <em>conversation</em>.
          </>
        }
        lede="Choose what your enquiry is about and the form will ask only for what Kaycee needs to reply well."
      />

      <section className="section section--ivory contact" aria-label="Enquiry form">
        <div className="container grid contact__grid">
          <div className="contact__form">
            <EnquiryForm key={initialType ?? "none"} initialType={initialType} />
          </div>
          <aside className="contact__aside stack" aria-labelledby="elsewhere-title">
            <div className="stack stack-sm">
              <h2 id="elsewhere-title" className="t-eyebrow">
                Elsewhere
              </h2>
              <ul className="contact__links" role="list">
                {socialList.map((s) => (
                  <li key={s.key}>
                    <a className="kc-link" href={s.href} target="_blank" rel="noopener noreferrer">
                      <Icon name={s.icon} />
                      {s.label}
                      <span className="visually-hidden"> ({s.handle}, opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="stack stack-sm">
              <h2 className="t-eyebrow">Replies</h2>
              <p className="t-small muted">
                <Pending>typical response time and preferred contact email</Pending>
              </p>
            </div>
            <div className="stack stack-sm">
              <h2 className="t-eyebrow">Your details</h2>
              <p className="t-small muted">
                Only what you enter here is sent, and only to reply to your enquiry. See the privacy policy for more.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
