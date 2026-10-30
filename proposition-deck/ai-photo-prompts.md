# AI photo prompts for the Mother Africa proposal

Generated images to give the deck more media. Each prompt is written for a
specific slide, with the format, where to leave space for text, and what to
check before using the result.

## Rules before you start

These come from the AToure deck builder (design system, section 10):

- **Concept slides only.** Generated images can go on the cover, "Your
  audience is already filming", the formats, management, waves and sponsor
  slides, and the close. Never on proof slides: "Where we stand" and the
  track record use real photos only.
- **No real people.** Do not generate Davido or any real artist or creator.
  Keep performers backlit, small or with their faces hidden. A fake likeness
  is a rights problem, and the client will notice it.
- **No logos and no text.** AI draws garbled letters and fake brand marks.
  Ask for blank surfaces, then place the real Mother Africa or sponsor logo
  in design, and only with that sponsor's approval.
- **Label them.** Alt text starts with "Illustration:". No place captions on
  generated images.
- **Check every image at 100% zoom:** hands and fingers, phones (bent or
  doubled), faces in the crowd, text that crept in, generator watermarks.
  Generate four or more variations and keep the cleanest one.
- **Resolution.** Full bleed slides need at least 2400 px on the long edge
  (about 180 ppi at 13.3 in). Half slide images need 1600 px. Upscale if the
  tool generates smaller.

## The shared style block

Paste this at the end of every prompt so all images look like one shoot:

> Documentary editorial photography, full frame camera, natural skin tones
> with rich detail in dark skin, warm amber and gold stage light mixed with
> deep green ambient tones, subtle film grain, shallow depth of field,
> authentic West African festival atmosphere in Abidjan, Côte d'Ivoire.
> Colour palette: deep forest green, burnt orange, warm gold, cream. No
> text, no letters, no logos, no watermarks, no brand names.

