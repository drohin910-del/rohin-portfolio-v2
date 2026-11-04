// Hand-built SVG charts. All geometry is computed from the typed data passed in.

const INK = "#14181f";
const MUTED = "#5d6672";
const RULE = "#e2ded6";
const TINT = "#f3f1ec";

type Series = { label: string; bar: number; line: number; forecast: boolean };

function niceMax(v: number) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const steps = [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  for (const s of steps) if (s * p >= v) return s * p;
  return 10 * p;
}

export function BarLineChart({
  data,
  barColor,
  lineColor,
  barFormat,
  lineFormat,
  barTitle,
  lineTitle,
  ariaLabel,
  compact = false,
}: {
  data: readonly Series[];
  barColor: string;
  lineColor: string;
  barFormat: (v: number) => string;
  lineFormat: (v: number) => string;
  barTitle: string;
  lineTitle: string;
  ariaLabel: string;
  compact?: boolean;
}) {
  const W = compact ? 520 : 640;
  const padL = 12;
  const padR = 12;
  const lineTop = 34;
  const lineH = compact ? 62 : 78;
  const barTop = lineTop + lineH + (compact ? 34 : 42);
  const barH = compact ? 150 : 190;
  const axisY = barTop + barH;
  const H = axisY + 34;
  const n = data.length;
  const slot = (W - padL - padR) / n;
  const bw = Math.min(46, slot * 0.58);
  const maxBar = niceMax(Math.max(...data.map((d) => d.bar)) * 1.08);
  const lines = data.map((d) => d.line);
  const lMin = Math.min(...lines);
  const lMax = Math.max(...lines);
  const span = lMax - lMin || 1;
  const ly = (v: number) => lineTop + 18 + (1 - (v - lMin) / span) * (lineH - 26);
  const cx = (i: number) => padL + slot * i + slot / 2;
  const firstF = data.findIndex((d) => d.forecast);
  const fx = firstF >= 0 ? padL + slot * firstF : W;
  const fs = compact ? 13 : 13;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} className="h-auto w-full">
      {firstF >= 0 ? <rect x={fx} y={8} width={W - padR - fx} height={axisY - 8} fill={TINT} /> : null}
      {firstF > 0 ? (
        <>
          <text x={padL + 2} y={22} fontSize={11} fill={MUTED} letterSpacing="0.08em">
            ACTUAL
          </text>
          <text x={fx + 8} y={22} fontSize={11} fill={MUTED} letterSpacing="0.08em">
            FORECAST
          </text>
        </>
      ) : null}

      {/* line panel */}
      <text x={W - padR} y={22} fontSize={11} fill={MUTED} textAnchor="end">
        {lineTitle}
      </text>
      <polyline
        fill="none"
        stroke={lineColor}
        strokeWidth={2.4}
        points={data.map((d, i) => `${cx(i)},${ly(d.line)}`).join(" ")}
      />
      {data.map((d, i) => (
        <g key={`l${d.label}`}>
          <circle cx={cx(i)} cy={ly(d.line)} r={4} fill={lineColor} />
          <text
            x={cx(i)}
            y={ly(d.line) - 9}
            fontSize={fs}
            textAnchor="middle"
            fill={INK}
            fontFamily="IBM Plex Mono, monospace"
          >
            {lineFormat(d.line)}
          </text>
        </g>
      ))}

      {/* bar panel */}
      <text x={W - padR} y={barTop - 14} fontSize={11} fill={MUTED} textAnchor="end">
        {barTitle}
      </text>
      <line x1={padL} x2={W - padR} y1={axisY} y2={axisY} stroke={INK} strokeWidth={1} />
      {data.map((d, i) => {
        const h = (d.bar / maxBar) * barH;
        return (
          <g key={`b${d.label}`}>
            <rect
              x={cx(i) - bw / 2}
              y={axisY - h}
              width={bw}
              height={h}
              fill={barColor}
              opacity={d.forecast ? 1 : 0.55}
            />
            <text
              x={cx(i)}
              y={axisY - h - 6}
              fontSize={fs - 1}
              textAnchor="middle"
              fill={INK}
              fontFamily="IBM Plex Mono, monospace"
            >
              {barFormat(d.bar)}
            </text>
            <text x={cx(i)} y={axisY + 20} fontSize={fs - 1} textAnchor="middle" fill={MUTED}>
              {compact ? d.label.replace("FY20", "") : d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function FootballField({
  rows,
  dcf,
  price,
  compact = false,
}: {
  rows: readonly { method: string; low: number; high: number; mid: number }[];
  dcf: number;
  price: number;
  compact?: boolean;
}) {
  const W = compact ? 520 : 640;
  const labelW = compact ? 150 : 190;
  const left = labelW + 10;
  const right = W - 16;
  const min = 100;
  const max = 380;
  const sx = (v: number) => left + ((v - min) / (max - min)) * (right - left);
  const rowH = compact ? 36 : 42;
  const top = 40;
  const H = top + rows.length * rowH + 44;
  const ticks = [150, 200, 250, 300, 350];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Football field of Airbus value per share by method. ${rows
        .map((r) => `${r.method} €${r.low.toFixed(1)} to €${r.high.toFixed(1)}`)
        .join("; ")}. DCF value €${dcf.toFixed(2)}, share price €${price.toFixed(2)}.`}
      className="h-auto w-full"
    >
      {ticks.map((t) => (
        <g key={t}>
          <line x1={sx(t)} x2={sx(t)} y1={top - 6} y2={H - 30} stroke={RULE} />
          <text x={sx(t)} y={H - 12} fontSize={12} textAnchor="middle" fill={MUTED} fontFamily="IBM Plex Mono, monospace">
            €{t}
          </text>
        </g>
      ))}
      {rows.map((r, i) => {
        const y = top + i * rowH;
        return (
          <g key={r.method}>
            <text x={labelW} y={y + rowH / 2 + 4} fontSize={13} textAnchor="end" fill={INK}>
              {r.method.replace(" (WACC × g sensitivity)", compact ? "" : " (WACC × g)")}
            </text>
            <rect
              x={sx(r.low)}
              y={y + 8}
              width={sx(r.high) - sx(r.low)}
              height={rowH - 18}
              fill={i === 0 ? "#1f4e79" : "#7d9cba"}
            />
            <text x={sx(r.low) - 5} y={y + rowH / 2 + 4} fontSize={11.5} textAnchor="end" fill={MUTED} fontFamily="IBM Plex Mono, monospace">
              {r.low.toFixed(1)}
            </text>
            <text x={sx(r.high) + 5} y={y + rowH / 2 + 4} fontSize={11.5} fill={MUTED} fontFamily="IBM Plex Mono, monospace">
              {r.high.toFixed(1)}
            </text>
          </g>
        );
      })}
      <line x1={sx(dcf)} x2={sx(dcf)} y1={top - 10} y2={H - 30} stroke={INK} strokeWidth={1.6} />
      <line x1={sx(price)} x2={sx(price)} y1={top - 10} y2={H - 30} stroke="#9a7431" strokeWidth={1.6} strokeDasharray="4 3" />
      <text x={sx(dcf) - 4} y={top - 16} fontSize={12} textAnchor="end" fill={INK} fontFamily="IBM Plex Mono, monospace">
        DCF €{dcf.toFixed(2)}
      </text>
      <text x={sx(price) + 4} y={top - 16} fontSize={12} fill="#9a7431" fontFamily="IBM Plex Mono, monospace">
        Price €{price.toFixed(2)}
      </text>
    </svg>
  );
}

export function ColumnChart({
  data,
  color,
  format,
  ariaLabel,
}: {
  data: readonly { year: string; value: number }[];
  color: string;
  format: (v: number) => string;
  ariaLabel: string;
}) {
  const W = 520;
  const H = 240;
  const axisY = H - 34;
  const top = 24;
  const slot = (W - 24) / data.length;
  const bw = Math.min(56, slot * 0.6);
  const max = niceMax(Math.max(...data.map((d) => d.value)) * 1.1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} className="h-auto w-full">
      <line x1={12} x2={W - 12} y1={axisY} y2={axisY} stroke={INK} />
      {data.map((d, i) => {
        const h = (d.value / max) * (axisY - top);
        const x = 12 + slot * i + slot / 2;
        return (
          <g key={d.year}>
            <rect x={x - bw / 2} y={axisY - h} width={bw} height={h} fill={color} />
            <text x={x} y={axisY - h - 7} fontSize={13} textAnchor="middle" fill={INK} fontFamily="IBM Plex Mono, monospace">
              {format(d.value)}
            </text>
            <text x={x} y={axisY + 20} fontSize={12} textAnchor="middle" fill={MUTED}>
              {d.year}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Waterfall({
  steps,
  format,
  ariaLabel,
  color,
  negColor = "#a33a2c",
  totalColor = INK,
  min = 0,
}: {
  steps: readonly { label: string; value: number; kind: "start" | "add" | "sub" | "total" }[];
  format: (v: number, kind: string) => string;
  ariaLabel: string;
  color: string;
  negColor?: string;
  totalColor?: string;
  min?: number;
}) {
  const W = 640;
  const H = 290;
  const axisY = H - 58;
  const top = 26;
  // running totals
  let run = 0;
  const bars = steps.map((s) => {
    if (s.kind === "start" || s.kind === "total") {
      run = s.value;
      return { ...s, y0: min, y1: s.value };
    }
    const y0 = run;
    run = run + s.value;
    return { ...s, y0, y1: run };
  });
  const max = niceMax(Math.max(...bars.map((b) => Math.max(b.y0, b.y1))) * 1.08);
  const sy = (v: number) => axisY - ((v - min) / (max - min)) * (axisY - top);
  const slot = (W - 20) / steps.length;
  const bw = Math.min(64, slot * 0.62);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} className="h-auto w-full">
      <line x1={10} x2={W - 10} y1={axisY} y2={axisY} stroke={INK} />
      {bars.map((b, i) => {
        const x = 10 + slot * i + slot / 2;
        const yA = sy(Math.max(b.y0, b.y1));
        const yB = sy(Math.min(b.y0, b.y1));
        const fill = b.kind === "total" || b.kind === "start" ? totalColor : b.value < 0 ? negColor : color;
        const words = b.label.split(" ");
        const split = words.length > 1 && b.label.length > 12;
        const mid = Math.ceil(words.length / 2);
        const l1 = split ? words.slice(0, mid).join(" ") : b.label;
        const l2 = split ? words.slice(mid).join(" ") : "";
        return (
          <g key={b.label}>
            <rect x={x - bw / 2} y={yA} width={bw} height={Math.max(1.5, yB - yA)} fill={fill} />
            {i < bars.length - 1 ? (
              <line x1={x + bw / 2} x2={x + slot - bw / 2} y1={sy(b.y1)} y2={sy(b.y1)} stroke={MUTED} strokeDasharray="2 2" />
            ) : null}
            <text x={x} y={yA - 7} fontSize={12.5} textAnchor="middle" fill={INK} fontFamily="IBM Plex Mono, monospace">
              {format(b.value, b.kind)}
            </text>
            <text x={x} y={axisY + 18} fontSize={11.5} textAnchor="middle" fill={MUTED}>
              {l1}
            </text>
            {l2 ? (
              <text x={x} y={axisY + 33} fontSize={11.5} textAnchor="middle" fill={MUTED}>
                {l2}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

export function ScenarioBars({
  title,
  values,
  colors,
  format,
}: {
  title: string;
  values: readonly { name: string; value: number }[];
  colors: readonly string[];
  format: (v: number) => string;
}) {
  const W = 260;
  const H = 190;
  const axisY = H - 30;
  const top = 44;
  const max = niceMax(Math.max(...values.map((v) => v.value)) * 1.08);
  const slot = (W - 20) / values.length;
  const bw = slot * 0.56;
  return (
    <figure>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${title}: ${values.map((v) => `${v.name} ${format(v.value)}`).join(", ")}`}
        className="h-auto w-full"
      >
        <text x={10} y={18} fontSize={13} fill={INK} fontWeight={600}>
          {title}
        </text>
        <line x1={10} x2={W - 10} y1={axisY} y2={axisY} stroke={INK} />
        {values.map((v, i) => {
          const h = (v.value / max) * (axisY - top);
          const x = 10 + slot * i + slot / 2;
          return (
            <g key={v.name}>
              <rect x={x - bw / 2} y={axisY - h} width={bw} height={h} fill={colors[i] ?? INK} />
              <text x={x} y={axisY - h - 6} fontSize={12} textAnchor="middle" fill={INK} fontFamily="IBM Plex Mono, monospace">
                {format(v.value)}
              </text>
              <text x={x} y={axisY + 18} fontSize={12} textAnchor="middle" fill={MUTED}>
                {v.name}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
