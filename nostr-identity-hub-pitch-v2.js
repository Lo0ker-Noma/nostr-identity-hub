const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "La Crypta";
pres.title = "Nostr Identity Hub - Hackathon Pitch";

// ============================================
// LA CRYPTA DESIGN SYSTEM (extracted from lacrypta.ar)
// ============================================
const c = {
  bg: "0A0A0A",         // Body background
  card: "171717",        // Card background
  elevated: "262626",    // Elevated surfaces
  border: "262626",      // Borders
  white: "FAFAFA",       // Primary text
  muted: "A3A3A3",       // Muted text
  secondary: "B0B0B0",   // rgba(255,255,255,0.7) equivalent
  accent: "B4F953",      // Lime green accent
  accentDim: "1A2F0A",   // Dimmed accent for backgrounds
  danger: "FF4D4D",      // Red for "before" state
  black: "000000",
};

// Helper: subtle grid lines like lacrypta.ar hero
function addGrid(slide) {
  // Horizontal lines
  for (let y = 0; y < 5.625; y += 0.8) {
    slide.addShape(pres.shapes.LINE, {
      x: 0, y: y, w: 10, h: 0,
      line: { color: "1A1A1A", width: 0.5 },
    });
  }
  // Vertical lines
  for (let x = 0; x < 10; x += 1.2) {
    slide.addShape(pres.shapes.LINE, {
      x: x, y: 0, w: 0, h: 5.625,
      line: { color: "1A1A1A", width: 0.5 },
    });
  }
}

// Helper: section header bar
function addHeader(slide, title) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.7,
    fill: { color: c.card },
    line: { type: "none" },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0.68, w: 10, h: 0.02,
    fill: { color: c.accent },
    line: { type: "none" },
  });
  slide.addText(title, {
    x: 0.5, y: 0.15, w: 9, h: 0.4,
    fontSize: 24, bold: true, color: c.white,
    fontFace: "Inter",
  });
}

// Helper: pill badge
function addPill(slide, text, x, y, w, bgColor, textColor) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h: 0.35,
    fill: { color: bgColor || c.elevated },
    line: { color: c.border, width: 1 },
    rectRadius: 0.175,
  });
  slide.addText(text, {
    x, y, w, h: 0.35,
    fontSize: 10, color: textColor || c.white,
    fontFace: "Inter", align: "center", valign: "middle",
  });
}

// ====================================================
// SLIDE 1: TITLE
// ====================================================
let s1 = pres.addSlide();
s1.background = { color: c.bg };
addGrid(s1);

// Accent pill badge
s1.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 3.2, y: 1.2, w: 3.6, h: 0.4,
  fill: { color: c.accentDim },
  line: { color: "2A4510", width: 1 },
  rectRadius: 0.2,
});
s1.addText("⚡ Hackathon Abril 2026 — La Crypta", {
  x: 3.2, y: 1.2, w: 3.6, h: 0.4,
  fontSize: 11, color: c.accent,
  fontFace: "Inter", align: "center", valign: "middle",
});

// Main title
s1.addText("Verifica identidad,\nmata a los scammers", {
  x: 0.5, y: 1.9, w: 9, h: 1.5,
  fontSize: 52, bold: true, color: c.white,
  fontFace: "Inter", align: "center", lineSpacing: 56,
});

// Subtitle
s1.addText("Muerte a los come empanadas 💀🥟", {
  x: 1, y: 3.5, w: 8, h: 0.5,
  fontSize: 18, color: c.accent, bold: true,
  fontFace: "Inter", align: "center",
});

// Description
s1.addText("Nostr Identity Hub — Perfiles verificables con badges de reputación", {
  x: 1.5, y: 4.2, w: 7, h: 0.4,
  fontSize: 14, color: c.secondary,
  fontFace: "Inter", align: "center",
});

// Bottom bar
s1.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 5.3, w: 10, h: 0.325,
  fill: { color: c.card },
  line: { type: "none" },
});
s1.addText("Lo0ker-Noma  ·  github.com/Lo0ker-Noma/nostr-identity-hub", {
  x: 0.5, y: 5.3, w: 9, h: 0.325,
  fontSize: 10, color: c.muted,
  fontFace: "Inter", align: "center", valign: "middle",
});

