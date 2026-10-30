// AToure x Mother Africa Festival, 5th edition proposal.
// Built on the atoure-deck toolkit, following the PFL Africa and AML deck structure:
// cover, where we stand, why now, the answer, delivery, visibility, the report, proof, ask.
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

  // The revenue model, drawn as on the PFL Africa and AML decks.
  const revenueModel = (s, x0, y0, w0, h0) => {
    s.addShape(pres.ShapeType.roundRect, { x: x0, y: y0, w: w0, h: h0, rectRadius: 0.08, fill: { color: C.ink }, line: { color: C.gold, width: 1.75 },
      shadow: { type: "outer", color: deck.HEX.gold, opacity: 0.3, blur: 18, offset: 0, angle: 90 } });
    T(s, "THE REVENUE MODEL", { x: x0 + 0.3, y: y0 + 0.22, w: 3.4, h: 0.4, fontSize: 17, bold: true, charSpacing: 1, color: "gold", valign: "middle" });
    T(s, "WHERE THE NEW MONEY COMES FROM", { x: x0 + 3.0, y: y0 + 0.22, w: w0 - 3.3, h: 0.4, fontSize: 9.5, bold: true, charSpacing: 2, color: "paper", align: "right", valign: "middle" });
    const links = [["More creators", 1], ["More visibility", 1], ["Brand KPIs met", 1], ["Sponsor and investor money", 1.25]];
    const unit = (w0 - 0.6 - 3 * 0.32) / links.reduce((a, [, f]) => a + f, 0);
    links.reduce((x, [label, f], i) => {
      const w = unit * f, last = i === links.length - 1, y = y0 + 0.85;
      s.addShape(pres.ShapeType.roundRect, { x, y, w, h: 0.8, rectRadius: 0.06, fill: { color: last ? C.gold : C.panel },
        line: last ? { type: "none" } : { color: C.tint, width: 0.5, transparency: 75 } });
      T(s, label.toUpperCase(), { x: x + 0.06, y, w: w - 0.12, h: 0.8, fontSize: 11.5, bold: true, color: last ? "ink" : "paper", align: "center", valign: "middle" });
      if (!last) T(s, "→", { x: x + w, y, w: 0.32, h: 0.8, fontSize: 18, color: "gold", align: "center", valign: "middle" });
      return x + w + 0.32;
    }, x0 + 0.3);
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
    "Everything on the left comes from public reporting and the festival’s own announcements, so ask the team to correct anything we have wrong. 15,000 and 40 percent are the figures reported for the first edition in December 2022. 20,000 is what the organisers expect for the 5th edition, not a result. The 1 billion FCFA figure is the festival’s weight as a sponsorship instrument. The right side is what any festival needs once it sells its audience to sponsors: present it as the next stage, not as a list of faults. Sources: Africa Radio, Music In Africa, Abidjan.net, Liferadio, France 24, Pulse and allAfrica.");
  brand(s, false);
  const SW = 7.0, tw2 = (SW - 0.25) / 2;
  [
    ["15,000+", "Festival goers at the first edition, December 2022", false],
    ["40%", "Of them came from other countries, as reported", false],
    ["20,000+", "Expected at the 5th edition, according to the organisers", false],
    ["1B+ FCFA", "Over 1 billion FCFA: the festival as a sponsorship instrument", true],
  ].forEach(([fig, label, money], i) => {
    const x = M + (i % 2) * (tw2 + 0.25), y = 1.95 + Math.floor(i / 2) * 1.38;
    s.addShape(pres.ShapeType.rect, { x, y, w: tw2, h: 1.2, fill: { color: money ? C.ink : C.paper }, line: money ? { type: "none" } : { color: C.muted, width: 0.75, transparency: 72 } });
    s.addShape(pres.ShapeType.rect, { x, y, w: tw2, h: 0.05, fill: { color: money ? C.client : C.gold }, line: { type: "none" } });
    T(s, fig, { x: x + 0.25, y: y + 0.16, w: tw2 - 0.5, h: 0.5, fontSize: 28, bold: true, color: money ? "highlight" : "label" });
    T(s, label, { x: x + 0.25, y: y + 0.7, w: tw2 - 0.45, h: 0.42, fontSize: 12, color: money ? "tint" : "muted" });
  });
  deck.kicker(s, "THE STORY SO FAR", M, 4.78, 4, "label");
  deck.line(s, M, 5.3, SW, 0, { color: "gold", width: 1.5 });
  [
    ["2022", "First edition, 28 to 30 December in Abidjan"],
    ["2023", "2nd edition: Aya Nakamura, Ayra Starr"],
    ["2024", "3rd edition: Dadju and Tayc"],
    ["2025", "4th edition: Gims, Asake. On France 24"],
    ["2026", "5th edition: Davido headlines"],
  ].forEach(([year, body], i) => {
    const x = M + i * (SW / 5), last = i === 4;
    s.addShape(pres.ShapeType.ellipse, { x, y: 5.22, w: 0.16, h: 0.16, fill: { color: last ? C.client : C.gold }, line: { type: "none" } });
    T(s, year, { x, y: 5.45, w: 1.3, h: 0.26, fontSize: 13, bold: true, color: last ? "label" : "ink" });
    T(s, body, { x, y: 5.74, w: 1.3, h: 0.7, fontSize: 10.5, color: "muted" });
  });
  T(s, "Sources: Africa Radio, Music In Africa, Abidjan.net, Liferadio, France 24, Pulse, allAfrica. 20,000+ is the organisers’ expected figure.",
    { x: M, y: 6.55, w: SW, h: 0.3, fontSize: 9.5, italic: true, color: "muted" });
  s.addShape(pres.ShapeType.roundRect, { x: 7.85, y: 1.95, w: R - 7.85, h: 4.65, rectRadius: 0.1, fill: { color: C.ink }, line: { type: "none" } });
  deck.kicker(s, "WHAT THE 5TH EDITION NEEDS", 8.15, 2.22, 4.3, "gold");
  [
    "Creators chosen for the audiences the festival wants most",
    "Set deliverables and key messages for every creator",
    "A clear view of what each creator posts, and when",
    "Sponsor visibility the festival can prove, partner by partner",
    "Festival numbers: views, audiences, the diaspora, tickets",
  ].forEach((t, i) => {
    const y = 2.75 + i * 0.78;
    deck.icon(s, "check", 8.15, y + 0.02, 0.28);
    T(s, t, { x: 8.6, y, w: 3.85, h: 0.5, fontSize: 14, color: "paper" });
  });

  // 3. Why now: the anniversary, the audience already filming, and the revenue model
  s = deck.content("CONTENT_DARK", "WHY NOW", "Set the foundation in the anniversary year",
    "An anniversary edition with a headliner of Davido’s size is when sponsors pay the most attention, so it is the year to start measuring. Look at any picture from the festival: phones up everywhere. That content already exists, but nobody directs it and nobody counts it. The revenue model is the chain at the bottom: more creators bring more visibility, visibility meets the brands’ goals, and met goals bring sponsor and investor money back for 2027. AToure supplies the creators and the proof at every link.",
    stripesFooter);
  brand(s, true);
  const LW = 7.55;
  T(s, "Five editions in, with Davido headlining, sponsors will ask what the Mother Africa audience is worth. Every number the festival produces now builds that case.",
    { x: M, y: 1.95, w: LW, h: 0.75, fontSize: 15, color: "tint", lineSpacingMultiple: 1.1 });
  [
    ["5th", "ANNIVERSARY EDITION", "gold", "highlight"],
    ["2 nights", "27 AND 28 DECEMBER, MARCORY ZONE 4", "gold", "highlight"],
    ["Davido", "HEADLINER, FOLLOWED ACROSS AFRICA AND THE DIASPORA", "client", "client"],
  ].forEach(([fig, label, bar, figColor], i) => {
    const tw = (LW - 0.4) / 3, x = M + i * (tw + 0.2), y = 2.9;
    s.addShape(pres.ShapeType.rect, { x, y, w: tw, h: 1.3, fill: { color: C.panel }, line: { type: "none" } });
    s.addShape(pres.ShapeType.rect, { x, y, w: tw, h: 0.05, fill: { color: C[bar] }, line: { type: "none" } });
    T(s, fig, { x: x + 0.2, y: y + 0.18, w: tw - 0.4, h: 0.5, fontSize: 28, bold: true, color: figColor });
    T(s, label, { x: x + 0.2, y: y + 0.72, w: tw - 0.35, h: 0.5, fontSize: 9.5, bold: true, charSpacing: 1, color: "tint" });
  });
  revenueModel(s, M, 4.45, LW, 1.9);
  // The audience is already filming.
  const ax = 8.45, aw = R - ax;
  s.addShape(pres.ShapeType.rect, { x: ax, y: 1.95, w: aw, h: 4.4, fill: { color: C.panel }, line: { type: "none" } });
  s.addShape(pres.ShapeType.rect, { x: ax, y: 1.95, w: aw, h: 0.06, fill: { color: C.gold }, line: { type: "none" } });
  deck.photo(s, "crowd", { x: ax + 0.25, y: 2.25, w: aw - 0.5, alt: "A crowd holding up their phones to film a performer on stage at night" });
  T(s, "Your audience is already filming", { x: ax + 0.25, y: 4.5, w: aw - 0.5, h: 0.8, fontFace: deck.HEAD, fontSize: 22, color: "paper" });
  T(s, "Every phone in the crowd is a camera. AToure makes sure the right creators are holding them, and counts what they deliver.",
    { x: ax + 0.25, y: 5.38, w: aw - 0.5, h: 0.85, fontSize: 13, color: "tint" });

  // 4. The answer
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

  // 5. Creator management
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
    deck.card(s, x, 1.95, 2.15, 2.95);
    deck.numCircle(s, i + 1, x + 0.25, 2.2, 0.5, { fill: "gold", color: "ink", size: 14 });
    T(s, head, { x: x + 0.25, y: 2.9, w: 1.8, h: 0.4, fontFace: deck.HEAD, fontSize: 19, color: "ink" });
    T(s, body, { x: x + 0.25, y: 3.35, w: 1.75, h: 1.0, fontSize: 13, color: "muted" });
    T(s, "and more…", { x: x + 0.25, y: 4.45, w: 1.75, h: 0.28, fontSize: 13, italic: true, bold: true, color: "label" });
    if (i < steps.length - 1) deck.arrow(s, x + 2.2, 2.45, x + 2.45, 2.45, { color: "gold" });
  });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 5.15, w: 6.0, h: 1.6, rectRadius: 0.1, fill: { color: C.ink }, line: { type: "none" } });
  deck.kicker(s, "AFTER THE FESTIVAL", 0.9, 5.3, 5, "gold");
  bullets(s, ["Every creator checked against the brief within 48 hours", "Analytics collected by screen recording, not screenshots"],
    { x: 0.9, y: 5.62, w: 5.5, h: 0.6, fontSize: 13, color: "paper", paraSpaceAfter: 4 });
  T(s, "and more…", { x: 0.9, y: 6.3, w: 3, h: 0.28, fontSize: 13, italic: true, bold: true, color: "gold" });
  [
    "One point of contact for the festival team",
    "A shared tracker of every creator and every post",
    "Brand safety rules agreed with you before anyone posts",
  ].forEach((t, i) => {
    const y = 5.25 + i * 0.52;
    deck.icon(s, "checkL", 6.95, y + 0.02, 0.3);
    T(s, t, { x: 7.4, y, w: 5.3, h: 0.4, fontSize: 14, color: "ink" });
  });

  // 6. Three waves
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

  // 7. Sponsors
  s = deck.content("CONTENT_LIGHT", "VISIBILITY", "Visibility for every sponsor",
    "Sponsors are paying for visibility, and creators are one of the best ways to deliver it. Sponsor mentions go into every brief, creators are guided to each activation and stage banner on both nights, and every partner gets its own page in the report. The revenue model is the same chain as before, seen from the sponsor’s side: more creators bring more visibility, visibility meets the brands’ goals, and met goals bring sponsor money back for 2027. Any media value is an estimate and is labelled as one.");
  brand(s, false);
  const pp = deck.photo(s, "press", { x: M, y: 1.95, w: 4.0, alt: "The Mother Africa Festival team at a press event in front of the festival backdrop" });
  deck.chip(s, "Mother Africa Festival press event", M + 0.12, pp.y + pp.h - 0.44);
  [
    ["brief", "Written into every brief", "Sponsor mentions agreed in advance, so partners appear naturally."],
    ["camera", "Branding in shot", "Creators guided to every activation and stage banner on both nights."],
    ["file", "A page per sponsor", "Posts, views, screen time and a media value, clearly labelled as estimated."],
    ["repeat", "Reusable content", "The festival and its sponsors can share the best pieces again."],
  ].forEach(([icon, head, body], i) => {
    const x = 4.95 + (i % 2) * 3.94, y = 1.95 + Math.floor(i / 2) * 1.3;
    deck.iconCircle(s, icon, x, y, 0.5, "gold");
    T(s, head, { x: x + 0.65, y: y - 0.03, w: 3.1, h: 0.36, fontFace: deck.HEAD, fontSize: 18, color: "ink" });
    T(s, body, { x: x + 0.65, y: y + 0.36, w: 3.1, h: 0.75, fontSize: 12.5, color: "muted" });
  });
  revenueModel(s, M, 4.75, CW, 1.9);

  // 8. Inside the report
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

  // 9. Reports on fixed dates
  s = deck.content("CONTENT_LIGHT", "THE VISIBILITY REPORT", "Reports on fixed dates",
    "Three fixed dates. A one page weekly pulse during the build up, so effort moves to the creators who are working. A check 48 hours after the festival: who posted, where, against which brief. The full report on day 14, by 11 January 2027, as a PDF for the board and sponsors with a web version. The page on the right is a sample layout only; it shows no figures.",
    undefined);
  brand(s, false);
  [
    ["pulse", "Weekly pulse", "EVERY MONDAY IN THE BUILD UP", "One page: posts live, views, top creators, ticket links used and what changes next."],
    ["clock", "48 hour check", "BY 30 DECEMBER 2026", "Who posted, where, and against which brief. Anything missing is chased."],
    ["file", "Full report", "DAY 14, BY 11 JANUARY 2027", "Every post and figure, audiences, tickets, sponsor pages and recommendations for 2027."],
  ].forEach(([icon, head, when, body], i) => {
    const y = 2.0 + i * 1.45;
    deck.iconCircle(s, icon, M, y, 0.65, "gold");
    T(s, head, { x: 1.5, y: y - 0.04, w: 5.5, h: 0.42, fontFace: deck.HEAD, fontSize: 22, color: "ink" });
    deck.kicker(s, when, 1.5, y + 0.42, 5.5, "label");
    T(s, body, { x: 1.5, y: y + 0.75, w: 5.6, h: 0.6, fontSize: 14, color: "muted" });
  });
  T(s, "Delivered as a PDF for the board and sponsors, with a web version.", { x: 1.5, y: 6.4, w: 5.6, h: 0.3, fontSize: 12, color: "label" });
  // Sample report page, drawn: structure only, no figures.
  const rx = 7.6, ry = 1.95, rw = 5.13;
  s.addShape(pres.ShapeType.roundRect, { x: rx, y: ry, w: rw, h: 4.8, rectRadius: 0.08, fill: { color: C.paper }, line: { color: C.muted, width: 0.75, transparency: 72 }, shadow: deck.shadow() });
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

  deck.section("Proof");
  // 10. Track record
  s = deck.content("CONTENT_DARK", "WHY ATOURE", "We have built and tracked this before",
    "This is not a new capability. In Abidjan, AToure built the IShowSpeed operation from zero. In Morocco it delivered the AFCON mascot reveal with CAF and the Royal Moroccan Football Federation. The Ashton Hall tour covered five countries, managed end to end.",
    stripesFooter);
  brand(s, true);
  const ph = 3.0, py = 1.95;
  const proof = [
    ["speed_ci", "IShowSpeed in Côte d’Ivoire, Abidjan", "Abidjan", "55.8M", "Instagram views on one reel. IShowSpeed in Côte d’Ivoire."],
    ["speed_ma", "IShowSpeed in Morocco for the AFCON 2025 Final", "Morocco", "16M", "Live stream views of the AFCON mascot reveal, with CAF and the FRMF."],
    ["ashton", "Ashton Hall Africa Tour, Nigeria leg", "Lagos", "1.57B", "Tour views across five countries, managed end to end."],
  ];
  let px = M;
  proof.forEach(([key, alt, place, fig, label]) => {
    const p = deck.photo(s, key, { x: px, y: py, h: ph, alt });
    deck.chip(s, place, px + 0.12, py + ph - 0.44);
    T(s, fig, { x: px, y: 5.1, w: p.w, h: 0.5, fontSize: 28, color: "highlight" });
    T(s, label, { x: px, y: 5.62, w: p.w, h: 0.75, fontSize: 11, color: "tint" });
    px += p.w + 0.3;
  });
  const dx = px + 0.05, dw = R - dx;
  s.addShape(pres.ShapeType.roundRect, { x: dx, y: py, w: dw, h: ph, rectRadius: 0.1, fill: { color: C.panel }, line: { color: C.gold, width: 0.75, transparency: 55 } });
  deck.kicker(s, "WHAT ATOURE DID", dx + 0.22, py + 0.25, dw - 0.4, "gold");
  bullets(s, ["Operations built from zero in Abidjan", "State visas, permits and security", "Sponsors and partners brought in", "Creators managed end to end"],
    { x: dx + 0.22, y: py + 0.7, w: dw - 0.4, h: 2.15, fontSize: 12, color: "tint", paraSpaceAfter: 8 });
  T(s, "Sources: Instagram and YouTube analytics, tour figures supplied by the client.", { x: M, y: 6.5, w: CW, h: 0.26, fontSize: 10, color: "tint" });

  // 11. The ask
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
