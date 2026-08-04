function petalPath(
  originX: number,
  originY: number,
  angleDeg: number,
  tipRadius: number,
  bellyRadius: number,
  bellyWidth: number,
  tipWidth = 0
): string {
  const rad = (angleDeg * Math.PI) / 180;
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);
  const px = -dy;
  const py = dx;
  const aX = originX + bellyRadius * dx + bellyWidth * px;
  const aY = originY + bellyRadius * dy + bellyWidth * py;
  const bX = originX + bellyRadius * dx - bellyWidth * px;
  const bY = originY + bellyRadius * dy - bellyWidth * py;
  const p = (n: number) => n.toFixed(1);

  if (tipWidth === 0) {
    const tipX = originX + tipRadius * dx;
    const tipY = originY + tipRadius * dy;
    return `M${originX},${originY} Q${p(aX)},${p(aY)} ${p(tipX)},${p(tipY)} Q${p(bX)},${p(bY)} ${originX},${originY}`;
  }

  // Blunt/rounded tip: the two curves land at separate points either side
  // of the axis instead of converging, with a control point further out
  // to bow the top outward into a rounded cap.
  const tipAx = originX + tipRadius * dx - tipWidth * px;
  const tipAy = originY + tipRadius * dy - tipWidth * py;
  const tipBx = originX + tipRadius * dx + tipWidth * px;
  const tipBy = originY + tipRadius * dy + tipWidth * py;
  const bulgeX = originX + (tipRadius + tipWidth * 0.6) * dx;
  const bulgeY = originY + (tipRadius + tipWidth * 0.6) * dy;
  return `M${originX},${originY} Q${p(aX)},${p(aY)} ${p(tipAx)},${p(tipAy)} Q${p(bulgeX)},${p(bulgeY)} ${p(tipBx)},${p(tipBy)} Q${p(bX)},${p(bY)} ${originX},${originY}`;
}

interface FlowerConfig {
  viewBox: string;
  center: [number, number];
  stemPath: string;
  leaves: { originX: number; originY: number; angle: number; length: number; width: number }[];
  petalCount: number;
  angleOffset: number;
  tipRadius: number;
  bellyRadius: number;
  bellyWidth: number;
  tipWidth?: number;
  centerDotRadius: number;
}

const FLOWER_VARIANTS = {
  round: {
    viewBox: "0 0 200 200",
    center: [100, 95],
    stemPath: "M100,190 C97,160 103,135 100,101",
    leaves: [
      { originX: 100, originY: 168, angle: 200, length: 27, width: 10 },
      { originX: 100, originY: 148, angle: -20, length: 27, width: 10 },
    ],
    petalCount: 6,
    angleOffset: -90,
    tipRadius: 38,
    bellyRadius: 20,
    bellyWidth: 14,
    centerDotRadius: 6,
  },
  spiky: {
    viewBox: "0 0 160 280",
    center: [80, 88],
    stemPath: "M80,272 C77,220 83,150 80,94",
    leaves: [
      { originX: 80, originY: 200, angle: 195, length: 30, width: 6 },
      { originX: 80, originY: 165, angle: -15, length: 30, width: 6 },
    ],
    petalCount: 9,
    angleOffset: -90,
    tipRadius: 58,
    bellyRadius: 20,
    bellyWidth: 6,
    centerDotRadius: 5,
  },
  tulip: {
    viewBox: "0 0 170 280",
    center: [85, 96],
    stemPath: "M85,272 C82,215 88,155 85,102",
    leaves: [
      { originX: 85, originY: 205, angle: 205, length: 26, width: 8 },
      { originX: 85, originY: 170, angle: -25, length: 26, width: 8 },
    ],
    petalCount: 5,
    angleOffset: -90,
    tipRadius: 40,
    bellyRadius: 14,
    bellyWidth: 17,
    tipWidth: 11,
    centerDotRadius: 6,
  },
} satisfies Record<string, FlowerConfig> as Record<"round" | "spiky" | "tulip", FlowerConfig>;

export type FlowerVariant = keyof typeof FLOWER_VARIANTS;

export default function FlowerLineArt({
  variant = "round",
  className = "",
  startDelay = 0,
}: {
  variant?: FlowerVariant;
  className?: string;
  startDelay?: number;
}) {
  const config = FLOWER_VARIANTS[variant];
  const [cx, cy] = config.center;
  const angleStep = 360 / config.petalCount;
  const petalPaths = Array.from({ length: config.petalCount }, (_, i) =>
    petalPath(
      cx,
      cy,
      config.angleOffset + i * angleStep,
      config.tipRadius,
      config.bellyRadius,
      config.bellyWidth,
      config.tipWidth ?? 0
    )
  );

  return (
    <svg
      viewBox={config.viewBox}
      className={`flower-line-art text-charcoal-soft ${className}`}
      role="img"
      aria-label="Line-art drawing of a flower"
    >
      <path
        className="flower-path"
        d={config.stemPath}
        pathLength={1}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ animationDelay: `${startDelay}s`, animationDuration: "0.9s" }}
      />
      {config.leaves.map((leaf, i) => (
        <path
          key={`leaf-${i}`}
          className="flower-path"
          d={petalPath(leaf.originX, leaf.originY, leaf.angle, leaf.length, leaf.length * 0.3, leaf.width)}
          pathLength={1}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animationDelay: `${startDelay + 0.5 + i * 0.25}s`, animationDuration: "0.6s" }}
        />
      ))}
      {petalPaths.map((d, i) => (
        <path
          key={`petal-${i}`}
          className="flower-path text-sepia"
          d={d}
          pathLength={1}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animationDelay: `${startDelay + 1.2 + i * 0.22}s`, animationDuration: "0.5s" }}
        />
      ))}
      <circle
        className="flower-path text-sepia"
        cx={cx}
        cy={cy}
        r={config.centerDotRadius}
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.6"
        style={{ animationDelay: `${startDelay + 1.2 + config.petalCount * 0.22 + 0.1}s`, animationDuration: "0.4s" }}
      />
    </svg>
  );
}