// ====================================================
// SLIDE 2: THE PROBLEM
// ====================================================
let s2 = pres.addSlide();
s2.background = { color: c.bg };
addGrid(s2);
addHeader(s2, "El Problema");

// Left card - Real case
s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.4, y: 1.1, w: 4.4, h: 3.8,
  fill: { color: c.card },
  line: { color: c.danger, width: 1.5 },
  rectRadius: 0.15,
});

s2.addText("❌ Caso Real: Suplantación", {
  x: 0.7, y: 1.4, w: 3.8, h: 0.35,
  fontSize: 14, bold: true, color: c.danger,
  fontFace: "Inter",
});

const problemItems = [
  "Alguien se hizo pasar por El Negro",
  "Cambió el nombre levemente para estafar",
  "Intentó vender productos falsos",
  "Sin forma de verificar legitimidad",
  "Miembros nuevos fácilmente engañados",
  "Los come empanadas andan sueltos 🥟",
];

problemItems.forEach((item, i) => {
  s2.addText("•  " + item, {
    x: 0.7, y: 2.0 + i * 0.42, w: 3.8, h: 0.4,
    fontSize: 12, color: c.secondary,
    fontFace: "Inter",
  });
});

// Right card - For new members
s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 5.2, y: 1.1, w: 4.4, h: 3.8,
  fill: { color: c.card },
  line: { color: c.elevated, width: 1 },
  rectRadius: 0.15,
});

s2.addText("🤔 Para Miembros Nuevos", {
  x: 5.5, y: 1.4, w: 3.8, h: 0.35,
  fontSize: 14, bold: true, color: c.white,
  fontFace: "Inter",
});

const newMemberItems = [
  "¿Quién realmente aporta valor?",
  "¿Quién es legítimo y quién es falso?",
  "¿En quién puedo confiar para aprender?",
  "Sin forma de verificar miembros activos",
  "Estafadores y espías se camuflan",
  "No existe sistema de reputación",
];

newMemberItems.forEach((item, i) => {
  s2.addText("•  " + item, {
    x: 5.5, y: 2.0 + i * 0.42, w: 3.8, h: 0.4,
    fontSize: 12, color: c.secondary,
    fontFace: "Inter",
  });
});

// ====================================================
// SLIDE 3: THE SOLUTION
// ====================================================
let s3 = pres.addSlide();
s3.background = { color: c.bg };
addGrid(s3);
addHeader(s3, "La Solución: Nostr Identity Hub");

const pillars = [
  { title: "NIP-05 Identidad", items: ["satoshi@lacrypta.ar", "Pubkey verificada por DNS", "Dirección legible"], icon: "🔑" },
  { title: "NIP-58 Badges", items: ["Prueba de asistencia", "Badge de speaker", "Badge de contribuidor", "Verificación de donante"], icon: "🏅" },
  { title: "Score de Reputación", items: ["Puntuación ponderada", "Público en relays", "Verificable por todos"], icon: "📊" },
];

pillars.forEach((pillar, i) => {
  const x = 0.4 + i * 3.15;

  s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y: 1.1, w: 3.0, h: 3.8,
    fill: { color: c.card },
    line: { color: c.border, width: 1 },
    rectRadius: 0.15,
  });

  // Icon circle
  s3.addShape(pres.shapes.OVAL, {
    x: x + 1.1, y: 1.4, w: 0.7, h: 0.7,
    fill: { color: c.accentDim },
    line: { color: "2A4510", width: 1 },
  });
  s3.addText(pillar.icon, {
    x: x + 1.1, y: 1.4, w: 0.7, h: 0.7,
    fontSize: 22, align: "center", valign: "middle",
    fontFace: "Inter",
  });

  // Title
  s3.addText(pillar.title, {
    x: x + 0.2, y: 2.3, w: 2.6, h: 0.35,
    fontSize: 14, bold: true, color: c.accent,
    fontFace: "Inter", align: "center",
  });

  // Items
  pillar.items.forEach((item, j) => {
    s3.addText("•  " + item, {
      x: x + 0.3, y: 2.8 + j * 0.4, w: 2.4, h: 0.35,
      fontSize: 11, color: c.secondary,
      fontFace: "Inter",
    });
  });
});

// ====================================================
// SLIDE 4: HOW IT WORKS - FLOW
// ====================================================
let s4 = pres.addSlide();
s4.background = { color: c.bg };
addGrid(s4);
addHeader(s4, "Cómo Funciona");

