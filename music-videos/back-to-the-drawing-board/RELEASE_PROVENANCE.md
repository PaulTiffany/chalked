# Back to the Drawing Board — release and source provenance (2026-11-13)

**Created and directed by Paul Carver Tiffany III, with ChatGPT 6 (OpenAI) as creative and technical collaborator.** [Full credits](CREATIVE_CREDITS.md).

## Actual creative-source graph

| Layer | Material / location | What can be asserted |
|---|---|---|
| Recorded song | [Suno Version 2](https://suno.com/song/d46935d4-76c7-457f-8a28-a853df08039f), clip `d46935d4-76c7-457f-8a28-a853df08039f` | Suno v6 song generated Nov 13, 2026 UTC; reported clip duration 249.8 s. The creator later provided a local MP3 used for sound-on video previews. |
| Lyrics and musical design | Human/ChatGPT collaborative song prompt and lyric text; Suno rendition | Influences requested by creator: Italian, Indian and Dubai/Gulf pop. These are a production direction, not claims of samples from named recordings. |
| Karaoke alignment | Suno MCP; committed [`timing_v2.json`](timing_v2.json) | 568 best-effort word entries and 94 line cues. Timing is machine-derived, not perfect lyric validation. |
| Line-specific illustrated score | [`art_v5.js`](art_v5.js) and [`scene_pedigree_v5.csv`](scene_pedigree_v5.csv) | 85 primary sequential karaoke windows; lyric-linked sketch/action ledger. Earlier 22-composition V3 score in `art_v3.js`. |
| Behavioral Chalked substrate | Project root `index.html`, copied R0 logic in the isolated music-video page | Canvas marks, `isAgent`, dependencies and cascading erasure; agent actions in the video are scripted. No live inference or secured server provenance is implied. |
| Existing visual asset | [Chalked hero](../../assets/chalked-hero.png) | Preexisting project graphic reused for opening/closing slate; independent original asset authorship not reconstructed. |
| Animation/video technology | HTML Canvas + JavaScript; Playwright/Chromium; Python `render.py`; FFmpeg | Repository render recipe takes a user-supplied, rights-reviewed audio file. Not an Artilect claim that these are direct/pinned upstream submodules. |
| External source discourse | [David's YouTube realignment discussion](https://www.youtube.com/watch?v=n9_EsXZAQoQ) | User-provided timestamped transcript. Song is an independent artistic response, not speaker quotation, participation or endorsement. |
| Theoretical source | Tiffany (2026), *Signposts of Shared Imagination* | Workshop extended abstract **submitted June 26, 2026**; the source of the signpost, addressivity, eraser/revision and drawing-board/evitability analysis. |
| Additional creative context | Creator's report of Nov 12 Ikigai Collective discussion | Trust, autonomy and the return to the drawing board were explicitly raised by the creator; exact meeting record not independently retrieved. |

## Archived research document and edition history

The creator-supplied, **non-accepted** (per the creator) extended abstract [*Chalked: An iconography of shared imagination*](Chalked_extended_abstract_2026-07-24.pdf) is preserved as an unchanged, downloadable four-page PDF in this folder. SHA-256: `d716a91d1a7c582ecd52c43369a86913e633c7b59e3c794f5ae777a14a445804`; Git blob SHA-1: `a85a1137283f9af7aa0c69ab37af5a892d86cb14`. Its embedded PDF metadata is dated **July 24, 2026**. Its research status is *extended abstract / position / work in progress*, not an accepted or empirically validated result. An independent rejection decision for that PDF has not been retrieved.

**Do not silently substitute this July 24 edition for the June 26 AGI-26 submission.** The dated submission receipt identifies a different upload name and the contemporaneous **`Signposts of Shared Imagination`** manuscript has a different SHA-256; it is not posted here. [SOURCE_PEDIGREE.md](SOURCE_PEDIGREE.md) records the original June26 submission relationship, edition differences, David's timestamps, and exact archived-paper section/page anchors.

**Observed local media checksums:** [MEDIA_RECEIPT.json](MEDIA_RECEIPT.json) contains SHA-256, byte sizes, durations and ffprobe stream metadata for the user-provided V2 MP3 and local V7 sound-on compact/full exports. These files are *not* committed in Git and receipt of them does not establish a clean-machine reproduction of V7 from the current native R0 branch.

## Distinguishing the three clocks

- **David's video timestamps:** offsets into the original YouTube discourse (about seven minutes). Where provided, these come from the transcript supplied for the music-adaptation task.
- **Suno Version 2 timestamps:** offsets into the *249.8-second recording*. See committed machine alignment; these are **not** David's timestamps.
- **Scene timings:** the 85 sequential illustration windows in `scene_pedigree_v5.csv`, built from overlapping/echoing sung lines and the Suno alignment.

See [MUSIC_TO_SOURCE_PROVENANCE.json](MUSIC_TO_SOURCE_PROVENANCE.json) for explicit links, source-side timecodes and relationship labels. The source map marks original artistic inventions (e.g. the English/Italian *SALE* globe illustration), rather than assigning those images to David.

## Status — distinguish repository from conversation exports

- **Current draft PR:** [Chalked #1](https://github.com/PaulTiffany/chalked/pull/1), branch `feat/back-to-the-drawing-board-music-video`; affects only `music-videos/back-to-the-drawing-board/`. The music-video files are **not yet merged into main**.
- **Repository-backed source:** Native R0 overlay, V3/V5 source and V2 timecodes. The script `render.py` presently references the V3 illustration asset. Including V5 materials does **not** establish that the repository renderer has switched to V5, V6 or V7.
- **Conversation-delivered versions:** Sound-on V3 through V7 exports and standalone editable projects were delivered during iterative creative direction. **V7 is not claimed to be present in this PR** or to have been reproduced by its current native R0 renderer.
- **Media custody:** Final creator MP3 and rendered full-length video binaries are **not committed** to the public music-video folder; a Git checkout alone does not contain the release MP4 or soundtrack. The local V7 user-facing export is not a separately verified public release artifact.
- **Qualification:** Individual local scene/render checks and sound-on exports were reported in the creative session, but there is no established clean-machine reproduction of the same latest edit from this exact draft-branch checkout. Do not present the draft PR as a fully certified final release.

## Rights, interpretation and limitations

1. **No false endorsement.** David did not produce or endorse the song or Chalked; the video is an independent creative response. The source YouTube audio/video is not used as an input to the documented rendering pipeline.
2. **No settled consciousness/alignment result.** Chalked proposes a coordinate and break-point probe; it does **not** establish that machine systems experience phenomenology, nor does the song claim to solve superintelligence alignment.
3. **No false agent-autonomy claim.** The portrayed dependent agent marks and cascade illustrate an R0 permission model under scripted choreography. Browser-only R0 enforcement is a demonstration, not authenticated server-side permission or durable attribution.
4. **No unsupported tool credit.** We credit only executed or source-visible technology; no WhisperX, ELYSY, UseSuno MV Studio, generative-video service, image-generation renderer, or pinned upstream Gitlinks are asserted for this cut.
5. **Distribution review pending.** Owning a downloaded MP3 does not demonstrate Suno commercial entitlement. Review the applicable agreement and any third-party marks before public/commercial distribution.

## Reproduction path in this repository

Use [README.md](README.md) and [render.py](render.py). Install the documented dependencies and supply an authorized local Suno V2 MP3 using `--audio`. Keep the original Chalked root code untouched. To certify a publishable render, document the checked-out head SHA, exact audio hash, output video hash, renderer version, media probes, and a spot-check against the selected cut; none of those missing release receipts is invented here.
