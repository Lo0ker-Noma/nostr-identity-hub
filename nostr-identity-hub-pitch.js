const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "La Crypta";
pres.title = "Nostr Identity Hub - Hackathon Pitch";

// Define color palette
const colors = {
  gold: "F7931A",
  darkBg: "1A1A1A",
  purple: "6D2E46",
  lightPurple: "8B4A62",
  white: "FFFFFF",
  lightGrey: "E8E8E8",
  darkGrey: "404040",
};

const makeShadow = () => ({
  type: "outer",
  color: "000000",
  blur: 8,
  offset: 3,
  opacity: 0.3,
});

const makeGoldAccent = () => ({
  type: "outer",
  color: colors.gold,
  blur: 12,
  offset: 2,
  opacity: 0.4,
});

// Slide 1: Title Slide
let slide1 = pres.addSlide();
slide1.background = { color: colors.darkBg };

slide1.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0,
  w: 10,
  h: 2.5,
  fill: { color: colors.purple },
  line: { type: "none" },
});

slide1.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 2.4,
  w: 0.15,
  h: 3.225,
  fill: { color: colors.gold },
  line: { type: "none" },
});

slide1.addText("NostrPOA⚡️HDMP", {
  x: 0.5,
  y: 0.4,
  w: 9,
  h: 0.8,
  fontSize: 56,
  bold: true,
  color: colors.white,
  fontFace: "Arial",
  align: "left",
});

slide1.addText("(Hackathon)", {
  x: 0.5,
  y: 1.15,
  w: 9,
  h: 0.5,
  fontSize: 28,
  color: colors.gold,
  fontFace: "Arial",
  align: "left",
});

slide1.addText("Muerte a los Scammers, y a los come empanadas 💀🥟", {
  x: 0.5,
  y: 2.3,
  w: 9,
  h: 0.8,
  fontSize: 22,
  bold: true,
  color: colors.gold,
  fontFace: "Arial",
  align: "left",
});

slide1.addText("Building trust through Nostr verification & reputation badges", {
  x: 0.5,
  y: 3.3,
  w: 9,
  h: 0.6,
  fontSize: 16,
  color: colors.lightGrey,
  fontFace: "Arial",
  align: "left",
});

slide1.addText("Hackathon April 2026 — La Crypta", {
  x: 0.5,
  y: 4.9,
  w: 9,
  h: 0.5,
  fontSize: 14,
  color: colors.gold,
  fontFace: "Arial",
  italic: true,
  align: "left",
});

// Slide 2: The Problem
let slide2 = pres.addSlide();
slide2.background = { color: colors.darkBg };

// Header bar
slide2.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0,
  w: 10,
  h: 0.8,
  fill: { color: colors.purple },
  line: { type: "none" },
});

slide2.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0.78,
  w: 10,
  h: 0.04,
  fill: { color: colors.gold },
  line: { type: "none" },
});

slide2.addText("The Problem: Impersonation & Scams", {
  x: 0.5,
  y: 0.2,
  w: 9,
  h: 0.4,
  fontSize: 32,
  bold: true,
  color: colors.gold,
  fontFace: "Arial",
});

// Problem box 1
slide2.addShape(pres.shapes.RECTANGLE, {
  x: 0.5,
  y: 1.2,
  w: 4.3,
  h: 3.8,
  fill: { color: colors.darkGrey },
  line: { color: colors.gold, width: 2 },
  shadow: makeShadow(),
});

slide2.addText("Real Case: El Negro Impersonator", {
  x: 0.8,
  y: 1.5,
  w: 3.7,
  h: 0.5,
  fontSize: 16,
  bold: true,
  color: colors.gold,
  fontFace: "Arial",
});

