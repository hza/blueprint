import React from 'react';

const W = 940, H = 520;

// Square (Value Map)
const SX = 20, SY = 40, SW = 370, SH = 370;
const SCX = SX + SW / 2; // 205
const SCY = SY + SH / 2; // 225

// Circle (Customer Profile)
const CCX = 700, CCY = 225, CR = 175;

function pt(deg: number) {
  const r = (deg * Math.PI) / 180;
  return { x: CCX + CR * Math.cos(r), y: CCY + CR * Math.sin(r) };
}

// 3 equal sectors: Gains (top, 210°→330°), Customer Jobs (right, 330°→90°), Pains (bottom-left, 90°→210°)
function sector(a: { x: number; y: number }, b: { x: number; y: number }) {
  return `M ${CCX} ${CCY} L ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${CR} ${CR} 0 0 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)} Z`;
}

const p210 = pt(210);
const p330 = pt(330);
const p90  = pt(90);

const fo = (x: number, y: number, w: number, h: number, children: React.ReactNode) => (
  <foreignObject x={x} y={y} width={w} height={h} style={{ overflow: 'visible' }}>
    <div style={{ fontSize: 10, lineHeight: '14px', color: '#1f2328' }}>
      {children}
    </div>
  </foreignObject>
);

const itemStyle: React.CSSProperties = {
  margin: '1px 0 1px 8px',
  position: 'relative',
  listStyle: 'none',
};

const dotStyle: React.CSSProperties = {
  position: 'absolute',
  left: -7,
  top: 0,
  color: '#636e7b',
};

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li style={itemStyle}>
      <span style={dotStyle}>·</span>
      {children}
    </li>
  );
}

function SectionTitle({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
      {children}
    </div>
  );
}

