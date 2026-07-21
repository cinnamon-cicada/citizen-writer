import PencilDivider from "./PencilDivider";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-2xl px-6 pt-4 pb-16">
      <PencilDivider className="mb-6" />
      <div className="flex flex-col gap-1 text-sm text-charcoal-soft sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} Citizen Writer. Written by hand, mostly.
        </p>
        <a href="/feed.xml" className="hand-underline">
          RSS
        </a>
      </div>
    </footer>
  );
}
