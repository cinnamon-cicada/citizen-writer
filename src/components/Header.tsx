import Link from "next/link";
import PencilDivider from "./PencilDivider";

const NAV_LINKS = [
  { href: "/essays", label: "Essays" },
  { href: "/about", label: "About" },
  { href: "/subscribe", label: "Subscribe" },
];

export default function Header() {
  return (
    <header className="mx-auto max-w-2xl px-6 pt-12 pb-4">
      <div className="flex items-baseline justify-between gap-4">
        <Link href="/" className="hand-underline">
          <span className="font-hand text-3xl tracking-wide text-charcoal sm:text-4xl">
            Citizen Writer
          </span>
        </Link>
        <nav className="flex gap-5 text-sm tracking-wide text-charcoal-soft">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hand-underline">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <PencilDivider className="mt-6" />
    </header>
  );
}