slide2.addText(
  [
    { text: "Someone pretended to be El Negro", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "Tried to sell products", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "No way to verify legitimacy", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    {
      text: "Could be a scammer, spy, or just a fake (come empanadas 🥟)",
      options: { breakLine: true },
    },
  ],
  {
    x: 0.8,
    y: 2.2,
    w: 3.7,
    h: 2.7,
    fontSize: 13,
    color: colors.lightGrey,
    fontFace: "Arial",
    valign: "top",
  }
);

// Problem box 2
slide2.addShape(pres.shapes.RECTANGLE, {
  x: 5.2,
  y: 1.2,
  w: 4.3,
  h: 3.8,
  fill: { color: colors.darkGrey },
  line: { color: colors.gold, width: 2 },
  shadow: makeShadow(),
});

slide2.addText("For New Community Members", {
  x: 5.5,
  y: 1.5,
  w: 3.7,
  h: 0.5,
  fontSize: 16,
  bold: true,
  color: colors.gold,
  fontFace: "Arial",
});

slide2.addText(
  [
    {
      text: "How do I know who's actually contributing?",
      options: { breakLine: true },
    },
    { text: " ", options: { breakLine: true } },
    { text: "Who's a legit member vs a fake?", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "Who can I trust to learn from?", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    {
      text: "No clear way to verify active, value-adding members",
      options: { breakLine: true },
    },
  ],
  {
    x: 5.5,
    y: 2.2,
    w: 3.7,
    h: 2.7,
    fontSize: 13,
    color: colors.lightGrey,
    fontFace: "Arial",
    valign: "top",
  }
);

// Slide 3: The Solution
let slide3 = pres.addSlide();
slide3.background = { color: colors.darkBg };

// Header
slide3.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0,
  w: 10,
  h: 0.8,
  fill: { color: colors.purple },
  line: { type: "none" },
});

slide3.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0.78,
  w: 10,
  h: 0.04,
  fill: { color: colors.gold },
  line: { type: "none" },
});

slide3.addText("The Solution: Nostr Identity Hub", {
  x: 0.5,
  y: 0.2,
  w: 9,
  h: 0.4,
  fontSize: 32,
  bold: true,
  color: colors.gold,
  fontFace: "Arial",
});

// Main content box
slide3.addShape(pres.shapes.RECTANGLE, {
  x: 0.5,
  y: 1.2,
  w: 9,
  h: 4,
  fill: { color: colors.darkGrey },
  line: { color: colors.lightPurple, width: 2 },
  shadow: makeShadow(),
});

// Three pillars
const pillarWidth = 2.7;
const pillarX = [0.8, 3.6, 6.4];
const pillarTitles = [
  "NIP-05 Identity",
  "Reputation Badges",
  "Public Verification",
];
const pillarDescriptions = [
  "satoshi@lacrypta.ar\nVerified Nostr pubkey\nLinked to real person",
  "Attendance\nSpeaker\nContributor\nDonation\nVerification level",
  "Lightning Network\nPublic Nostr relays\nOn-chain proof",
];

for (let i = 0; i < 3; i++) {
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: pillarX[i],
    y: 1.5,
    w: pillarWidth,
    h: 0.5,
    fill: { color: colors.gold },
    line: { type: "none" },
  });

  slide3.addText(pillarTitles[i], {
    x: pillarX[i],
    y: 1.55,
    w: pillarWidth,
    h: 0.4,
    fontSize: 14,
    bold: true,
    color: colors.darkBg,
    fontFace: "Arial",
    align: "center",
    valign: "middle",
  });

  slide3.addText(pillarDescriptions[i], {
    x: pillarX[i] + 0.1,
    y: 2.2,
    w: pillarWidth - 0.2,
    h: 2.6,
    fontSize: 12,
    color: colors.lightGrey,
    fontFace: "Arial",
    align: "center",
    valign: "top",
  });
}

// Slide 4: How It Works - Visual Flow
let slide4 = pres.addSlide();
slide4.background = { color: colors.darkBg };

// Header
slide4.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0,
  w: 10,
  h: 0.8,
  fill: { color: colors.purple },
  line: { type: "none" },
});

slide4.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0.78,
  w: 10,
  h: 0.04,
  fill: { color: colors.gold },
  line: { type: "none" },
});

slide4.addText("How It Works: Verification Flow", {
  x: 0.5,
  y: 0.2,
  w: 9,
  h: 0.4,
  fontSize: 32,
  bold: true,
  color: colors.gold,
  fontFace: "Arial",
});

// Flow steps
const steps = [
  { num: "1", title: "Create Profile", desc: "User registers with Nostr" },
  { num: "2", title: "Verify Identity", desc: "NIP-05 DNS verification" },
  { num: "3", title: "Earn Badges", desc: "Attend events, contribute" },
  { num: "4", title: "Build Reputation", desc: "Public, verifiable record" },
];