export function ValuePropositionCanvas() {
  return (
    
    <svg viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: `${W} / ${H}`, maxWidth: W }} xmlns="http://www.w3.org/2000/svg">

      {/* ── Value Map square ─────────────────────────────────────────────── */}

      {/* Sector fills */}
      <polygon points={`${SX},${SY} ${SX+SW},${SY} ${SCX},${SCY}`}       fill="#edfbf1" />  {/* top: Gain Creators */}
      <polygon points={`${SX},${SY} ${SX},${SY+SH} ${SCX},${SCY}`}       fill="#f6f8fa" />  {/* left: Products & Services */}
      <polygon points={`${SX},${SY+SH} ${SX+SW},${SY+SH} ${SCX},${SCY}`} fill="#fff5f5" />  {/* bottom: Pain Relievers */}
      <polygon points={`${SX+SW},${SY} ${SX+SW},${SY+SH} ${SCX},${SCY}`} fill="#ffffff" />  {/* right: (connector side) */}

      {/* Border and diagonals */}
      <rect x={SX} y={SY} width={SW} height={SH} fill="none" stroke="#1f2328" strokeWidth="2" />
      <line x1={SX} y1={SY} x2={SX+SW} y2={SY+SH} stroke="#1f2328" strokeWidth="1.5" />
      <line x1={SX+SW} y1={SY} x2={SX} y2={SY+SH} stroke="#1f2328" strokeWidth="1.5" />

      {/* Gain Creators — top triangle */}
      {fo(110, 52, 190, 130,
        <>
          <SectionTitle color="#1a7f37">Gain Creators</SectionTitle>
          <ul style={{ padding: 0, margin: 0 }}>
            <Li>Fixed-price certainty — no budget surprises</Li>
            <Li>14-week delivery, 4–8 wks faster than rivals</Li>
            <Li>Reusable data platform for downstream work</Li>
            <Li>Referenceable federal deployment</Li>
          </ul>
        </>
      )}

      {/* Products & Services — left triangle */}
      {fo(25, 158, 140, 140,
        <>
          <SectionTitle color="#636e7b">Products &amp; Services</SectionTitle>
          <ul style={{ padding: 0, margin: 0 }}>
            <Li>TechCore v4 implementation</Li>
            <Li>DataBridge data migration</Li>
            <Li>ISO 27001 security layer</Li>
            <Li>L2/L3 support — 24-month SLA</Li>
          </ul>
        </>
      )}

      {/* Pain Relievers — bottom triangle */}
      {fo(108, 300, 194, 110,
        <>
          <SectionTitle color="#cf222e">Pain Relievers</SectionTitle>
          <ul style={{ padding: 0, margin: 0 }}>
            <Li>Eliminates $420K/yr manual workarounds</Li>
            <Li>Closes ISO 27001 data residency gaps</Li>
            <Li>Breaks 3-upgrade failure cycle</Li>
            <Li>Meets Jan 2026 compliance deadline</Li>
          </ul>
        </>
      )}

      {/* ── Arrow connector ───────────────────────────────────────────────── */}
      <defs>
        <marker id="vpc-arr-l" markerWidth="8" markerHeight="8" refX="0" refY="3" orient="auto">
          <path d="M8,0 L0,3 L8,6" fill="none" stroke="#636e7b" strokeWidth="1.5" />
        </marker>
        <marker id="vpc-arr-r" markerWidth="8" markerHeight="8" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="none" stroke="#636e7b" strokeWidth="1.5" />
        </marker>
      </defs>
      <line
        x1={SX + SW + 14} y1={SCY}
        x2={CCX - CR - 14} y2={CCY}
        stroke="#636e7b" strokeWidth="1.5"
        markerStart="url(#vpc-arr-l)"
        markerEnd="url(#vpc-arr-r)"
      />

      {/* ── Customer Profile circle ───────────────────────────────────────── */}

      {/* Sector fills */}
      <path d={sector(p210, p330)} fill="#edfbf1" />  {/* Gains: top */}
      <path d={sector(p330, p90)}  fill="#ddf4ff" />  {/* Customer Jobs: right */}
      <path d={sector(p90,  p210)} fill="#fff5f5" />  {/* Pains: bottom-left */}

      {/* Circle border and dividers */}
      <circle cx={CCX} cy={CCY} r={CR} fill="none" stroke="#1f2328" strokeWidth="2" />
      <line x1={CCX} y1={CCY} x2={p210.x.toFixed(1)} y2={p210.y.toFixed(1)} stroke="#1f2328" strokeWidth="1.5" />
      <line x1={CCX} y1={CCY} x2={p330.x.toFixed(1)} y2={p330.y.toFixed(1)} stroke="#1f2328" strokeWidth="1.5" />
      <line x1={CCX} y1={CCY} x2={p90.x.toFixed(1)}  y2={p90.y.toFixed(1)}  stroke="#1f2328" strokeWidth="1.5" />

      {/* Center hub */}
      <circle cx={CCX} cy={CCY} r={14} fill="white" stroke="#1f2328" strokeWidth="1.5" />

      {/* Gains — top sector (210°→330°, through 270°/top) */}
      {fo(630, 50, 140, 130,
        <>
          <SectionTitle color="#1a7f37">Gains</SectionTitle>
          <ul style={{ padding: 0, margin: 0 }}>
            <Li>Cost savings ($420K/yr)</Li>
            <Li>Budget certainty (fixed-price)</Li>
            <Li>Compliance milestone met</Li>
            <Li>Faster ops &amp; reporting</Li>
          </ul>
        </>
      )}

      {/* Customer Jobs — right sector (330°→90°, through 0°/right) */}
      {fo(808, 158, 128, 140,
        <>
          <SectionTitle color="#0969da">Customer Jobs</SectionTitle>
          <ul style={{ padding: 0, margin: 0 }}>
            <Li>Manage case data securely</Li>
            <Li>Report to legislature</Li>
            <Li>Pass ISO 27001 audit</Li>
            <Li>Modernise within budget</Li>
          </ul>
        </>
      )}

      {/* Pains — bottom-left sector (90°→210°, through 150°) */}
      {fo(510, 320, 148, 120,
        <>
          <SectionTitle color="#cf222e">Pains</SectionTitle>
          <ul style={{ padding: 0, margin: 0 }}>
            <Li>Data residency violations</Li>
            <Li>$420K wasted annually</Li>
            <Li>3 failed upgrade attempts</Li>
            <Li>Jan 2026 deadline at risk</Li>
          </ul>
        </>
      )}

    </svg>
  );
}
