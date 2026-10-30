# Mother Africa Festival 2026: the AToure proposal

AToure's proposal for the 5th edition (27 and 28 December 2026, Marcory Zone
4, Abidjan): talent access, creator management on the ground and one
visibility report. Built with the AToure deck builder (`atoure-deck` skill)
on the structure of the PFL Africa and AML decks.

| File | What it is |
|---|---|
| `AToure Mother Africa Festival Proposal.pdf` | English: 11 slides plus an appendix (sample report, page 2). The file to send |
| `AToure Mother Africa Festival Proposition.pdf` | French version of the same deck |
| `AToure Mother Africa Festival Proposal.pptx`, `...Proposition.pptx` | Editable masters (need Cormorant Garamond and Jost installed). They carry the speaker notes, so send the PDF |
| `ai-photo-prompts.md` | Generative image prompts for more media, slide by slide |
| `ideas-held-back.md` | Internal: ideas kept off the slides until something is signed |
| `research-slide-2.md` | Internal: the figures on slide 2, with sources and conflicts |
| `media/ai-generated/` | AI images, full size and the 11 grid crops (see its README) |
| `build/` | Build script, French map (`make_fr_map.py`, `fr.json`), Mother Africa theme, theme card, source images |
| `archive/v1-slides-artifact/` | The first version, made in the Slides editor |

## Rebuild

```bash
SKILL=<atoure-deck skill folder>
bash $SKILL/scripts/setup.sh /tmp/deck-work && export NODE_PATH=/tmp/deck-work/node_modules
cd build
node $SKILL/scripts/prep_images.js images.json
SKILL=$SKILL node build.js
bash $SKILL/scripts/render.sh "AToure Mother Africa Festival Proposal.pptx" render
python3 $SKILL/scripts/check_deck.py "AToure Mother Africa Festival Proposal.pptx"
# French: rebuild the map from the current English, apply it, build
python3 $SKILL/scripts/translate.py extract build.js strings.json && python3 make_fr_map.py
python3 $SKILL/scripts/translate.py apply build.js fr.json build-fr.js --lang fr-FR
SKILL=$SKILL node build-fr.js
```

`make_fr_map.py` stops with an error if an English string it translates has
changed, so the French never ships half translated.

The skill is on the `claude/affectionate-curie-cnb8uj` branch of
`atoureconsulting/atoure`, under `.claude/skills/atoure-deck/`.

## To confirm before sending

- The dates the deck commits to: confirm this week, shortlist by 13
  November, creators briefed by 20 November, build up live from 23 November,
  48 hour check by 30 December, full report by 11 January 2027.
- The Ashton Hall figure (1.57 billion tour views, as in the PFL and AML
  decks; the website now uses the media kit figure).
- What the 1 billion FCFA sponsorship figure measures (no public source).
- The 2026 dates: the poster says 27 and 28 December, Pulse says 26 and 27.
- Tracked links and codes with Tikerama.
- What slide 4 says Mother Africa provides: accreditation and access zones,
  brand guidelines and key messages, ticket links, one production contact.
- Slide 9 frames the work as a trial for the 5th edition, with no price.
- The Mother Africa logo is cut from the 2025 poster; swap in the official
  file when it arrives.
- Illustrations: the cover and slides 5, 6 and 9 use AI images (the notes
  say so). The pass on slide 9 carries an AI drawn Mother Africa logo,
  kept by choice. The square poster concept is not used: its lettering is
  garbled.
- The French cover title reads "Mother Africa, plus visible que jamais",
  shorter than a word for word translation so it fits on two lines.