const stepY = 1.8;
const stepSpacing = 2.35;

for (let i = 0; i < steps.length; i++) {
  const x = 0.5 + i * stepSpacing;

  // Circle for step number
  slide4.addShape(pres.shapes.OVAL, {
    x: x + 0.35,
    y: stepY,
    w: 0.5,
    h: 0.5,
    fill: { color: colors.gold },
    line: { type: "none" },
  });

  slide4.addText(steps[i].num, {
    x: x + 0.35,
    y: stepY,
    w: 0.5,
    h: 0.5,
    fontSize: 20,
    bold: true,
    color: colors.darkBg,
    fontFace: "Arial",
    align: "center",
    valign: "middle",
  });

  // Step title
  slide4.addText(steps[i].title, {
    x: x,
    y: stepY + 0.7,
    w: 1.9,
    h: 0.4,
    fontSize: 14,
    bold: true,
    color: colors.gold,
    fontFace: "Arial",
    align: "center",
  });

  // Step description
  slide4.addText(steps[i].desc, {
    x: x,
    y: stepY + 1.2,
    w: 1.9,
    h: 0.8,
    fontSize: 11,
    color: colors.lightGrey,
    fontFace: "Arial",
    align: "center",
  });

  // Arrow to next step
  if (i < steps.length - 1) {
    slide4.addShape(pres.shapes.RECTANGLE, {
      x: x + 2.1,
      y: stepY + 0.2,
      w: 0.25,
      h: 0.1,
      fill: { color: colors.gold },
      line: { type: "none" },
    });

    slide4.addText("→", {
      x: x + 2,
      y: stepY - 0.15,
      w: 0.4,
      h: 0.5,
      fontSize: 28,
      color: colors.gold,
      fontFace: "Arial",
      align: "center",
    });
  }
}

// Bottom info
slide4.addText(
  "Result: Verifiable, trustworthy community member profiles with public reputation",
  {
    x: 0.5,
    y: 4.2,
    w: 9,
    h: 0.8,
    fontSize: 13,
    color: colors.lightGrey,
    fontFace: "Arial",
    align: "center",
    italic: true,
  }
);

// Slide 5: Badge System
let slide5 = pres.addSlide();
slide5.background = { color: colors.darkBg };

// Header
slide5.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0,
  w: 10,
  h: 0.8,
  fill: { color: colors.purple },
  line: { type: "none" },
});

slide5.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0.78,
  w: 10,
  h: 0.04,
  fill: { color: colors.gold },
  line: { type: "none" },
});

slide5.addText("Reputation Badges: Building Trust", {
  x: 0.5,
  y: 0.2,
  w: 9,
  h: 0.4,
  fontSize: 32,
  bold: true,
  color: colors.gold,
  fontFace: "Arial",
});

// Badge types with icons represented as colored circles
const badges = [
  { icon: "📍", label: "Attendee", desc: "Attended events" },
  { icon: "🎤", label: "Speaker", desc: "Hosted talks/workshops" },
  { icon: "👨‍💻", label: "Contributor", desc: "Built for community" },
  { icon: "⚡", label: "Donor", desc: "Supported La Crypta" },
  { icon: "✅", label: "Verified", desc: "Identity confirmed" },
  { icon: "🏆", label: "Core Member", desc: "Long-term contributor" },
];

const badgeX = [0.7, 3.5, 6.3];
const badgeY = [1.5, 3.2];

for (let i = 0; i < badges.length; i++) {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = badgeX[col];
  const y = badgeY[row];

  slide5.addShape(pres.shapes.OVAL, {
    x: x,
    y: y,
    w: 0.6,
    h: 0.6,
    fill: { color: colors.gold },
    line: { type: "none" },
  });

  slide5.addText(badges[i].icon, {
    x: x,
    y: y,
    w: 0.6,
    h: 0.6,
    fontSize: 28,
    color: colors.darkBg,
    fontFace: "Arial",
    align: "center",
    valign: "middle",
  });

  slide5.addText(badges[i].label, {
    x: x + 0.8,
    y: y + 0.05,
    w: 2.2,
    h: 0.35,
    fontSize: 13,
    bold: true,
    color: colors.gold,
    fontFace: "Arial",
  });

  slide5.addText(badges[i].desc, {
    x: x + 0.8,
    y: y + 0.4,
    w: 2.2,
    h: 0.25,
    fontSize: 10,
    color: colors.lightGrey,
    fontFace: "Arial",
  });
}

