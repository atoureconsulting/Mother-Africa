# Mother Africa Festival 2026: the AToure proposal

AToure's proposal for the 5th edition (27 and 28 December 2026, Marcory Zone
4, Abidjan): talent access, creator management on the ground and one
visibility report. Built with the AToure deck builder (`atoure-deck` skill)
on the structure of the PFL Africa and AML decks.

| File | What it is |
|---|---|
| `AToure Mother Africa Festival Proposal.pdf` | The 11 slide deck plus an appendix (sample report, page 2), brand fonts embedded |
| `AToure Mother Africa Festival Proposal.pptx` | The editable master (needs Cormorant Garamond and Jost installed) |
| `ai-photo-prompts.md` | Generative image prompts for more media, slide by slide |
| `ideas-held-back.md` | Internal: ideas kept off the slides until something is signed |
| `research-slide-2.md` | Internal: the figures on slide 2, with sources and conflicts |
| `build/` | Build script, Mother Africa theme, theme card, source images |
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
```

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
- The Mother Africa logo is cut from the 2025 poster; swap in the official
  file when it arrives.
