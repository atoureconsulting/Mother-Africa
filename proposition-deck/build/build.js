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
    badge: ["LuBadgeCheck", "ink"], mega: ["LuMegaphone", "ink"],
  });
  deck.layouts({ coverTitleW: 5.3, coverTitleSize: 46 });

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

  // 1. Cover: full bleed illustration, long soft fade under the title column
  deck.section("Opening");
  let s = deck.cover(
    "Maximising Mother Africa Visibility",
    null,
    "Thank the Mother Africa team for the time. This proposal is about one thing: making the visibility that creators bring to the festival provable, so the festival can show it to sponsors. Everything on the next slide comes from the festival’s own posters and press material, so ask the team to correct anything we have wrong. The pictures on the cover and on slides 5, 6 and 9 are illustrations, not photographs of the festival.",
    (s) => {
      const cw0 = W, ch0 = cw0 * deck.manifest.ai_phone.h / deck.manifest.ai_phone.w;
      deck.photo(s, "ai_phone", { x: 0, y: (H - ch0) / 2, w: cw0, alt: "Illustration: a festival goer films the stage on her phone, among a crowd of raised phones" });
      deck.fadeImage(s, "ltr", 0, 0, 7.6, H, { power: 0.75 });
      deck.fadeImage(s, "btt", 0, H - 2.2, W, 2.2, { power: 1.2, max: 0.7 });
    });
  T(s, "atoureconsulting.com", { x: M, y: 0.45, w: 4, h: 0.26, fontSize: 10, color: "tint" });
  deck.logo(s, "dark", M, 1.5, 2.6);
  T(s, "×", { x: 3.3, y: 1.38, w: 0.4, h: 0.4, fontSize: 20, color: "gold", align: "center", valign: "middle" });
  mafLogo(s, true, 3.8, 1.1, 0.95);
  T(s, "A proposal for the 5th edition of Mother Africa Festival: talent access, creator management on the ground and one visibility report.",
    { x: M, y: 4.62, w: 4.9, h: 0.95, fontSize: 15, color: "paper", lineSpacingMultiple: 1.15 });
  deck.line(s, M, 6.3, 1.6, 0, { color: "client", width: 2 });
  T(s, "Prepared by Baba Touré, Director  ·  30.10.2026", { x: M, y: 6.45, w: 7, h: 0.3, fontSize: 12, color: "highlight" });

  // 2. Where we stand
  deck.section("Where we stand");
  s = deck.content("CONTENT_LIGHT", "WHERE WE STAND", "4 editions in, the business model is already working",
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

  // 4. Who gives what: the festival's colour for what it provides, gold for what AToure delivers
  deck.section("The AToure answer");
  s = deck.content("CONTENT_LIGHT", "THE ATOURE ANSWER", "Mother Africa gives access. AToure does the rest",
    "Two columns: what the festival provides, in orange, and what AToure delivers, in gold. The festival’s side is small on purpose: access for the creators, its brand guidelines and key messages, the ticket links, and one contact on production. Everything else is AToure’s: the creators, running them on the ground as the operator, and the report that makes the visibility provable.");
  brand(s, false);
  const colW2 = (CW - 0.33) / 2, gx = M + colW2 + 0.33;
  [[M, "client", "FCE9DA", "WHAT MOTHER AFRICA PROVIDES"], [gx, "gold", "F7F1E0", "WHAT ATOURE DELIVERS"]].forEach(([x, role, tint, head]) => {
    s.addShape(pres.ShapeType.rect, { x, y: 1.95, w: colW2, h: 3.55, fill: { color: tint }, line: { type: "none" } });
    s.addShape(pres.ShapeType.rect, { x, y: 1.95, w: colW2, h: 0.5, fill: { color: C[role] }, line: { type: "none" } });
    T(s, head, { x: x + 0.3, y: 1.95, w: colW2 - 0.5, h: 0.5, fontSize: 12, bold: true, charSpacing: 2, color: "ink", valign: "middle" });
  });
  [
    ["badge", "Accreditation and access zones for the creators"],
    ["mega", "Brand guidelines and the key messages"],
    ["ticket", "Ticket links, and codes if the festival wants them"],
    ["users", "One contact on the production team"],
  ].forEach(([icon, t], i) => {
    const y = 2.68 + i * 0.7;
    deck.iconCircle(s, icon, M + 0.3, y, 0.48, "client");
    T(s, t, { x: M + 0.95, y, w: colW2 - 1.2, h: 0.48, fontSize: 14, color: "ink", valign: "middle" });
  });
  [
    ["Talent access", "Creators matched to the audiences Mother Africa wants"],
    ["Creator management on the ground", "Briefs, accreditation, approvals and one point of contact"],
    ["The visibility report", "A check at 48 hours, the full report on day 14"],
  ].forEach(([head, line], i) => {
    const y = 2.68 + i * 0.92;
    deck.numCircle(s, i + 1, gx + 0.3, y, 0.48, { fill: "gold", color: "ink", size: 13 });
    T(s, head, { x: gx + 0.95, y: y - 0.05, w: colW2 - 1.2, h: 0.38, fontFace: deck.HEAD, fontSize: 18, color: "ink" });
    T(s, line, { x: gx + 0.95, y: y + 0.33, w: colW2 - 1.2, h: 0.34, fontSize: 13, color: "muted" });
  });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 5.75, w: CW, h: 0.8, rectRadius: 0.1, fill: { color: C.ink }, line: { type: "none" } });
  T(s, "Creators produce visibility. AToure makes it provable, so the festival can sell it to sponsors.", { x: 0.9, y: 5.75, w: 11.5, h: 0.8, fontFace: deck.HEAD, fontSize: 19, color: "paper", valign: "middle" });

  // 5. Creator management
  s = deck.content("CONTENT_LIGHT", "CREATOR MANAGEMENT ON THE GROUND", "AToure runs every creator, end to end",
    "This is the part the festival team never has to touch. AToure scouts and vets, agrees deliverables in writing, briefs, gets every creator accredited for both nights, and checks drafts before they go live. After the festival, every creator is checked against the brief within 48 hours, and analytics are collected by screen recording. One contact at AToure, and a shared tracker the team can look at any time.");
  brand(s, false);
  const steps = [
    ["Scout and vet", "Creators matched to the festival and checked for real audiences."],
    ["Contract", "Deliverables, timing and usage rights agreed in writing."],
    ["Brief", "Key messages, hashtags, the ticket link and sponsor mentions."],
    ["Accreditation", "Passes, access zones and arrival times for both nights."],
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
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 5.15, w: 5.0, h: 1.6, rectRadius: 0.1, fill: { color: C.ink }, line: { type: "none" } });
  deck.kicker(s, "AFTER THE FESTIVAL", 0.9, 5.3, 4.4, "gold");
  bullets(s, ["Every creator checked against the brief in 48 hours", "Analytics collected by screen recording"],
    { x: 0.9, y: 5.62, w: 4.55, h: 0.6, fontSize: 12, color: "paper", paraSpaceAfter: 4 });
  T(s, "and more…", { x: 0.9, y: 6.3, w: 3, h: 0.28, fontSize: 13, italic: true, bold: true, color: "gold" });
  const bp = deck.photo(s, "ai_briefing", { x: M + 5.3, y: 5.15, h: 1.6, alt: "Illustration: a production manager briefs creators with a tablet backstage before the doors open" });
  const ax3 = bp.x + bp.w + 0.3;
  [
    "One point of contact for the festival team",
    "A shared tracker of every creator and every post",
    "Brand safety rules agreed with you before anyone posts",
  ].forEach((t, i) => {
    const y = 5.15 + i * 0.55;
    deck.icon(s, "checkL", ax3, y + 0.02, 0.28);
    T(s, t, { x: ax3 + 0.4, y, w: R - ax3 - 0.4, h: 0.48, fontSize: 12.5, color: "ink" });
  });

  // 6. Three waves
  deck.section("Visibility");
  s = deck.content("CONTENT_DARK", "VISIBILITY", "Visibility builds in three waves",
    "Visibility comes in three waves. The build up runs about five weeks and has one job: sell tickets. The two festival nights are about live reach, making people who are not there wish they were. The afterglow keeps Mother Africa in feeds into January and gives sponsors content to point to. If the festival plans a 2027 announcement, the afterglow is where it lands. Every wave sits in one content calendar, approved by the festival before anything goes live. The pictures are illustrations.",
    stripesFooter);
  brand(s, true);
  deck.line(s, M, 2.15, CW, 0, { color: "gold", width: 1.5 });
  [
    [4.613, "ai_grwm", "Illustration: a creator records a get ready with me video before the festival", "23 NOV TO 26 DEC", "Build up", "Goal: awareness and ticket sales", ["Creator lineup announced", "Davido countdown", "Weekly ticket pushes with tracked links", "A last call before Christmas"], false],
    [3.46, "ai_floor", "Illustration: a creator films himself on a gimbal in the festival crowd", "27 AND 28 DEC", "Festival nights", "Goal: live attention", ["Arrivals and festival looks", "Crowd POV during headline sets", "Sponsor activations in shot", "A recap each night"], true],
    [3.46, "ai_afterglow", "Illustration: a creator edits a recap reel on a balcony the morning after", "29 DEC TO 10 JAN", "Afterglow", "Goal: keep the story alive", ["Recap reels and best of edits", "Creator thank you posts", "Results shared with partners", "A 2027 save the date"], false],
  ].reduce((x, [w, pic, alt, dates, head, goal, items, hot]) => {
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.25, y: 2.0, w: 0.3, h: 0.3, fill: { color: hot ? C.client : C.gold }, line: { type: "none" } });
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.45, w, h: 4.3, rectRadius: 0.1, fill: { color: hot ? C.client : C.panel }, line: { type: "none" } });
    deck.photo(s, pic, { x: x + 0.3, y: 2.72, h: 1.3, alt });
    deck.kicker(s, dates, x + 0.3, 4.18, w - 0.6, hot ? "ink" : "gold");
    T(s, head, { x: x + 0.3, y: 4.45, w: w - 0.6, h: 0.45, fontFace: deck.HEAD, fontSize: 24, color: hot ? "ink" : "paper" });
    T(s, goal, { x: x + 0.3, y: 4.95, w: w - 0.6, h: 0.32, fontSize: 13, bold: true, color: hot ? "ink" : "highlight" });
    bullets(s, items, { x: x + 0.3, y: 5.35, w: w - 0.6, h: 1.3, fontSize: 12.5, color: hot ? "ink" : "tint", paraSpaceAfter: 4 });
    return x + w + 0.3;
  }, M);

  // 7. Sponsors
  s = deck.content("CONTENT_LIGHT", "VISIBILITY", "Every sponsor gets visibility it can prove",
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

  // 8. Reports on fixed dates
  deck.section("The visibility report");
  s = deck.content("CONTENT_LIGHT", "THE VISIBILITY REPORT", "Mother Africa gets the numbers on fixed dates",
    "Three fixed points. Every creator post from the build up is tracked as it goes live, so the report covers the weeks before the festival, not only the two nights. A check 48 hours after the festival: who posted, where, against which brief. The full report on day 14, by 11 January 2027, as a PDF for the board and sponsors with a web version. The page on the right is a sample layout: its figures are illustrative, to show the format, and are not a forecast for the festival.",
    undefined);
  brand(s, false);
  [
    ["pulse", "Tracked from the first post", "BEFORE THE FESTIVAL", "Every creator post in the build up is logged and tracked, so the report covers the weeks before the event too."],
    ["clock", "48 hour check", "BY 30 DECEMBER 2026", "Who posted, where, and against which brief. Anything missing is chased."],
    ["file", "Full report", "DAY 14, BY 11 JANUARY 2027", "Every post and figure, audiences, tickets and sponsor pages, as a PDF with a web version."],
  ].forEach(([icon, head, when, body], i) => {
    const y = 2.0 + i * 1.35;
    deck.iconCircle(s, icon, M, y, 0.65, "gold");
    T(s, head, { x: 1.5, y: y - 0.04, w: 5.5, h: 0.42, fontFace: deck.HEAD, fontSize: 22, color: "ink" });
    deck.kicker(s, when, 1.5, y + 0.42, 5.5, "label");
    T(s, body, { x: 1.5, y: y + 0.75, w: 5.6, h: 0.6, fontSize: 14, color: "muted" });
  });
  T(s, "The full report runs to several pages: every creator, every post, audiences and a page per sponsor.",
    { x: 1.5, y: 6.12, w: 5.6, h: 0.5, fontSize: 12, bold: true, color: "label" });
  // Sample report page, drawn with illustrative figures. The sample label sits above it in a box,
  // so nobody reads the figures as a forecast.
  const rx = 7.45, rw = 5.13;
  s.addShape(pres.ShapeType.roundRect, { x: rx, y: 1.9, w: rw, h: 0.4, rectRadius: 0.06, fill: { color: C.client }, line: { type: "none" } });
  T(s, "SAMPLE LAYOUT  ·  FIGURES ARE ILLUSTRATIVE", { x: rx, y: 1.9, w: rw, h: 0.4, fontSize: 10, bold: true, charSpacing: 1, color: "ink", align: "center", valign: "middle" });
  const ry = 2.42, rh = 4.3;
  s.addShape(pres.ShapeType.roundRect, { x: rx + 0.12, y: ry + 0.12, w: rw, h: rh, rectRadius: 0.08, fill: { color: C.paper }, line: { color: C.muted, width: 0.75, transparency: 60 }, objectName: "Sample report page 2" });
  s.addShape(pres.ShapeType.roundRect, { x: rx, y: ry, w: rw, h: rh, rectRadius: 0.08, fill: { color: C.paper }, line: { color: C.muted, width: 0.75, transparency: 72 }, shadow: deck.shadow() });
  T(s, "VISIBILITY REPORT  ·  PAGE 1", { x: rx + 0.3, y: ry + 0.22, w: 3.6, h: 0.22, fontSize: 9, bold: true, charSpacing: 3, color: "label" });
  T(s, "Mother Africa Festival 2026", { x: rx + 0.3, y: ry + 0.42, w: 4, h: 0.4, fontFace: deck.HEAD, fontSize: 18, color: "ink" });
  mafLogo(s, false, rx + rw - 0.85, ry + 0.2, 0.42);
  deck.line(s, rx + 0.3, ry + 0.88, rw - 0.6, 0, { color: "gold", width: 1 });
  [["3,200,000", "Total views"], ["1,450,000", "Accounts reached"], ["64", "Posts checked against the brief"], ["18", "Creators"]].forEach(([v, t], i) => {
    const x = rx + 0.3 + (i % 2) * 2.32, y = ry + 1.02 + Math.floor(i / 2) * 0.88;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 2.2, h: 0.78, rectRadius: 0.06, fill: { color: C.canvas }, line: { type: "none" } });
    T(s, v, { x: x + 0.18, y: y + 0.07, w: 1.9, h: 0.38, fontSize: 18, bold: true, color: "ink" });
    T(s, t, { x: x + 0.18, y: y + 0.46, w: 1.95, h: 0.22, fontSize: 10, color: "muted" });
  });
  T(s, "VIEWS BY PLATFORM", { x: rx + 0.3, y: ry + 2.86, w: 3, h: 0.22, fontSize: 9, bold: true, charSpacing: 3, color: "label" });
  [["Instagram", 52], ["TikTok", 38], ["YouTube", 10]].forEach(([t, pct], i) => {
    const y = ry + 3.16 + i * 0.32, len = 2.7 * pct / 52;
    T(s, t, { x: rx + 0.3, y, w: 1.1, h: 0.24, fontSize: 10, color: "muted", valign: "middle" });
    s.addShape(pres.ShapeType.roundRect, { x: rx + 1.45, y: y + 0.04, w: len, h: 0.16, rectRadius: 0.03, fill: { color: i === 0 ? C.client : C.gold }, line: { type: "none" } });
    T(s, pct + "%", { x: rx + 1.55 + len, y, w: 0.6, h: 0.24, fontSize: 10, bold: true, color: "ink", valign: "middle" });
  });

  // 9. The proposal: one line, no prices
  deck.section("The proposal");
  s = deck.content("CONTENT_LIGHT", "THE PROPOSAL", "A trial at the 5th edition. One full report",
    "This is a trial, not a long term ask. If the festival already works with creators, they stay: AToure manages them on the ground with any new ones, puts every creator on a contract with deliverables for the event, tracks every post from the build up and delivers one full report on a fixed date. The trial is what earns the conversation about 2027. There is no price on this slide on purpose: scope and fees are agreed once the festival says yes.");
  brand(s, false);
  T(s, "AToure works with the creators Mother Africa already has, adds the ones it needs, and delivers a full visibility report built for sponsors and partners.",
    { x: M, y: 1.95, w: 7.1, h: 0.8, fontSize: 15, color: "muted", lineSpacingMultiple: 1.1 });
  [
    ["CREATORS ALREADY ON BOARD", "gold", "Creators the festival has already activated stay. AToure manages them on the ground, alongside any new ones."],
    ["A CONTRACT WITH DELIVERABLES", "gold", "Every creator on a contract for the event: posts, platforms, timing and the ticket link, agreed in writing."],
    ["THE REPORT", "client", "Every post tracked from the build up, a check at 48 hours and the full report on day 14."],
  ].forEach(([k, role, body], i) => {
    const y = 2.85 + i * 1.18;
    s.addShape(pres.ShapeType.rect, { x: M, y, w: 7.1, h: 0.38, fill: { color: C[role] }, line: { type: "none" } });
    T(s, k, { x: M + 0.25, y, w: 6.6, h: 0.38, fontSize: 11.5, bold: true, charSpacing: 3, color: "ink", valign: "middle" });
    s.addShape(pres.ShapeType.rect, { x: M, y: y + 0.38, w: 7.1, h: 0.68, fill: { color: C.paper }, line: { color: C.muted, width: 0.75, transparency: 72 } });
    T(s, body, { x: M + 0.25, y: y + 0.45, w: 6.6, h: 0.56, fontSize: 14, color: "ink" });
  });
  T(s, "A trial, not a long term commitment.", { x: M, y: 6.4, w: 7.1, h: 0.42, fontFace: deck.HEAD, fontSize: 19, color: "label" });
  const kx = 8.15, kw = R - kx;
  const pass = deck.photo(s, "ai_pass", { x: kx, y: 1.95, w: kw, alt: "Illustration: a Mother Africa Festival creator accreditation pass on a lanyard" });
  const sy = pass.y + pass.h + 0.15, sh = 6.6 - sy;
  s.addShape(pres.ShapeType.roundRect, { x: kx, y: sy, w: kw, h: sh, rectRadius: 0.08, fill: { color: C.ink }, line: { type: "none" } });
  mafLogo(s, true, kx + 0.3, sy + (sh - 0.62) / 2, 0.62);
  T(s, "×", { x: kx + 1.25, y: sy, w: 0.4, h: sh, fontSize: 20, color: "gold", align: "center", valign: "middle" });
  deck.logo(s, "dark", kx + 1.8, sy + (sh - 0.4) / 2, 2.5);

  deck.section("Proof");
  // 10. Track record, laid out as on the PFL Africa deck: three equal cards naming the event,
  // the figure and what AToure did. The photos are cut to one shape in images.json, subjects kept in frame.
  s = deck.content("CONTENT_DARK", "WHY ATOURE", "This is not a new capability: we have built & tracked before",
    "This is not a new capability. In Côte d’Ivoire, AToure built the IShowSpeed operation from zero, with a direct relationship with the Minister of Tourism. In Morocco it delivered the AFCON Final mascot reveal with CAF and the Royal Moroccan Football Federation. The Ashton Hall Africa Tour covered five countries, managed end to end: Ghana, Cameroon, Nigeria, Benin and Rwanda.",
    stripesFooter);
  brand(s, true);
  [
    ["card_ci", "IShowSpeed in Côte d’Ivoire, Abidjan", "CÔTE D’IVOIRE, ISHOWSPEED TOUR", "gold", "55.8 Million", "Instagram views, with a direct relationship with the Minister of Tourism"],
    ["card_ma", "IShowSpeed in Morocco for the AFCON 2025 Final", "MOROCCO, AFCON FINAL: ISHOWSPEED TOUR", "highlight", "16 Million", "Live stream views, delivered with CAF and the Royal Moroccan Football Federation"],
    ["card_ashton", "Ashton Hall Africa Tour, Nigeria leg", "ASHTON HALL AFRICA TOUR", "tint", "1.57 Billion", "Total views, five countries managed end to end: Ghana, Cameroon, Nigeria, Benin, Rwanda"],
  ].forEach(([key, alt, event, kc, fig, line], i) => {
    const x = M + i * 4.145, y = 2.25, w = 3.84;
    s.addShape(pres.ShapeType.rect, { x, y, w, h: 4.3, fill: { color: C.panel }, line: { type: "none" } });
    const p = deck.photo(s, key, { x, y, w, alt });
    T(s, event, { x: x + 0.25, y: y + p.h + 0.15, w: w - 0.5, h: 0.38, fontSize: 10.5, bold: true, charSpacing: 1, color: kc });
    T(s, fig, { x: x + 0.25, y: y + p.h + 0.55, w: w - 0.5, h: 0.45, fontSize: 26, bold: true, color: "paper" });
    T(s, line, { x: x + 0.25, y: y + p.h + 1.02, w: w - 0.5, h: 0.55, fontSize: 11.5, color: "tint" });
  });
  T(s, "Sources: Instagram and YouTube analytics, tour figures supplied by the client.", { x: M, y: 6.68, w: CW, h: 0.22, fontSize: 9, color: "tint" });

  // 11. The ask
  deck.section("The ask");
  s = deck.content("CLOSING", "THE ASK", "Let us build the 5th edition together",
    "Close here. Four steps: confirm the scope and agree the targets, approve the creator shortlist, sign and brief the creators, and the build up content goes live. Do not read past this slide: let the ask land, and let the Mother Africa team respond.",
    stripes);
  deck.photo(s, "poster2026", { x: 9.45, y: 0.75, h: 4.4, alt: "Mother Africa Festival 2026 poster: Davido, 27 and 28 December, Marcory Zone 4, Abidjan" });
  [
    "Confirm the scope and agree the targets",
    "Approve the creator shortlist",
    "Creators signed and briefed",
    "Build up content goes live",
  ].forEach((head, i) => {
    const y = 2.45 + i * 0.75;
    deck.numCircle(s, i + 1, M, y, 0.5, { fill: "gold", color: "ink", size: 14 });
    T(s, head, { x: 1.3, y, w: 6.5, h: 0.5, fontFace: deck.HEAD, fontSize: 20, color: "paper", valign: "middle" });
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