// Slide 6: The Real-World Impact
let slide6 = pres.addSlide();
slide6.background = { color: colors.darkBg };

// Header
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0,
  w: 10,
  h: 0.8,
  fill: { color: colors.purple },
  line: { type: "none" },
});

slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0.78,
  w: 10,
  h: 0.04,
  fill: { color: colors.gold },
  line: { type: "none" },
});

slide6.addText("Real Impact: Spot Fakes & Build Trust", {
  x: 0.5,
  y: 0.2,
  w: 9,
  h: 0.4,
  fontSize: 32,
  bold: true,
  color: colors.gold,
  fontFace: "Arial",
});

// Before/After comparison
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0.5,
  y: 1.2,
  w: 4.3,
  h: 3.8,
  fill: { color: colors.darkGrey },
  line: { color: "#FF6B6B", width: 2 },
  shadow: makeShadow(),
});

slide6.addText("Before: ❌ Uncertainty", {
  x: 0.8,
  y: 1.5,
  w: 3.7,
  h: 0.4,
  fontSize: 16,
  bold: true,
  color: "#FF6B6B",
  fontFace: "Arial",
});

slide6.addText(
  [
    { text: "Can't verify who's real", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    {
      text: "Impersonators go undetected",
      options: { breakLine: true },
    },
    { text: " ", options: { breakLine: true } },
    { text: "Scammers blend in", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    {
      text: "New members trust nobody",
      options: { breakLine: true },
    },
    { text: " ", options: { breakLine: true } },
    { text: "Come empanadas walk free", options: { breakLine: true } },
  ],
  {
    x: 0.8,
    y: 2.1,
    w: 3.7,
    h: 2.7,
    fontSize: 12,
    color: colors.lightGrey,
    fontFace: "Arial",
    valign: "top",
  }
);

// After state
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 5.2,
  y: 1.2,
  w: 4.3,
  h: 3.8,
  fill: { color: colors.darkGrey },
  line: { color: colors.gold, width: 2 },
  shadow: makeShadow(),
});

slide6.addText("After: ✅ Verified Trust", {
  x: 5.5,
  y: 1.5,
  w: 3.7,
  h: 0.4,
  fontSize: 16,
  bold: true,
  color: colors.gold,
  fontFace: "Arial",
});

slide6.addText(
  [
    {
      text: "Verify real identities with NIP-05",
      options: { breakLine: true },
    },
    { text: " ", options: { breakLine: true } },
    {
      text: "See who's a real contributor",
      options: { breakLine: true },
    },
    { text: " ", options: { breakLine: true } },
    {
      text: "Badges show real engagement",
      options: { breakLine: true },
    },
    { text: " ", options: { breakLine: true } },
    {
      text: "New members find trusted mentors",
      options: { breakLine: true },
    },
    { text: " ", options: { breakLine: true } },
    { text: "Come empanadas = 0 badges 🚫", options: { breakLine: true } },
  ],
  {
    x: 5.5,
    y: 2.1,
    w: 3.7,
    h: 2.7,
    fontSize: 12,
    color: colors.lightGrey,
    fontFace: "Arial",
    valign: "top",
  }
);

// Slide 7: Tech Stack
let slide7 = pres.addSlide();
slide7.background = { color: colors.darkBg };

// Header
slide7.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0,
  w: 10,
  h: 0.8,
  fill: { color: colors.purple },
  line: { type: "none" },
});

slide7.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0.78,
  w: 10,
  h: 0.04,
  fill: { color: colors.gold },
  line: { type: "none" },
});

slide7.addText("Built on Battle-Tested Tech", {
  x: 0.5,
  y: 0.2,
  w: 9,
  h: 0.4,
  fontSize: 32,
  bold: true,
  color: colors.gold,
  fontFace: "Arial",
});

