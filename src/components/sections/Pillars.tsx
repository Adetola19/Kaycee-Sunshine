import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The three professional pillars as one stacked set (space-1 between),
 * so the homepage never shows unrelated dark bands back to back.
 * design/components/PillarPanel.md
 */
export function PillarStack() {
  return (
    <div className="pillar-stack">
      <section className="kc-pillar kc-pillar--leadership on-ground" aria-labelledby="pillar-1">
        <div className="kc-pillar__inner">
          <Reveal>
            <span className="kc-num" aria-hidden="true">
              01
            </span>
            <p className="t-eyebrow">Pillar one</p>
            <h3 id="pillar-1" className="t-h2">
              Leadership &amp; Coaching
            </h3>
            <hr className="rule-champagne" />
          </Reveal>
          <Reveal index={1} className="kc-pillar__copy">
            <p>
              Developing leaders who know themselves, decide with clarity and carry responsibility well — through
              coaching, leadership education and honest conversation.
            </p>
            <ButtonLink href="/coaching" variant="primary" arrow>
              Explore coaching
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="kc-pillar kc-pillar--voice on-ground" aria-labelledby="pillar-2">
        <div className="kc-pillar__inner">
          <Reveal>
            <span className="kc-num" aria-hidden="true">
              02
            </span>
            <p className="t-eyebrow">Pillar two</p>
            <h3 id="pillar-2" className="t-h2">
              Speaking &amp; Interpretation
            </h3>
          </Reveal>
          <Reveal index={1} className="kc-split">
            <div>
              <h4>Speaking</h4>
              <p>Keynotes, conferences, workshops and leadership sessions for organisations and events.</p>
              <ButtonLink href="/speaking">Invite Kaycee to speak</ButtonLink>
            </div>
            <div>
              <h4>Interpretation</h4>
              <p>
                Interpretation as a distinct professional service. <Pending>language combinations and modes</Pending>
              </p>
              <ButtonLink href="/interpretation">Request interpretation</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="kc-pillar kc-pillar--language on-ground" aria-labelledby="pillar-3">
        <div className="kc-pillar__inner">
          <Reveal>
            <span className="kc-num" aria-hidden="true">
              03
            </span>
            <p className="t-eyebrow">Pillar three · Speak French Fast</p>
            <h3 id="pillar-3" className="t-h2">
              Language Education
            </h3>
            <hr className="rule-champagne" />
          </Reveal>
          <Reveal index={1} className="kc-pillar__copy">
            <p>Language as a leadership skill — learning to be understood, and to understand, across borders.</p>
            <ButtonLink href="/language" variant="primary" arrow>
              Explore language education
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
