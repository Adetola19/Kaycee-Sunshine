import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Pending } from "@/components/ui/Pending";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How this website handles the personal information you share through the enquiry form.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy policy"
        lede="This website collects as little personal information as possible. This page explains what is collected and why."
      >
        <Pending block>legal review of this policy, and the date it takes effect</Pending>
      </PageHero>

      <section className="section section--ivory">
        <div className="container">
          <div className="prose legal">
            <h2 className="t-h2">Who is responsible</h2>
            <p>
              <Pending>name and contact details of the data controller for this website</Pending>
            </p>

            <h2 className="t-h2">What is collected</h2>
            <p>
              When you send an enquiry, the form collects your name, email address and the details you choose to give
              about your enquiry — for example an organisation, event date or language level. Nothing else is
              collected through the form.
            </p>
            <p>The site does not ask for payment details, and does not create accounts.</p>

            <h2 className="t-h2">Why it is collected</h2>
            <p>Your details are used only to reply to your enquiry and to arrange any work that follows from it.</p>
            <p>
              <Pending>legal basis for processing (for example, legitimate interests or steps prior to a contract)</Pending>
            </p>

            <h2 className="t-h2">Where it goes</h2>
            <p>
              Enquiries are delivered to Kaycee through an enquiry-handling service.{" "}
              <Pending>name of the service or provider that receives enquiries, and where data is stored</Pending>
            </p>

            <h2 className="t-h2">How long it is kept</h2>
            <p>
              <Pending>retention period for enquiries</Pending>
            </p>

            <h2 className="t-h2">Cookies and embedded content</h2>
            <p>
              This site does not set advertising or analytics cookies. Fonts are served from this site rather than from
              a third party.
            </p>
            <p>
              Videos are hosted on YouTube. A video player is only loaded when you choose to play a video, using
              YouTube&rsquo;s privacy-enhanced mode (youtube-nocookie.com). Once loaded, YouTube&rsquo;s own privacy
              policy applies.
            </p>
            <p>
              Links to LinkedIn, YouTube and Instagram take you to those services, which have their own privacy
              policies.
            </p>

            <h2 className="t-h2">Your rights</h2>
            <p>
              Depending on where you live, you may have the right to access, correct or delete the personal information
              held about you, or to object to how it is used.{" "}
              <Pending>how to make a request, and the relevant supervisory authority</Pending>
            </p>

            <p>
              <Link className="kc-link kc-link-static" href="/contact">
                Contact Kaycee
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