// Tech categories
const techCategories = [
  {
    title: "Protocol",
    items: ["NIP-05: DNS Identity", "NIP-58: Badges", "NIP-57: Zaps"],
  },
  {
    title: "Backend",
    items: ["Vercel Functions", "Node.js", "Schnorr Signing"],
  },
  {
    title: "Frontend",
    items: ["React/TypeScript", "Nostr Tools", "Web Crypto API"],
  },
];

let catX = 0.5;

for (let i = 0; i < techCategories.length; i++) {
  const x = catX + i * 3.1;

  slide7.addShape(pres.shapes.RECTANGLE, {
    x: x,
    y: 1.2,
    w: 2.9,
    h: 3.6,
    fill: { color: colors.darkGrey },
    line: { color: colors.lightPurple, width: 2 },
    shadow: makeShadow(),
  });

  slide7.addText(techCategories[i].title, {
    x: x,
    y: 1.5,
    w: 2.9,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: colors.gold,
    fontFace: "Arial",
    align: "center",
  });

  let itemY = 2.1;
  for (let j = 0; j < techCategories[i].items.length; j++) {
    slide7.addText("• " + techCategories[i].items[j], {
      x: x + 0.2,
      y: itemY,
      w: 2.5,
      h: 0.4,
      fontSize: 12,
      color: colors.lightGrey,
      fontFace: "Arial",
    });
    itemY += 0.5;
  }
}

// Slide 8: Timeline & MVP Features
let slide8 = pres.addSlide();
slide8.background = { color: colors.darkBg };

// Header
slide8.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0,
  w: 10,
  h: 0.8,
  fill: { color: colors.purple },
  line: { type: "none" },
});

slide8.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0.78,
  w: 10,
  h: 0.04,
  fill: { color: colors.gold },
  line: { type: "none" },
});

slide8.addText("MVP: What We Build in Hackathon", {
  x: 0.5,
  y: 0.2,
  w: 9,
  h: 0.4,
  fontSize: 32,
  bold: true,
  color: colors.gold,
  fontFace: "Arial",
});

// Timeline phases
const phases = [
  {
    week: "Week 1",
    title: "Foundation",
    items: [
      "Nostr account setup",
      "NIP-05 verification",
      "Database schema",
    ],
  },
  {
    week: "Week 2",
    title: "Badge System",
    items: [
      "Badge creation API",
      "Badge issuing logic",
      "NIP-58 integration",
    ],
  },
  {
    week: "Week 3",
    title: "Frontend & Launch",
    items: ["Profile UI", "Badge display", "Public verification page"],
  },
];

let phaseX = 0.4;
const phaseSpacing = 3.15;

for (let i = 0; i < phases.length; i++) {
  const x = phaseX + i * phaseSpacing;

  slide8.addShape(pres.shapes.RECTANGLE, {
    x: x,
    y: 1.3,
    w: 2.95,
    h: 3.5,
    fill: { color: colors.darkGrey },
    line: { color: colors.gold, width: 2 },
    shadow: makeShadow(),
  });

  slide8.addText(phases[i].week, {
    x: x,
    y: 1.6,
    w: 2.95,
    h: 0.35,
    fontSize: 14,
    bold: true,
    color: colors.gold,
    fontFace: "Arial",
    align: "center",
  });

  slide8.addText(phases[i].title, {
    x: x,
    y: 2.05,
    w: 2.95,
    h: 0.3,
    fontSize: 13,
    color: colors.lightPurple,
    fontFace: "Arial",
    align: "center",
  });

  let itemY = 2.5;
  for (let j = 0; j < phases[i].items.length; j++) {
    slide8.addText("✓ " + phases[i].items[j], {
      x: x + 0.25,
      y: itemY,
      w: 2.45,
      h: 0.5,
      fontSize: 11,
      color: colors.lightGrey,
      fontFace: "Arial",
      valign: "top",
    });
    itemY += 0.6;
  }
}

// Slide 9: Why We'll Win
let slide9 = pres.addSlide();
slide9.background = { color: colors.darkBg };

// Header
slide9.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0,
  w: 10,
  h: 0.8,
  fill: { color: colors.purple },
  line: { type: "none" },
});

