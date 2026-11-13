# Back to the Drawing Board — V5: More symbolic, line-specific sketches

**Suno recording:** Version 2 (`d46935d4-76c7-457f-8a28-a853df08039f`), 249.8 seconds. Owner-provided MP3 synchronized to the animation. **Video:** Chalked hand-drawn line art, one distinct visual composition for each of the 85 primary karaoke lines; no dissolves between lines. The 85 line starts are preserved in `line_cues.json` from the Suno alignment (overlapping backing vocals are kept with their lead line).

## What's different from V4

The source retains V4's 85 individually indexed scenes, but **78 of those 85 scenes now have newly directed, bespoke symbolic compositions**. The remaining seven retain distinct prior illustrations where appropriate. This is a redesign of the mapping between **meaning of a lyric** and **pictorial action**, not merely a larger stock asset palette. Typical motifs now change at every new line: a globe and two false-friend meanings, signatures on an agreement, an ear and message, prism-like competing interpretations, a still-open fork in a road, a fractured agreement, values on a scale, an ink drop setting, an auditorium of participants, diverging boats, a railroad turnout, a rising spiral returning without resetting, a postmarked memo, an actual archive record and revising it, a factory whose decisions outpace reading, interrupted steering controls, revisable contracts, a weather forecast whose future remains unknown, and a cost-of-rework construction crane.

### Reference: `Same word, different worlds` (12.10–28.97 s)

The central globe is flanked by the **written word `SALE`** in two intended contexts: English `sale`, a store discount; Italian `sale`, salt, drawn as seasoning over pasta. Same spelling, different language, different interpretation. English dictionary sense: Cambridge Dictionary (English–Italian `sale`, https://dictionary.cambridge.org/dictionary/english-italian/sale); Italian sense: Cambridge Dictionary (Italian–English `sale`, https://dictionary.cambridge.org/dictionary/italian-english/sale). This is a lyric illustration, not an implication that David's video used this example.

### Other source fidelity

The two-people agreement, speed versus consultation, partial overlap, detection and correction, the incorrect sent-mail handoff and the inadequacy of nominal authority under speed asymmetry follow David's realignment discourse (`https://www.youtube.com/watch?v=n9_EsXZAQoQ`). Signpost/access/addressivity, who holds the eraser, the ability to reopen deliberation and the governor of the board are separate motifs from the submitted June 26, 2026 Chalked workshop abstract **Signposts of Shared Imagination**. This is an artistic synthesis, not an endorsement by either source of the other.

## Using the sketch architecture

`art_v5.js` is the self-contained score of 85 times, sketch primitives, bespoke scene compositions and path animations. It exports `window.renderAt(t)` to paint the scene at a given audio timestamp. The scene is **reconstructed deterministically on the chalk canvas** (not made of pre-rendered stock images). Its line drawings, not image assets, are the narrative unit. It retains the option to call the actual Chalked R0 `nativeScore(t)` and visualize provenance/dependency marks during the handoff if installed in the repository's separate music video directory.

The portable `index.html` uses a standalone relay-model fallback, **not** the original Chalked R0 code. The existing repository branch `feat/back-to-the-drawing-board-music-video` contains the native R0 integration. `install_v5_into_chalked.py` copies only the new score into that subfolder and updates its overlay script reference; it does **not** edit Chalked's original root application. The rendered MP4 is exported from the standalone fallback, not yet qualified from the exact native R0 checkout. The handoffs are choreographed, not real AI inference.

## Playback / rendering

Open `index.html` in a browser (serve with `python -m http.server` if file:// asset loading is restricted) and click Play with music; use the file picker for the owner-supplied MP3 if browser streaming fails.

Render locally with Chromium + Playwright + FFmpeg:

```
python render_fast.py --audio 'Back to the Drawing Board.mp3' --output V5_music_video.mp4 --width 960 --fps 10
```

`inspect.py` samples the 85 scenes and checks browser errors, with a contact sheet. The internal canvas is 1280×720. No original repository files or rights contracts are modified.