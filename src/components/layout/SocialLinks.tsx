import { socialList } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/** Icon links to every verified social destination. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={["social-list", className].filter(Boolean).join(" ")} role="list">
      {socialList.map((s) => (
        <li key={s.key}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" title={`${s.label} · ${s.handle}`}>
            <Icon name={s.icon} className="kc-icon--lg" />
            <span className="visually-hidden">
              {s.label} ({s.handle}, opens in a new tab)
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