slide9.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0.78,
  w: 10,
  h: 0.04,
  fill: { color: colors.gold },
  line: { type: "none" },
});

slide9.addText("Why This Wins: Real Problem, Real Solution", {
  x: 0.5,
  y: 0.2,
  w: 9,
  h: 0.4,
  fontSize: 32,
  bold: true,
  color: colors.gold,
  fontFace: "Arial",
});

const reasons = [
  {
    title: "Solves Real Community Pain",
    desc: "We've experienced the scam problem. This is not theoretical.",
  },
  {
    title: "Built on Open Standards",
    desc: "NIP-05, NIP-58, NIP-57 are proven Nostr protocols.",
  },
  {
    title: "Reuses HDMP Infrastructure",
    desc: "Extends our successful Proof of Attendance system (v3.3).",
  },
  {
    title: "Immediately Useful",
    desc: "La Crypta becomes more trustworthy on Day 1.",
  },
];

let reasonY = 1.3;

for (let i = 0; i < reasons.length; i++) {
  // Number circle
  slide9.addShape(pres.shapes.OVAL, {
    x: 0.6,
    y: reasonY,
    w: 0.45,
    h: 0.45,
    fill: { color: colors.gold },
    line: { type: "none" },
  });

  slide9.addText(String(i + 1), {
    x: 0.6,
    y: reasonY,
    w: 0.45,
    h: 0.45,
    fontSize: 18,
    bold: true,
    color: colors.darkBg,
    fontFace: "Arial",
    align: "center",
    valign: "middle",
  });

  // Title
  slide9.addText(reasons[i].title, {
    x: 1.2,
    y: reasonY,
    w: 8,
    h: 0.3,
    fontSize: 13,
    bold: true,
    color: colors.gold,
    fontFace: "Arial",
  });

  // Description
  slide9.addText(reasons[i].desc, {
    x: 1.2,
    y: reasonY + 0.35,
    w: 8,
    h: 0.4,
    fontSize: 11,
    color: colors.lightGrey,
    fontFace: "Arial",
  });

  reasonY += 0.95;
}

// Slide 10: Call to Action - Closing
let slide10 = pres.addSlide();
slide10.background = { color: colors.darkBg };

// Gradient effect with shapes
slide10.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0,
  w: 10,
  h: 5.625,
  fill: { color: colors.purple },
  line: { type: "none" },
  transparency: 80,
});

slide10.addShape(pres.shapes.RECTANGLE, {
  x: 0,
  y: 0,
  w: 10,
  h: 0.15,
  fill: { color: colors.gold },
  line: { type: "none" },
});

// Main message
slide10.addText("Make La Crypta Trustworthy", {
  x: 0.5,
  y: 1.5,
  w: 9,
  h: 0.8,
  fontSize: 48,
  bold: true,
  color: colors.gold,
  fontFace: "Arial",
  align: "center",
});

slide10.addText("One verifiable identity at a time.", {
  x: 0.5,
  y: 2.4,
  w: 9,
  h: 0.5,
  fontSize: 24,
  color: colors.lightGrey,
  fontFace: "Arial",
  align: "center",
  italic: true,
});

// CTA
slide10.addShape(pres.shapes.RECTANGLE, {
  x: 3,
  y: 3.3,
  w: 4,
  h: 0.6,
  fill: { color: colors.gold },
  line: { type: "none" },
  shadow: makeGoldAccent(),
});

slide10.addText("Build Nostr Identity Hub", {
  x: 3,
  y: 3.3,
  w: 4,
  h: 0.6,
  fontSize: 18,
  bold: true,
  color: colors.darkBg,
  fontFace: "Arial",
  align: "center",
  valign: "middle",
});

// Footer
slide10.addText("Hackathon April 2026 — La Crypta", {
  x: 0.5,
  y: 5.1,
  w: 9,
  h: 0.4,
  fontSize: 14,
  color: colors.lightGrey,
  fontFace: "Arial",
  align: "center",
  italic: true,
});

// Save presentation
pres.writeFile({ fileName: "/sessions/inspiring-loving-curie/mnt/_Clawdio/Hackaton/Nostr-Identity-Hub-Pitch.pptx" });

console.log("✅ Presentation created successfully!");
