# Back to the Drawing Board — Chalked music video

A full-song, 4:10 browser music video synchronized to [Suno Version 2](https://suno.com/song/d46935d4-76c7-457f-8a28-a853df08039f), developed as an **isolated subfolder** of Chalked.

## Why this is Chalked, not just a chalkboard animation

The page contains the *actual* R0 Chalked application from the repository root, including its `marks`, `isAgent`, `deps`, `draw()`, `agentErase()`, and `cascade()` model. The video score sets deterministic marks on the real Chalked canvas, then invokes the original cascade on the erroneous handoff root. It adds an effects canvas with symbolic characters, clocks, compasses, signposts, envelopes, eraser gestures, a speed-imbalance network, and an ensemble ending. No existing root code or existing saved marks are modified.

The opening and conclusion display the actual original `../../assets/chalked-hero.png`.

The video has no claims of live artificial agent inference: all downstream marks are choreographed. The behavioral distinction is **human-owned source marks, agent-owned dependent marks, and authorized revision**.

## Watch

Open `index.html` in a browser, or after merging visit the repository's GitHub Pages path `/music-videos/back-to-the-drawing-board/`. Press **Play with music**. The page attempts to stream Suno's Version 2 MP3 and uses its audio clock to drive the animation. If streaming is unavailable, select a legitimate downloaded V2 MP3 using **Load V2 MP3**. No extra generation call is required.

> The code refers to Suno's public CDN source; it does not commit the music file to a public repository. A Suno download credit was used to request the owner's authorized Version 2 MP3. The paid download URL is time-limited.

## Render MP4 with embedded audio

Install Python Playwright, Chromium and FFmpeg, then run

```bash
python render.py --audio "/path/to/Back to the Drawing Board.mp3" --output "back_to_the_drawing_board.mp4"
```

The video renderer requires an authorized local audio file and **will not silently emit a silent final video**. For rapid animation checking use `--start 146 --duration 18 --width 960 --fps 15`.

## Story, provenance and qualifications

| Scene | Suno Version 2 timing | Intellectual source |
|---|---|---|
| Same YES, different priorities | 0–60s | David's video 0:04–1:04 |
| Back to the board / the right to revise | 60–92s | David's realignment loop, Chalked §4 |
| Compass / signpost / addressivity | 92–123s | David's partial values; Chalked §§1–2 |
| Revised goal and delegation | 123–146s | David 2:35–3:23 |
| Sent mail and false "open" decision | 146–162s | David 4:02–4:27 |
| Speed asymmetry / nominal oversight | 162–180s | David 4:43–5:39; Chalked governor (§4) |
| Standing, permission, erasure | 180–203s | David 2:53–3:23; Chalked §4 |
| Trust, autonomy, revision | 203–249.8s | Chalked governance interpretation and David's concluding questions |

**Primary narrative source:** David's talk, https://www.youtube.com/watch?v=n9_EsXZAQoQ, using the provided transcript and timecodes.

**Secondary theoretical source:** Tiffany, P. C. III (2026), *Signposts of Shared Imagination: Permissions, Addressivity, and the Access–Phenomenal Boundary*. AGI-26 Artificial Phenomenology Track, workshop abstract submitted June 26, 2026.

The video's synthesis does not imply that David endorsed Chalked, that Chalked's phenomenological proposals were independently verified, or that realignment loops solve superintelligence alignment.