**Negative prompt** (for tools that take one; otherwise add it as "Do not
include ..."):

> text, letters, signage, logos, watermark, brand names, extra fingers,
> distorted hands, bent or duplicated phones, duplicated faces, plastic
> skin, oversaturated colours, cartoon, 3D render, posed stock photo smiles,
> celebrity likeness

**Tool settings.** Midjourney: add `--ar 16:9 --style raw --s 150` (change
the ratio per prompt) and `--no text, logo, watermark`. Higgsfield, Flux,
Imagen or GPT Image: choose the ratio in the settings, use the highest
quality, and keep the same seed across a set for a consistent look.

## The prompts

### 1. Cover hero (slide 1)

**Format:** 16:9, full bleed. Keep the left third dark for the title.

> Wide cinematic night shot of an open air music festival in Abidjan, seen
> from the middle of the crowd. A large stage on the right third glows with
> burnt orange and gold light beams cutting through haze; the headline
> performer is a small backlit silhouette, face not visible. Hundreds of
> young Ivorian fans in the foreground, hands raised, many holding
> smartphones that glow as they film the stage. White peaked tent canopies
> and tall palm trees silhouetted at the edges. The left third of the frame
> falls into deep green shadow and soft haze, leaving clean empty space for
> a title. Low camera angle, 24 mm lens, f/2.8, light beams slightly
> streaked. [style block]

**Check:** no recognisable performer, no readable banners on the stage.

### 2. Every phone is a camera (slide 4)

**Format:** 3:2 landscape, at least 1800 px wide. This replaces the current
low resolution crowd photo.

> Close over the shoulder shot of a young West African woman in a festival
> crowd at night, holding up her smartphone to film the stage. The phone
> screen is sharp and shows the brightly lit stage and a sea of raised
> hands; beyond it the real stage dissolves into soft orange and gold
> bokeh. Her braids and gold hoop earrings catch the stage light. Other
> phone screens glow in the background. 50 mm lens, f/1.8, focus on the
> phone screen. [style block]

**Check:** five fingers, one phone, a believable picture on the screen.

### 3. Festival looks, "get ready with me" (slide 6)

**Format:** 4:5 portrait or 3:2 landscape.

> A stylish Ivorian content creator in her twenties records a get ready
> with me video in a sunlit Abidjan apartment before a festival night. She
> wears a tailored outfit in burnt orange and green wax print with gold
> jewellery. Her phone sits on a small tripod with a ring light; a mirror,
> plants and a rail of outfits behind her. Late golden hour light through
> the window. Candid, mid laugh, looking at her phone screen, not at the
> camera. 35 mm lens, f/2. [style block]

### 4. Creator on the festival floor (slides 6 and 8, "Festival nights")

**Format:** 16:9.

> A young Ivorian male creator in streetwear and a bucket hat films himself
> on a gimbal in the middle of a dancing festival crowd at night, shouting
> with joy toward his phone. Orange stage lights flare behind him and
> confetti hangs in the air. Dancers around him are slightly motion
> blurred; his face is sharp. 28 mm lens, f/2.8, energetic and candid.
> [style block]

### 5. The creator briefing backstage (slide 7, creator management)

**Format:** 16:9.

> Backstage at an outdoor festival in Abidjan before the doors open. A
> calm, well dressed West African production manager holding a tablet
> briefs a small group of four young creators in festival outfits. They
> wear plain coloured lanyards and fabric wristbands with nothing printed
> on them. Flight cases, cable runs and soft work lights around them, stage
> scaffolding behind. Organised, professional, friendly mood; natural
> expressions, nobody looking at the camera. Blue hour light mixing with
> warm work lights. 35 mm lens, f/2.8. [style block]

**Check:** the lanyards and the tablet screen carry no text.

### 6. The creator accreditation pass (slide 7 or the close)

**Format:** 4:3 or 1:1, product shot.

> Studio product photograph of a premium festival creator accreditation
> pass on a woven lanyard, lying on dark green textured linen. The pass is
> a thick matte cream card with a burnt orange and gold geometric pattern
> inspired by West African textiles, a large blank area at the top where a
> logo will be added later, and a thin holographic strip. Soft directional
> light from the top left, gentle shadow, shallow depth of field. The pass
> carries no text, no letters and no logos. [style block]

**After:** place the real Mother Africa logo and "CREATOR" in the blank
area in design, as was done for the FIF pass.

### 7. A sponsor activation on camera (slide 9)

**Format:** 16:9.

> Night scene at a festival brand activation in Abidjan: a bright, modern
> pop up stand with an orange and white canopy and an illuminated backdrop
> wall left completely plain, without any logo or lettering. Two creators
> film a fun moment in front of it, one holding a phone vertically, the
> other laughing with an unbranded drink can. A small queue of smiling
> festival goers in the background. Premium and commercial, yet candid.
> 35 mm lens, f/2.8. [style block]

**After:** add a real sponsor's logo to the backdrop wall only with that
sponsor's written approval. Otherwise leave it plain.

### 8. The afterglow edit (slides 8 and 11)

**Format:** 16:9.

> The morning after the festival: a young Ivorian creator sits at a wooden
> table on a balcony in Abidjan with a laptop and a phone, editing a recap
> reel. The laptop shows a video editing timeline with colourful clips of a
> night concert, slightly out of focus. A coffee cup, a fabric festival
> wristband still on her wrist, soft morning light, the Plateau towers
> across the Ébrié lagoon blurred in the background. Calm, satisfied mood.
> 50 mm lens, f/2. [style block]

### 9. The visibility report on a desk (slides 10 and 11)

**Format:** 16:9, top down.

> Overhead flat lay on a dark green desk: a printed report and a tablet
> showing a clean analytics dashboard with bar charts and large number
> tiles in burnt orange and gold on cream. All numbers and words are
> softly blurred and unreadable. Next to them a fabric festival wristband,
> a brass pen and a cup of coffee. Soft window daylight, tidy and minimal,
> premium consulting look. Shot straight down, 50 mm. [style block]

**Check:** nothing on the screen should read as a real figure. It is an
illustration of the format, never a result.

### 10. The VIP terrace for the close (slide 14)

**Format:** 16:9, full bleed. Keep the left half darker for text.

> An elegant VIP terrace at an open air festival in Abidjan at night,
> overlooking the crowd and a glowing orange stage in the distance. Low
> lounge seating in cream and deep green, brass lanterns, palm leaves, a
> few well dressed guests and creators chatting, one filming the stage on
> a phone. The left half of the frame is darker and softly out of focus to
> hold text. Warm gold light, cinematic, 35 mm lens, f/2. [style block]

### 11. Home for the holidays (slide 3, why now)

**Format:** 3:2 landscape.

> A joyful December arrival at the airport in Abidjan: a young diaspora
> couple with suitcases is embraced by family in the arrivals hall, while
> one of them films the moment on a phone. Warm evening light, festive but
> natural, documentary feel. No signs, no airline names, no readable text.
> 35 mm lens, f/2.8. [style block]

## Where real media beats AI

Two things will lift the deck more than any generated image:

1. **The festival's own photos and video from the 2025 edition.** Ask the
   Mother Africa team for their photographer's selects in full resolution.
   The posters and crowd photo in the deck now are small files.
2. **The logo as a vector or high resolution PNG.** The deck uses a logo
   cut from the 2025 poster. Swap in the official file when it arrives.