const steps = [
  { num: "1", title: "Crear Perfil", desc: "Registrate con tu pubkey Nostr" },
  { num: "2", title: "Verificar NIP-05", desc: "Verificación de identidad DNS" },
  { num: "3", title: "Ganar Badges", desc: "Asistí a eventos, contribuí" },
  { num: "4", title: "Construir Reputación", desc: "Registro público verificable" },
];

steps.forEach((step, i) => {
  const x = 0.3 + i * 2.45;

  // Step card
  s4.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y: 1.5, w: 2.2, h: 2.8,
    fill: { color: c.card },
    line: { color: c.border, width: 1 },
    rectRadius: 0.12,
  });

  // Number circle
  s4.addShape(pres.shapes.OVAL, {
    x: x + 0.75, y: 1.8, w: 0.6, h: 0.6,
    fill: { color: c.accent },
    line: { type: "none" },
  });
  s4.addText(step.num, {
    x: x + 0.75, y: 1.8, w: 0.6, h: 0.6,
    fontSize: 22, bold: true, color: c.bg,
    fontFace: "Inter", align: "center", valign: "middle",
  });

  // Title
  s4.addText(step.title, {
    x: x + 0.1, y: 2.7, w: 2.0, h: 0.35,
    fontSize: 13, bold: true, color: c.white,
    fontFace: "Inter", align: "center",
  });

  // Description
  s4.addText(step.desc, {
    x: x + 0.1, y: 3.2, w: 2.0, h: 0.6,
    fontSize: 11, color: c.muted,
    fontFace: "Inter", align: "center",
  });

  // Arrow between steps
  if (i < steps.length - 1) {
    s4.addText("→", {
      x: x + 2.15, y: 2.5, w: 0.35, h: 0.5,
      fontSize: 24, color: c.accent,
      fontFace: "Inter", align: "center", valign: "middle",
    });
  }
});

// Bottom note
s4.addText("Toda la verificación es pública y está almacenada en relays Nostr — trustless por diseño", {
  x: 0.5, y: 4.7, w: 9, h: 0.4,
  fontSize: 12, italic: true, color: c.muted,
  fontFace: "Inter", align: "center",
});

// ====================================================
// SLIDE 5: BADGE SYSTEM
// ====================================================
let s5 = pres.addSlide();
s5.background = { color: c.bg };
addGrid(s5);
addHeader(s5, "Badges de Reputación (NIP-58)");

const badges = [
  { icon: "📍", label: "Asistente", desc: "Asistió a eventos de La Crypta" },
  { icon: "🎤", label: "Speaker", desc: "Dio charlas o workshops" },
  { icon: "👨‍💻", label: "Contribuidor", desc: "Construyó para la comunidad" },
  { icon: "⚡", label: "Donante", desc: "Apoyó via Lightning zaps" },
  { icon: "✅", label: "Verificado", desc: "Identidad confirmada por NIP-05" },
  { icon: "🏆", label: "Miembro Core", desc: "Contribuidor activo a largo plazo" },
];

badges.forEach((badge, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 0.4 + col * 3.15;
  const y = 1.1 + row * 2.0;

  s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w: 3.0, h: 1.7,
    fill: { color: c.card },
    line: { color: c.border, width: 1 },
    rectRadius: 0.12,
  });

  // Icon
  s5.addShape(pres.shapes.OVAL, {
    x: x + 0.2, y: y + 0.25, w: 0.6, h: 0.6,
    fill: { color: c.accentDim },
    line: { type: "none" },
  });
  s5.addText(badge.icon, {
    x: x + 0.2, y: y + 0.25, w: 0.6, h: 0.6,
    fontSize: 22, align: "center", valign: "middle",
  });

  // Label
  s5.addText(badge.label, {
    x: x + 1.0, y: y + 0.25, w: 1.8, h: 0.3,
    fontSize: 14, bold: true, color: c.accent,
    fontFace: "Inter",
  });

  // Description
  s5.addText(badge.desc, {
    x: x + 1.0, y: y + 0.6, w: 1.8, h: 0.5,
    fontSize: 11, color: c.muted,
    fontFace: "Inter",
  });
});

// ====================================================
// SLIDE 6: BEFORE / AFTER
// ====================================================
let s6 = pres.addSlide();
s6.background = { color: c.bg };
addGrid(s6);
addHeader(s6, "Impacto Real");

