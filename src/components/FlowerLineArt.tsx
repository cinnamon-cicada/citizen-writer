const PETAL_PATHS = [
  "M100,95 Q114,75 100,57 Q86,75 100,95",
  "M100,95 Q124,97 133,76 Q110,73 100,95",
  "M100,95 Q110,117 133,114 Q124,93 100,95",
  "M100,95 Q86,115 100,133 Q114,115 100,95",
  "M100,95 Q76,93 67,114 Q90,117 100,95",
  "M100,95 Q90,73 67,76 Q76,97 100,95",
];

export default function FlowerLineArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`flower-line-art text-charcoal-soft ${className}`}
      role="img"
      aria-label="Line-art drawing of a flower"
    >
      <path
        className="flower-path"
        d="M100,190 C97,160 103,135 100,101"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ animationDelay: "0s", animationDuration: "0.9s" }}
      />
      <path
        className="flower-path"
        d="M100,168 Q75,168 65,145 Q85,155 100,168"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animationDelay: "0.5s", animationDuration: "0.6s" }}
      />
      <path
        className="flower-path"
        d="M100,148 Q125,150 138,128 Q118,138 100,148"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animationDelay: "0.75s", animationDuration: "0.6s" }}
      />
      {PETAL_PATHS.map((d, i) => (
        <path
          key={d}
          className="flower-path text-sepia"
          d={d}
          pathLength={1}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animationDelay: `${1.2 + i * 0.22}s`, animationDuration: "0.5s" }}
        />
      ))}
      <circle
        className="flower-path text-sepia"
        cx="100"
        cy="95"
        r="6"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.6"
        style={{ animationDelay: `${1.2 + PETAL_PATHS.length * 0.22 + 0.1}s`, animationDuration: "0.4s" }}
      />
    </svg>
  );
}
