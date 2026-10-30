// AToure x Mother Africa Festival, 5th edition proposal.
// Built on the atoure-deck toolkit, following the PFL Africa and AML deck structure:
// cover, where we stand, why now, the answer, delivery, visibility, the report, plan, proof, ask.
//
//   SKILL=<atoure-deck skill dir> NODE_PATH=<work>/node_modules node build.js
// Run prep_images.js on images.json first; see ../README.md.
const path = require("path");
const SKILL = process.env.SKILL;
const WORK = __dirname;
const kit = require(path.join(SKILL, "scripts", "deck_kit.js"));

(async () => {
  const deck = kit.createDeck({
    theme: path.join(WORK, "theme-mother-africa.json"),
    title: "AToure x Mother Africa Festival, 5th Edition Proposal",
    subject: "Talent access, creator management on the ground and the visibility report",
    assetsDir: path.join(WORK, "assets"),
    lang: "en-GB",
  });
  const { pres, C, M, R, CW, W, H } = deck;
  const T = deck.T;

  await deck.icons({
    party: ["LuPartyPopper", "ink"], mic: ["LuMic", "ink"], cal: ["LuCalendarDays", "ink"],
    ticket: ["LuTicket", "ink"], users: ["LuUsers", "ink"], hand: ["LuHandshake", "ink"],
    check: ["LuCircleCheck", "gold"], checkL: ["LuCircleCheck", "label"],
    brief: ["LuClipboardCheck", "ink"], camera: ["LuCamera", "ink"], file: ["LuFileText", "ink"],
    repeat: ["LuRepeat", "ink"], pulse: ["LuActivity", "ink"], clock: ["LuClock", "ink"],
  });
  deck.layouts({ coverTitleW: 7.6, coverTitleSize: 50 });

  const asset = (key) => path.join(WORK, "assets", deck.manifest[key].file);
  const stripes = (s) => s.addImage({ path: asset("stripes"), x: 0, y: 0, w: W, h: H, altText: "", objectName: "Background stripes" });
  // The stripes cover the layout footer, so dark content slides draw it again.
  const stripesFooter = (s) => { stripes(s); deck.photoFooter(s); };
  const mafLogo = (s, dark, x, y, h) => {
    const m = deck.manifest[dark ? "maf_light" : "maf_dark"];
    s.addImage({ path: asset(dark ? "maf_light" : "maf_dark"), x, y, w: h * m.w / m.h, h, altText: "Mother Africa Festival" });
  };
  // AToure x Mother Africa, top right on every content slide, as on the PFL and AML decks.
  const brand = (s, dark) => {
    deck.logo(s, dark ? "dark" : "light", 9.95, 0.33, 1.55);
    T(s, "×", { x: 11.56, y: 0.27, w: 0.36, h: 0.36, fontSize: 16, color: dark ? "gold" : "label", align: "center", valign: "middle" });
    mafLogo(s, dark, R - 0.72, 0.2, 0.51);
  };
  const bullets = (s, items, o) => T(s, items.map((t, i) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: i < items.length - 1 } })),
    Object.assign({ paraSpaceAfter: 6, fontSize: 13, color: "muted" }, o));
  const chipFill = (s, text, x, y, fill, color = "ink") => {
    const w = text.length * 0.085 + 0.4;
    s.addShape(pres.ShapeType.roundRect, { x, y, w, h: 0.32, rectRadius: 0.16, fill: { color: C[fill] }, line: { type: "none" } });
    T(s, text, { x, y, w, h: 0.32, fontSize: 10, bold: true, charSpacing: 1, color, align: "center", valign: "middle" });
  };

  // 1. Cover
  deck.section("Opening");
  let s = deck.cover(
    "Maximising Mother Africa visibility",
    "A proposal for the 5th edition of Mother Africa Festival: talent access, creator management on the ground and one visibility report.\n27 and 28 December 2026, Marcory Zone 4, Abidjan.",
    "Thank the Mother Africa team for the time. This proposal is about one thing: making the visibility that creators bring to the festival provable, so the festival can show it to sponsors. Everything on the next slide comes from the festival’s own posters and press material, so ask the team to correct anything we have wrong.",
    (s) => {
      stripes(s);
      const h = 4.6, w = h * 386 / 518, x = R - w, y = (H - h) / 2;
      s.addShape(pres.ShapeType.rect, { x: x - 0.16, y: y + 0.16, w, h, fill: { type: "none" }, line: { color: C.gold, width: 1.25 } });
      deck.photo(s, "poster2026", { x, y, h, alt: "Mother Africa Festival 2026 poster: Davido, 27 and 28 December, Marcory Zone 4, Abidjan, 5th edition anniversary" });
    });
  T(s, "atoureconsulting.com", { x: M, y: 0.45, w: 4, h: 0.26, fontSize: 10, color: "tint" });
  deck.logo(s, "dark", M, 1.5, 2.6);
  T(s, "×", { x: 3.3, y: 1.38, w: 0.4, h: 0.4, fontSize: 20, color: "gold", align: "center", valign: "middle" });
  mafLogo(s, true, 3.8, 1.1, 0.95);
  deck.line(s, M, 6.3, 1.6, 0, { color: "client", width: 2 });
  T(s, "Prepared by Baba Touré, Director  ·  30.10.2026", { x: M, y: 6.45, w: 7, h: 0.3, fontSize: 12, color: "highlight" });

  // 2. Where we stand
  deck.section("Where we stand");
  s = deck.content("CONTENT_LIGHT", "WHERE WE STAND", "Four editions in, this is already working",
    "Everything on the left comes from the festival’s own posters and press material. Ask the team to correct anything we have wrong. The right side is what any festival needs once it starts selling its audience to sponsors. Present it as the next stage, not as a list of faults.");
  brand(s, false);
  const facts = [
    ["cal", "Four editions", "The 4th edition ran at Marcory Zone 4 on 27 and 28 December 2025."],
    ["mic", "Davido for year five", "Davido headlines the 5th edition, the festival’s anniversary year."],
    ["hand", "Sponsors on board", "Partner brands already back the festival, as the press launch showed."],
    ["ticket", "Tickets sold online", "Sales run online through maf.tikerama.com, ready for tracked links."],
  ];
  facts.forEach(([icon, head, body], i) => {
    const x = M + (i % 2) * 3.5, y = 1.95 + Math.floor(i / 2) * 2.4;
    deck.card(s, x, y, 3.25, 2.15);
    deck.iconCircle(s, icon, x + 0.3, y + 0.3, 0.55, "client");
    T(s, head, { x: x + 0.3, y: y + 0.98, w: 2.65, h: 0.38, fontFace: deck.HEAD, fontSize: 20, color: "ink" });
    T(s, body, { x: x + 0.3, y: y + 1.4, w: 2.65, h: 0.7, fontSize: 13, color: "muted" });
  });
  s.addShape(pres.ShapeType.roundRect, { x: 7.75, y: 1.95, w: 4.98, h: 4.55, rectRadius: 0.1, fill: { color: C.ink }, line: { type: "none" } });
  deck.kicker(s, "WHAT THE 5TH EDITION NEEDS", 8.05, 2.22, 4.4, "gold");
  [
    "Creators chosen for the audiences the festival wants most",
    "Set deliverables and key messages for every creator",
    "A clear view of what each creator posts, and when",
    "Sponsor visibility the festival can prove, partner by partner",
    "Festival numbers: views, audiences, the diaspora, tickets",
  ].forEach((t, i) => {
    const y = 2.72 + i * 0.75;
    deck.icon(s, "check", 8.05, y + 0.02, 0.28);
    T(s, t, { x: 8.5, y, w: 3.95, h: 0.5, fontSize: 14, color: "paper" });
  });

  // 3. Why now
  s = deck.content("CONTENT_DARK", "WHY NOW", "The 5th edition raises the stakes",
    "An anniversary edition with a headliner of Davido’s size is when sponsors pay the most attention, so it is the year to start measuring. The revenue model is simple: more creators bring more visibility, visibility meets sponsor goals, and met goals bring sponsor money back for 2027. AToure supplies the creators and the proof at every step.",
    stripesFooter);
  brand(s, true);
  deck.photo(s, "poster2025", { x: M, y: 1.95, h: 2.85, alt: "Mother Africa Festival 2025 poster: 4th edition, Abidjan, Marcory Zone 4, 27 and 28 December 2025" });
  deck.photo(s, "poster2026", { x: 3.7, y: 1.95, h: 2.85, alt: "Mother Africa Festival 2026 poster: Davido, 5th edition anniversary" });
  T(s, "2025  ·  4th edition", { x: M, y: 4.9, w: 2.85, h: 0.26, fontSize: 12, color: "tint" });
  T(s, "2026  ·  5th edition", { x: 3.7, y: 4.9, w: 2.4, h: 0.26, fontSize: 12, bold: true, color: "highlight" });
  [
    ["party", "Anniversary edition", "Five years of Mother Africa: a milestone the city will want to talk about."],
    ["mic", "Davido headlines", "A global name that pulls attention from across Africa and the diaspora."],
    ["cal", "27 and 28 December", "Two nights at Marcory Zone 4, while the diaspora is home for the holidays."],
  ].forEach(([icon, head, body], i) => {
    const y = 1.95 + i * 1.0;
    deck.iconCircle(s, icon, 6.35, y, 0.6, "client");
    T(s, head, { x: 7.15, y: y - 0.02, w: 5.55, h: 0.4, fontFace: deck.HEAD, fontSize: 22, color: "paper" });
    T(s, body, { x: 7.15, y: y + 0.42, w: 5.55, h: 0.5, fontSize: 14, color: "tint" });
  });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 5.3, w: CW, h: 1.45, rectRadius: 0.1, fill: { color: C.panel }, line: { color: C.gold, width: 0.75, transparency: 55 } });
  deck.kicker(s, "THE REVENUE MODEL", 0.9, 5.55, 3, "gold");
  T(s, "Where the new money comes from", { x: 0.9, y: 5.88, w: 3.0, h: 0.6, fontSize: 13, color: "tint" });
  const chain = [["gold", "More creators"], ["neutral", "More visibility"], ["neutral", "Sponsor goals met"], ["client", "More sponsor money"]];
  chain.forEach(([kind, label], i) => {
    const x = 4.25 + i * 2.19;
    deck.node(s, x, 5.65, 1.7, 0.75, kind, label, 15);
    if (i < chain.length - 1) deck.arrow(s, x + 1.76, 6.025, x + 2.13, 6.025, { color: "gold" });
  });

  // 4. The crowd already films
  s = deck.content("CONTENT_LIGHT", "WHAT WE SEE", "Your audience is already filming",
    "Look at any picture from the festival: phones up everywhere. That content already exists, but it is random and nobody counts it. The proposal is to direct it: choose the creators, tell them what matters, time their posts and measure what they deliver.");
  brand(s, false);
  deck.photo(s, "crowd", { x: M, y: 2.1, w: 5.4, alt: "A crowd holding up their phones to film a performer on stage at night" });
  T(s, "Every phone in the crowd is a camera.", { x: 6.4, y: 2.1, w: 6.3, h: 0.5, fontFace: deck.HEAD, fontSize: 26, color: "ink" });
  T(s, "That content already exists, but nobody directs it and nobody counts it. AToure makes sure the right creators are holding the phones, with a brief, a plan and a way to measure what they deliver.",
    { x: 6.4, y: 2.8, w: 6.1, h: 1.3, fontSize: 16, color: "muted", lineSpacingMultiple: 1.1 });
  s.addShape(pres.ShapeType.rect, { x: 6.4, y: 4.4, w: 0.06, h: 0.75, fill: { color: C.client }, line: { type: "none" } });
  T(s, "Creators produce visibility. AToure makes that visibility provable.", { x: 6.65, y: 4.4, w: 5.9, h: 0.75, fontFace: deck.HEAD, fontSize: 21, color: "label", valign: "middle" });
  [["users", "Choose the creators", "Matched to the audiences the festival wants"], ["brief", "Brief and time every post", "Key messages, tags and the ticket link"], ["file", "Count what they deliver", "One report the festival can show sponsors"]].forEach(([icon, head, body], i) => {
    const x = M + i * 4.145;
    deck.card(s, x, 5.5, 3.84, 1.2);
    deck.iconCircle(s, icon, x + 0.25, 5.8, 0.6, "client");
    T(s, head, { x: x + 1.05, y: 5.72, w: 2.65, h: 0.38, fontFace: deck.HEAD, fontSize: 19, color: "ink" });
    T(s, body, { x: x + 1.05, y: 6.1, w: 2.65, h: 0.5, fontSize: 12, color: "muted" });
  });

  // 5. The answer
  deck.section("The AToure answer");
  s = deck.content("CONTENT_LIGHT", "THE ATOURE ANSWER", "Three layers, one operator",
    "Three layers, run by one team. Talent access brings the right creators. Creator management means AToure runs them on the ground as the operator, not as a middleman. The visibility report turns everything they post into numbers the festival can put in front of sponsors. The report is the product: it is what makes the creator spend provable.");
  brand(s, false);
  [
    ["01", "Talent access", ["Creators matched to the audiences Mother Africa wants", "Music, fashion and lifestyle voices in Abidjan and the diaspora", "DJs and streamers for the headline sets", "VIP invitations organised for talent"]],
    ["02", "Creator management", ["Set deliverables agreed with every creator", "Briefs with key messages, tags and the ticket link", "Accreditation, scheduling and one point of contact", "On site on both nights, in the moments that matter"]],
    ["03", "The visibility report", ["A check at 48 hours, the full report on day 14", "Every post, every platform, in one document", "Audiences, diaspora reach and ticket links", "Sponsor value, partner by partner"]],
  ].forEach(([n, head, items], i) => {
    const x = M + i * 4.145;
    deck.card(s, x, 1.95, 3.84, 3.5);
    s.addShape(pres.ShapeType.rect, { x, y: 1.95, w: 3.84, h: 0.5, fill: { color: C.gold }, line: { type: "none" } });
    T(s, n, { x: x + 0.25, y: 1.95, w: 1, h: 0.5, fontSize: 13, bold: true, charSpacing: 2, color: "ink", valign: "middle" });
    T(s, head, { x: x + 0.25, y: 2.65, w: 3.4, h: 0.45, fontFace: deck.HEAD, fontSize: 22, color: "ink" });
    bullets(s, items, { x: x + 0.25, y: 3.2, w: 3.4, h: 2.15, fontSize: 14 });
  });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 5.7, w: CW, h: 0.8, rectRadius: 0.1, fill: { color: C.ink }, line: { type: "none" } });
  T(s, "Creators produce visibility. AToure makes it provable, so the festival can sell it to sponsors.", { x: 0.9, y: 5.7, w: 11.5, h: 0.8, fontFace: deck.HEAD, fontSize: 19, color: "paper", valign: "middle" });

  // 6. What creators make
  s = deck.content("CONTENT_DARK", "TALENT ACCESS", "What creators make, before, during and after",
    "These are the formats we brief, mapped to when they run. Build up content sells tickets and builds anticipation. Festival night content captures the energy live. Afterglow content keeps the festival in feeds once the gates close. Backstage access is always agreed with the artists’ teams and production first. Each creator gets a tracked ticket link, and a code where the festival supplies one; confirm with Tikerama in week one.",
    stripesFooter);
  brand(s, true);
  [
    ["BUILD UP", "gold", "Reveal reactions", "Creators react to the lineup and the Davido announcement as they drop."],
    ["BUILD UP", "gold", "Ticket links", "A tracked link to maf.tikerama.com for every creator, and a code where the festival supplies one."],
    ["BUILD UP", "gold", "Festival looks", "Get ready with me outfits and styling that tease the nights ahead."],
    ["FESTIVAL NIGHTS", "client", "Crowd POV and stories", "Live stories from the floor during headline sets and key moments."],
    ["FESTIVAL NIGHTS", "client", "Behind the scenes", "Backstage and production moments, where the artists and the team agree."],
    ["AFTERGLOW", "tint", "Recap reels", "Best of edits and “were you there?” posts that keep the story going."],
  ].forEach(([phase, fill, head, body], i) => {
    const x = M + (i % 3) * 4.145, y = 1.95 + Math.floor(i / 3) * 2.45;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 3.84, h: 2.2, rectRadius: 0.1, fill: { color: C.panel }, line: { color: C.gold, width: 0.5, transparency: 70 } });
    chipFill(s, phase, x + 0.3, y + 0.3, fill);
    T(s, head, { x: x + 0.3, y: y + 0.8, w: 3.3, h: 0.4, fontFace: deck.HEAD, fontSize: 20, color: "paper" });
    T(s, body, { x: x + 0.3, y: y + 1.25, w: 3.3, h: 0.8, fontSize: 13, color: "tint" });
  });

  // 7. Creator management
  s = deck.content("CONTENT_LIGHT", "CREATOR MANAGEMENT ON THE GROUND", "AToure runs every creator, end to end",
    "This is the part the festival team never has to touch. AToure scouts and vets, agrees deliverables in writing, briefs, gets every creator accredited for both nights, and checks drafts before they go live. After the festival, every creator is checked against the brief within 48 hours, and analytics are collected by screen recording. One contact at AToure, and a shared tracker the team can look at any time.");
  brand(s, false);
  const steps = [
    ["Scout and vet", "Creators matched to the festival and checked for real audiences."],
    ["Contract", "Deliverables, timing and usage rights agreed in writing."],
    ["Brief", "Key messages, hashtags, the ticket link and sponsor mentions."],
    ["Accredit", "Passes, access zones and arrival times for both nights."],
    ["Check and post", "Drafts checked against the brief, then posted to the calendar."],
  ];
  steps.forEach(([head, body], i) => {
    const x = M + i * 2.495;
    deck.card(s, x, 1.95, 2.15, 2.65);
    deck.numCircle(s, i + 1, x + 0.25, 2.2, 0.5, { fill: "gold", color: "ink", size: 14 });
    T(s, head, { x: x + 0.25, y: 2.9, w: 1.8, h: 0.4, fontFace: deck.HEAD, fontSize: 19, color: "ink" });
    T(s, body, { x: x + 0.25, y: 3.35, w: 1.75, h: 1.1, fontSize: 13, color: "muted" });
    if (i < steps.length - 1) deck.arrow(s, x + 2.2, 2.45, x + 2.45, 2.45, { color: "gold" });
  });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 4.95, w: 6.0, h: 1.8, rectRadius: 0.1, fill: { color: C.ink }, line: { type: "none" } });
  deck.kicker(s, "AFTER THE FESTIVAL", 0.9, 5.15, 5, "gold");
  bullets(s, ["Every creator checked against the brief within 48 hours", "Analytics collected by screen recording, not screenshots", "Anything missing, chased"],
    { x: 0.9, y: 5.5, w: 5.5, h: 1.15, fontSize: 13, color: "paper", paraSpaceAfter: 4 });
  [
    "One point of contact for the festival team",
    "A shared tracker of every creator and every post",
    "Brand safety rules agreed with you before anyone posts",
  ].forEach((t, i) => {
    const y = 5.05 + i * 0.58;
    deck.icon(s, "checkL", 6.95, y + 0.02, 0.3);
    T(s, t, { x: 7.4, y, w: 5.3, h: 0.4, fontSize: 14, color: "ink" });
  });

  // 8. Three waves
  deck.section("Visibility");
  s = deck.content("CONTENT_DARK", "VISIBILITY", "Visibility in three waves",
    "Visibility comes in three waves. The build up runs about five weeks and has one job: sell tickets. The two festival nights are about live reach, making people who are not there wish they were. The afterglow keeps Mother Africa in feeds into January and gives sponsors content to point to. If the festival plans a 2027 announcement, the afterglow is where it lands.",
    stripesFooter);
  brand(s, true);
  deck.line(s, M, 2.15, CW, 0, { color: "gold", width: 1.5 });
  [
    [4.613, "23 NOV TO 26 DEC", "Build up", "Goal: awareness and ticket sales", ["Creator lineup announced", "Davido countdown", "Weekly ticket pushes with tracked links", "A last call before Christmas"], false],
    [3.46, "27 AND 28 DEC", "Festival nights", "Goal: live attention", ["Arrivals and festival looks", "Crowd POV during headline sets", "Sponsor activations in shot", "A recap each night"], true],
    [3.46, "29 DEC TO 10 JAN", "Afterglow", "Goal: keep the story alive", ["Recap reels and best of edits", "Creator thank you posts", "Results shared with fans and partners", "A 2027 save the date, if planned"], false],
  ].reduce((x, [w, dates, head, goal, items, hot]) => {
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.25, y: 2.0, w: 0.3, h: 0.3, fill: { color: hot ? C.client : C.gold }, line: { type: "none" } });
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.5, w, h: 3.25, rectRadius: 0.1, fill: { color: hot ? C.client : C.panel }, line: { type: "none" } });
    deck.kicker(s, dates, x + 0.3, 2.78, w - 0.6, hot ? "ink" : "gold");
    T(s, head, { x: x + 0.3, y: 3.12, w: w - 0.6, h: 0.5, fontFace: deck.HEAD, fontSize: 26, color: hot ? "ink" : "paper" });
    T(s, goal, { x: x + 0.3, y: 3.7, w: w - 0.6, h: 0.35, fontSize: 14, bold: true, color: hot ? "ink" : "highlight" });
    bullets(s, items, { x: x + 0.3, y: 4.2, w: w - 0.6, h: 1.45, fontSize: 13, color: hot ? "ink" : "tint" });
    return x + w + 0.3;
  }, M);
  s.addShape(pres.ShapeType.rect, { x: M, y: 6.05, w: 0.06, h: 0.6, fill: { color: C.gold }, line: { type: "none" } });
  T(s, "Every wave sits in one content calendar, approved by the festival before anything goes live.", { x: 0.85, y: 6.05, w: 11.8, h: 0.6, fontFace: deck.HEAD, fontSize: 20, color: "paper", valign: "middle" });

  // 9. Sponsors
  s = deck.content("CONTENT_LIGHT", "VISIBILITY", "Visibility for every sponsor",
    "Sponsors are paying for visibility, and creators are one of the best ways to deliver it. Sponsor mentions go into every brief, creators are guided to each activation and stage banner on both nights, and every partner gets its own page in the report. That page is what helps the festival renew its sponsors for 2027. Any media value is an estimate and is labelled as one.");
  brand(s, false);
  const pp = deck.photo(s, "press", { x: M, y: 1.95, w: 4.7, alt: "The Mother Africa Festival team at a press event in front of the festival backdrop" });
  deck.chip(s, "Mother Africa Festival press event", M + 0.15, pp.y + pp.h - 0.47);
  T(s, "Sponsors buy proven visibility. The report is how the festival proves it.", { x: M, y: 5.15, w: 4.7, h: 0.9, fontFace: deck.HEAD, fontSize: 20, color: "label" });
  [
    ["brief", "Written into every brief", "Sponsor mentions agreed in advance, so partners appear naturally."],
    ["camera", "Branding in shot", "Creators guided to every activation and stage banner on both nights."],
    ["file", "A page per sponsor in the report", "Posts, views, screen time and a media value, clearly labelled as estimated."],
    ["repeat", "Content the partners can reuse", "The festival and its sponsors can share the best pieces again."],
  ].forEach(([icon, head, body], i) => {
    const y = 1.95 + i * 1.12;
    deck.iconCircle(s, icon, 5.85, y, 0.55, "gold");
    T(s, head, { x: 6.65, y: y - 0.02, w: 6.05, h: 0.38, fontFace: deck.HEAD, fontSize: 20, color: "ink" });
    T(s, body, { x: 6.65, y: y + 0.38, w: 6.05, h: 0.5, fontSize: 14, color: "muted" });
  });

  // 10. Inside the report
  deck.section("The visibility report");
  s = deck.content("CONTENT_LIGHT", "THE VISIBILITY REPORT", "What Mother Africa actually receives",
    "Seven things, and for each one where the number comes from. Creators send their analytics as screen recordings, which is written into their agreement. Ticket clicks come from tracked links; codes only if the festival supplies them, to confirm with Tikerama. Targets for each line are agreed with the festival before the build up starts.");
  brand(s, false);
  deck.table(s,
    [{ text: "What we measure" }, { text: "What it tells the festival" }, { text: "How we capture it" }],
    [
      ["Views and reach", "How far festival content travelled", "Screen recorded analytics from every creator"],
      ["Interactions", "Whether people cared enough to react", "Likes, comments, shares and saves, per post and per creator"],
      ["Audiences", "Who watched, and from where", "Countries, Côte d’Ivoire and diaspora, age and gender"],
      ["Tickets", "Which creators drove ticket sales", "Tracked links to maf.tikerama.com, and codes where supplied"],
      ["Festival accounts", "New followers for Mother Africa", "Account growth through the build up and the nights"],
      ["Conversation", "How much people talk about the festival", "Hashtag and mention tracking"],
      ["Sponsor value", "What each partner received", "On screen moments, screen time, estimated media value"],
    ],
    { x: M, y: 1.95, w: CW, colW: [2.4, 4.0, CW - 6.4], rowH: 0.48, fontSize: 13 });
  T(s, "Every figure comes from creator analytics, tracked links or ticketing data. Anything modelled is labelled estimated.",
    { x: M, y: 6.15, w: CW, h: 0.3, fontSize: 13, italic: true, color: "muted" });

  // 11. Reports on fixed dates
  s = deck.content("CONTENT_DARK", "THE VISIBILITY REPORT", "Reports on fixed dates",
    "Three fixed dates. A one page weekly pulse during the build up, so effort moves to the creators who are working. A check 48 hours after the festival: who posted, where, against which brief. The full report on day 14, by 11 January 2027, as a PDF for the board and sponsors with a web version. The page on the right is a sample layout only; it shows no figures.",
    stripesFooter);
  brand(s, true);
  [
    ["pulse", "Weekly pulse", "EVERY MONDAY IN THE BUILD UP", "One page: posts live, views, top creators, ticket links used and what changes next."],
    ["clock", "48 hour check", "BY 30 DECEMBER 2026", "Who posted, where, and against which brief. Anything missing is chased."],
    ["file", "Full report", "DAY 14, BY 11 JANUARY 2027", "Every post and figure, audiences, tickets, sponsor pages and recommendations for 2027."],
  ].forEach(([icon, head, when, body], i) => {
    const y = 2.0 + i * 1.45;
    deck.iconCircle(s, icon, M, y, 0.65, "gold");
    T(s, head, { x: 1.5, y: y - 0.04, w: 5.5, h: 0.42, fontFace: deck.HEAD, fontSize: 22, color: "paper" });
    deck.kicker(s, when, 1.5, y + 0.42, 5.5, "highlight");
    T(s, body, { x: 1.5, y: y + 0.75, w: 5.6, h: 0.6, fontSize: 14, color: "tint" });
  });
  T(s, "Delivered as a PDF for the board and sponsors, with a web version.", { x: 1.5, y: 6.4, w: 5.6, h: 0.3, fontSize: 12, color: "highlight" });
  // Sample report page, drawn: structure only, no figures.
  const rx = 7.6, ry = 1.95, rw = 5.13;
  s.addShape(pres.ShapeType.roundRect, { x: rx, y: ry, w: rw, h: 4.8, rectRadius: 0.08, fill: { color: C.paper }, line: { type: "none" }, shadow: deck.shadow() });
  T(s, "VISIBILITY REPORT", { x: rx + 0.3, y: ry + 0.25, w: 3, h: 0.22, fontSize: 9, bold: true, charSpacing: 3, color: "label" });
  T(s, "Mother Africa Festival 2026", { x: rx + 0.3, y: ry + 0.47, w: 4, h: 0.4, fontFace: deck.HEAD, fontSize: 18, color: "ink" });
  mafLogo(s, false, rx + rw - 0.85, ry + 0.25, 0.42);
  deck.line(s, rx + 0.3, ry + 0.95, rw - 0.6, 0, { color: "gold", width: 1 });
  ["Total views", "Accounts reached", "Posts checked", "Creators"].forEach((t, i) => {
    const x = rx + 0.3 + (i % 2) * 2.32, y = ry + 1.15 + Math.floor(i / 2) * 0.95;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 2.2, h: 0.8, rectRadius: 0.06, fill: { color: C.canvas }, line: { type: "none" } });
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.18, y: y + 0.16, w: 1.1, h: 0.22, rectRadius: 0.04, fill: { color: C.muted, transparency: 72 }, line: { type: "none" } });
    T(s, t, { x: x + 0.18, y: y + 0.46, w: 1.9, h: 0.22, fontSize: 10, color: "muted" });
  });
  T(s, "VIEWS BY PLATFORM", { x: rx + 0.3, y: ry + 3.1, w: 3, h: 0.22, fontSize: 9, bold: true, charSpacing: 3, color: "label" });
  [["Instagram", 2.9], ["TikTok", 2.2], ["YouTube", 1.1]].forEach(([t, len], i) => {
    const y = ry + 3.42 + i * 0.36;
    T(s, t, { x: rx + 0.3, y, w: 1.1, h: 0.24, fontSize: 10, color: "muted", valign: "middle" });
    s.addShape(pres.ShapeType.roundRect, { x: rx + 1.45, y: y + 0.04, w: len, h: 0.16, rectRadius: 0.03, fill: { color: i === 0 ? C.client : C.gold }, line: { type: "none" } });
  });
  T(s, "Sample layout. No figures shown.", { x: rx + 0.3, y: ry + 4.48, w: 4, h: 0.22, fontSize: 10, italic: true, color: "muted" });

  // 12. The plan
  deck.section("Plan and proof");
  s = deck.content("CONTENT_LIGHT", "HOW IT RUNS", "The plan, week by week",
    "The plan assumes we start on Monday 2 November. Three weeks to scout, vet and contract creators; briefs and the content calendar overlap with the end of that. Build up content runs from 23 November to 26 December, with accreditation in December. Then the two festival nights, the afterglow into January, the 48 hour check on 30 December and the full report on 11 January. Every week we start later shortens the build up, which is where tickets are sold.");
  brand(s, false);
  const TX = 3.6, TW = R - TX, DAY = TW / 77;
  ["2 Nov", "9 Nov", "16 Nov", "23 Nov", "30 Nov", "7 Dec", "14 Dec", "21 Dec", "28 Dec", "4 Jan", "11 Jan"].forEach((t, i) => {
    const x = TX + i * 7 * DAY;
    T(s, t, { x, y: 1.95, w: 7 * DAY, h: 0.26, fontSize: 11, color: "muted" });
    deck.line(s, x, 2.3, 0, 4.2, { color: "muted", width: 0.5, transparency: 75 });
  });
  [
    ["Scout, vet and contract", 0, 19, "ink", "paper", "2 to 20 Nov"],
    ["Briefs and calendar", 14, 12, "ink", "paper", "16 to 27 Nov"],
    ["Build up content", 21, 34, "client", "ink", "23 Nov to 26 Dec"],
    ["Accreditation", 35, 20, "ink", "paper", "7 to 26 Dec"],
    ["Festival nights", 55, 2, "label", "label", "27 and 28 Dec"],
    ["Afterglow content", 57, 13, "client", "ink", "29 Dec to 10 Jan"],
    ["Reporting", 28, 43, "tint", "ink", "Weekly pulse, 48 hour check, full report on 11 Jan"],
  ].forEach(([label, start, days, fill, tc, text], i) => {
    const y = 2.45 + i * 0.6, x = TX + start * DAY, w = days * DAY;
    T(s, label, { x: M, y, w: 2.9, h: 0.4, fontSize: 13, bold: true, color: fill === "label" ? "label" : "ink", valign: "middle" });
    s.addShape(pres.ShapeType.roundRect, { x, y, w, h: 0.4, rectRadius: 0.06, fill: { color: C[fill] }, line: fill === "tint" ? { color: C.muted, width: 0.5, transparency: 60 } : { type: "none" } });
    if (days > 4) T(s, text, { x: x + 0.12, y, w: w - 0.16, h: 0.4, fontSize: 11, color: tc, valign: "middle" });
    else T(s, text, { x: x + w + 0.1, y, w: 1.6, h: 0.4, fontSize: 11, bold: true, color: tc, valign: "middle" });
  });

  // 13. Track record
  s = deck.content("CONTENT_DARK", "WHY ATOURE", "We have built and tracked this before",
    "This is not a new capability. In Abidjan, AToure built the IShowSpeed operation from zero, and ran Race Weekend Abidjan, its own event, with partner brands and Ivorian creators. In Morocco it delivered the AFCON mascot reveal with CAF and the FRMF. The Ashton Hall tour covered five countries end to end. Confirm the Ashton Hall figure before presenting: the decks use 1.57 billion, the website uses the media kit figure.",
    stripesFooter);
  brand(s, true);
  const ph = 2.75, py = 1.95;
  const proof = [
    ["speed_ci", "IShowSpeed in Côte d’Ivoire, Abidjan", "Abidjan", "55.8M", "Instagram views on one reel. IShowSpeed in Côte d’Ivoire."],
    ["speed_ma", "IShowSpeed in Morocco for the AFCON 2025 Final", "Morocco", "16M", "Live stream views of the AFCON mascot reveal, with CAF and the FRMF."],
    ["ashton", "Ashton Hall Africa Tour, Nigeria leg", "Lagos", "1.57B", "Tour views across five countries, managed end to end."],
  ];
  let px = M;
  proof.forEach(([key, alt, place, fig, label]) => {
    const p = deck.photo(s, key, { x: px, y: py, h: ph, alt });
    deck.chip(s, place, px + 0.12, py + ph - 0.44);
    T(s, fig, { x: px, y: 4.85, w: p.w, h: 0.5, fontSize: 28, color: "highlight" });
    T(s, label, { x: px, y: 5.4, w: p.w, h: 0.85, fontSize: 11, color: "tint" });
    px += p.w + 0.3;
  });
  const rwx = px, rww = R - px;
  s.addShape(pres.ShapeType.roundRect, { x: rwx, y: py, w: rww, h: ph, rectRadius: 0.1, fill: { color: C.panel }, line: { color: C.gold, width: 0.75, transparency: 55 } });
  T(s, "RACE WEEKEND ABIDJAN 2026", { x: rwx + 0.25, y: py + 0.3, w: rww - 0.5, h: 0.6, fontSize: 11, bold: true, charSpacing: 3, color: "gold" });
  T(s, "AToure’s own event: the first premium Formula 1 activation staged in Côte d’Ivoire.", { x: rwx + 0.25, y: py + 0.98, w: rww - 0.5, h: 1.6, fontFace: deck.HEAD, fontSize: 18, color: "paper" });
  T(s, "600", { x: rwx, y: 4.85, w: rww, h: 0.5, fontSize: 28, color: "highlight" });
  T(s, "Guests over two days, with 9 partner brands and 7 Ivorian creators booked.", { x: rwx, y: 5.4, w: rww, h: 0.85, fontSize: 11, color: "tint" });
  T(s, "Sources: Instagram and YouTube analytics, tour figures supplied by the client, AToure event records.", { x: M, y: 6.45, w: CW, h: 0.26, fontSize: 10, color: "tint" });

  // 14. The ask
  deck.section("The ask");
  s = deck.content("CLOSING", "THE ASK", "Let us build the 5th edition together",
    "Close here. To be ready for 27 December, the work starts on Monday 2 November. Four steps: confirm the scope and targets this week, approve the shortlist by 13 November, creators signed and briefed by 20 November, build up content live from 23 November. Do not read past this slide: let the ask land, and let the Mother Africa team respond.",
    stripes);
  deck.photo(s, "poster2026", { x: 9.45, y: 0.75, h: 4.4, alt: "Mother Africa Festival 2026 poster: Davido, 27 and 28 December, Marcory Zone 4, Abidjan" });
  [
    ["Confirm the scope and agree the targets", "This week"],
    ["Approve the creator shortlist", "By Friday 13 November"],
    ["Creators signed and briefed", "By Friday 20 November"],
    ["Build up content goes live", "From Monday 23 November"],
  ].forEach(([head, when], i) => {
    const y = 2.35 + i * 0.8;
    deck.numCircle(s, i + 1, M, y, 0.5, { fill: "gold", color: "ink", size: 14 });
    T(s, head, { x: 1.3, y: y - 0.04, w: 6.5, h: 0.36, fontFace: deck.HEAD, fontSize: 20, color: "paper" });
    T(s, when, { x: 1.3, y: y + 0.32, w: 6.5, h: 0.26, fontSize: 12, color: "highlight" });
  });
  deck.line(s, M, 5.75, CW, 0, { color: "gold", width: 1 });
  [
    ["EMAIL", "baba@atoureconsulting.com"],
    ["WHATSAPP", "+44 7456 728616"],
    ["ONLINE", "atoureconsulting.com  ·  @atoure.management"],
  ].forEach(([k, v], i) => {
    const x = M + [0, 3.9, 7.2][i];
    deck.kicker(s, k, x, 5.95, 3, "gold");
    T(s, v, { x, y: 6.25, w: i === 2 ? 5.5 : 3.6, h: 0.3, fontSize: 13, color: "paper" });
  });
  T(s, "Baba Touré, Director. AToure Management & Consulting.", { x: M, y: 6.85, w: 8, h: 0.26, fontSize: 11, color: "tint" });
  deck.logo(s, "dark", R - 2.2, 6.82, 2.2);

  const out = path.join(WORK, "AToure Mother Africa Festival Proposal.pptx");
  await deck.save(out);
  console.log("saved", out);
})().catch((e) => { console.error(e); process.exit(1); });