// BEFORE
s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.4, y: 1.1, w: 4.4, h: 3.8,
  fill: { color: c.card },
  line: { color: c.danger, width: 1.5 },
  rectRadius: 0.15,
});

s6.addText("❌  Antes", {
  x: 0.7, y: 1.4, w: 3.8, h: 0.4,
  fontSize: 16, bold: true, color: c.danger,
  fontFace: "Inter",
});

["No se puede verificar quién es real", "Los impostores pasan desapercibidos", "Los estafadores se camuflan fácil",
 "Miembros nuevos no confían en nadie", "No hay sistema de reputación", "Los come empanadas andan sueltos 🥟"].forEach((item, i) => {
  s6.addText("•  " + item, {
    x: 0.7, y: 2.0 + i * 0.42, w: 3.8, h: 0.4,
    fontSize: 12, color: c.secondary,
    fontFace: "Inter",
  });
});

// AFTER
s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 5.2, y: 1.1, w: 4.4, h: 3.8,
  fill: { color: c.card },
  line: { color: c.accent, width: 1.5 },
  rectRadius: 0.15,
});

s6.addText("✅  Después: Identity Hub", {
  x: 5.5, y: 1.4, w: 3.8, h: 0.4,
  fontSize: 16, bold: true, color: c.accent,
  fontFace: "Inter",
});

["Identidades verificadas con NIP-05", "Historial público de badges en relays", "Score de reputación para todos",
 "Verificación instantánea de cualquiera", "Nuevos miembros encuentran mentores", "Come empanadas = 0 badges 🚫"].forEach((item, i) => {
  s6.addText("•  " + item, {
    x: 5.5, y: 2.0 + i * 0.42, w: 3.8, h: 0.4,
    fontSize: 12, color: c.secondary,
    fontFace: "Inter",
  });
});

// ====================================================
// SLIDE 7: TECH STACK
// ====================================================
let s7 = pres.addSlide();
s7.background = { color: c.bg };
addGrid(s7);
addHeader(s7, "Stack Técnico");

const techCols = [
  { title: "Protocolo", items: ["NIP-05: Identidad DNS", "NIP-58: Badges", "NIP-57: Zaps", "BIP-340: Schnorr"] },
  { title: "Backend", items: ["Vercel Functions", "Node.js Runtime", "Firma Schnorr", "Pool de Relays Nostr"] },
  { title: "Frontend", items: ["Vanilla JS (SPA)", "Diseño La Crypta", "Nostr Tools SDK", "Web Crypto API"] },
];

techCols.forEach((col, i) => {
  const x = 0.4 + i * 3.15;

  s7.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y: 1.1, w: 3.0, h: 3.8,
    fill: { color: c.card },
    line: { color: c.border, width: 1 },
    rectRadius: 0.15,
  });

  s7.addText(col.title, {
    x, y: 1.4, w: 3.0, h: 0.4,
    fontSize: 16, bold: true, color: c.accent,
    fontFace: "Inter", align: "center",
  });

  col.items.forEach((item, j) => {
    addPill(s7, item, x + 0.25, 2.1 + j * 0.55, 2.5, c.elevated, c.white);
  });
});

// ====================================================
// SLIDE 8: MVP TIMELINE
// ====================================================
let s8 = pres.addSlide();
s8.background = { color: c.bg };
addGrid(s8);
addHeader(s8, "MVP: Plan de Construcción");

const phases = [
  { week: "Semana 1", title: "Base", items: ["Setup claves Nostr", "Endpoint NIP-05", "Esquema de DB"] },
  { week: "Semana 2", title: "Sistema de Badges", items: ["API de Badges", "Eventos NIP-58", "Lógica de emisión"] },
  { week: "Semana 3", title: "Frontend", items: ["UI de Perfil", "Directorio", "Página de verificación"] },
];

