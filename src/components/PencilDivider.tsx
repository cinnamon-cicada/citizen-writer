export default function PencilDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 12"
      preserveAspectRatio="none"
      className={`h-3 w-full text-charcoal-soft ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 6.5C40 2 70 10 110 6.5S180 1 220 6.5s70 6 110 0 50-4.5 68-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
