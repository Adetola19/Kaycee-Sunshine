import type { Social } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

/** Editorial list of social destinations with handle and purpose. */
export function SocialChannels({ channels }: { channels: Social[] }) {
  return (
    <ul className="channels" role="list">
      {channels.map((c, i) => (
        <Reveal as="li" key={c.key} index={i}>
          <a className="channel" href={c.href} target="_blank" rel="noopener noreferrer">
            <Icon name={c.icon} className="kc-icon--lg channel__icon" />
            <span className="channel__text">
              <span className="t-h3 channel__label">{c.label}</span>
              <span className="t-meta">
                {c.handle} · {c.summary}
              </span>
            </span>
            <Icon name="arrow-up-right" className="kc-icon--lg channel__go" />
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </Reveal>
      ))}
    </ul>
  );
}