phases.forEach((phase, i) => {
  const x = 0.4 + i * 3.15;

  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y: 1.1, w: 3.0, h: 3.8,
    fill: { color: c.card },
    line: { color: c.accent, width: 1 },
    rectRadius: 0.15,
  });

  // Week pill
  addPill(s8, phase.week, x + 0.75, 1.4, 1.5, c.accent, c.bg);

  // Phase title
  s8.addText(phase.title, {
    x, y: 2.0, w: 3.0, h: 0.35,
    fontSize: 15, bold: true, color: c.white,
    fontFace: "Inter", align: "center",
  });

  phase.items.forEach((item, j) => {
    s8.addText("✓  " + item, {
      x: x + 0.3, y: 2.6 + j * 0.5, w: 2.4, h: 0.4,
      fontSize: 12, color: c.secondary,
      fontFace: "Inter",
    });
  });
});

// ====================================================
// SLIDE 9: WHY WE WIN
// ====================================================
let s9 = pres.addSlide();
s9.background = { color: c.bg };
addGrid(s9);
addHeader(s9, "Por Qué Vamos a Ganar");

const reasons = [
  { title: "Resuelve un Problema Real", desc: "Vivimos la estafa en carne propia. Esto no es teórico." },
  { title: "Construido sobre Estándares Abiertos", desc: "NIP-05, NIP-58, NIP-57 — protocolos Nostr probados." },
  { title: "Extiende POA-HDMP", desc: "Evolución de nuestro sistema Proof of Attendance exitoso (v3.3)." },
  { title: "Útil desde el Día 1", desc: "La comunidad de La Crypta se vuelve verificable inmediatamente." },
];

reasons.forEach((reason, i) => {
  const y = 1.1 + i * 1.0;

  s9.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y, w: 9.2, h: 0.8,
    fill: { color: c.card },
    line: { color: c.border, width: 1 },
    rectRadius: 0.1,
  });

  // Number
  s9.addShape(pres.shapes.OVAL, {
    x: 0.6, y: y + 0.1, w: 0.55, h: 0.55,
    fill: { color: c.accent },
    line: { type: "none" },
  });
  s9.addText(String(i + 1), {
    x: 0.6, y: y + 0.1, w: 0.55, h: 0.55,
    fontSize: 18, bold: true, color: c.bg,
    fontFace: "Inter", align: "center", valign: "middle",
  });

  s9.addText(reason.title, {
    x: 1.4, y: y + 0.08, w: 8, h: 0.3,
    fontSize: 13, bold: true, color: c.accent,
    fontFace: "Inter",
  });
  s9.addText(reason.desc, {
    x: 1.4, y: y + 0.4, w: 8, h: 0.3,
    fontSize: 11, color: c.muted,
    fontFace: "Inter",
  });
});

// ====================================================
// SLIDE 10: CLOSING CTA
// ====================================================
let s10 = pres.addSlide();
s10.background = { color: c.bg };
addGrid(s10);

// Big title
s10.addText("Hagamos La Crypta\nConfiable", {
  x: 0.5, y: 1.2, w: 9, h: 1.6,
  fontSize: 52, bold: true, color: c.white,
  fontFace: "Inter", align: "center", lineSpacing: 56,
});

s10.addText("Una identidad verificable a la vez.", {
  x: 1, y: 3.0, w: 8, h: 0.5,
  fontSize: 20, italic: true, color: c.secondary,
  fontFace: "Inter", align: "center",
});

// CTA button
s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 3, y: 3.8, w: 4, h: 0.6,
  fill: { color: c.accent },
  line: { type: "none" },
  rectRadius: 0.3,
});
s10.addText("Construir Nostr Identity Hub  ↗", {
  x: 3, y: 3.8, w: 4, h: 0.6,
  fontSize: 16, bold: true, color: c.bg,
  fontFace: "Inter", align: "center", valign: "middle",
});

// Footer
s10.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 5.0, w: 10, h: 0.625,
  fill: { color: c.card },
  line: { type: "none" },
});
s10.addText("Hackathon Abril 2026 — La Crypta — Nostr Identity & Social", {
  x: 0.5, y: 5.0, w: 9, h: 0.3,
  fontSize: 11, color: c.muted,
  fontFace: "Inter", align: "center",
});
s10.addText("Muerte a los come empanadas 💀🥟", {
  x: 0.5, y: 5.3, w: 9, h: 0.25,
  fontSize: 10, color: c.accent,
  fontFace: "Inter", align: "center",
});

// Save
pres.writeFile({ fileName: "/sessions/inspiring-loving-curie/mnt/_Clawdio/Hackaton/Nostr-Identity-Hub-Pitch.pptx" });
console.log("✅ Presentation v2 created with La Crypta design system!");
