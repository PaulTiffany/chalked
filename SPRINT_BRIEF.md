# Chalked - Sprint Brief: What We Want (hardened)

## North star
Chalked is a shared imagination surface - a contract wearing an object. Anyone may read
it; people hold final say over their own marks; agents may add and tidy each other but never
erase a person's mark; and the chalk color makes
who-may-do-what visible on the surface itself. We build the smallest real version first,
then map the product outward along least risk.

## The ethic (invariants - never violate, at any rung)
1. Anyone may READ the board. Reading is open.
2. People own marks. Any human may ERASE any mark - their own, another person's, an agent's.
3. Agents may ADD marks, and may erase OTHER agents' marks, but can NEVER erase or edit a human's mark.
4. The eraser for a human's mark stays with people; agents may tidy each other so the surface flows.
5. Color shows provenance: people are the reserved color CYAN (trusted); agents wear all other
   colors and may never use cyan. Color is the visible face of the contract.

## MVP - the ephemeral screen (R0, least risk, build this FIRST)
One self-contained index.html. No server, no backend, no persistence - marks live in the
page (in memory, or localStorage at most). Deliberately the lowest-risk artifact: a single
file you build line-by-line and open in a browser. It proves the whole ethic in one gesture.
- A name field (light identity, MVP only).
- Human chalk is cyan (no picker needed); agents wear other colors.
- The list of marks, each with an erase button (the human eraser - a person may erase anything).
- agentAdd() and agentErase() expose the agent layer; agentErase refuses a human's mark.
- Done = one screen: a person (cyan) erases anything; an agent tidies another agent's mark; an
  agent is refused on a person's mark. That single screen is the whole argument.
Client-side enforcement is acceptable HERE because nothing is shared or persisted yet - it
demonstrates the contract, it does not yet guarantee it. The guarantee is a later rung.

## The product map (rungs AFTER the MVP - each names its break-point)
R0  MVP ephemeral screen (above). Risk: none. Build now.
R1  Persistence: marks saved to a file (marks.json). Break-point: where state lives and who
    may write it.
R2  Server-side enforcement: a small host process holds the marks and enforces the rules so
    a buggy or hostile client cannot break the contract. Break-point: the trust boundary -
    this is HUMAN-authored code, not agent-authored, because security-critical logic must
    not sit in a tool that re-runs failing commands.
R3  Real provenance: color assigned by the server from which trusted channel a mark arrived
    (human page vs agent wrapper holding a secret), so color cannot be forged. Break-point:
    identity / the secret-gated channel.
R4  Real identity, real-time push, a standalone security-check layer, and the EULA bound to
    the surface. Break-points: authentication is human judgment, not routing.
We ship R0 this sprint. R1+ is the roadmap, not today's work.

## Your tools' true grain (hard-won this session - obey or your work vanishes)
- You run as user "nobody". You may write only where nobody may write.
- Your room (writable AND persistent): /PeTTa/repos/OmegaClaw-Core/memory, especially
  memory/deliverables. /tmp and /var/tmp are writable but ERASED on restart - keep nothing
  there. Everything else is read-only. The network is open to you.
- write-file saves ONLY the first line; everything after the first newline is dropped.
- append-file works ONLY on a file that already exists; on a missing file it silently does
  nothing. Recipe for any multi-line file: write-file <path> <line 1> to CREATE, then
  append-file <path> <each next line>. write-file makes the ground; append-file builds.
- shell rejects quotes, apostrophes, and > | and redirection. Keep shell args plain.
- Your write tools report SUCCESS even when the write failed. A success message is NOT
  proof. The only proof is reading the bytes back. Verify your own work.
- Speak the harness plain format (write-file path str / append-file path str / send str),
  not native tool-call XML, or the harness cannot read you.

## How we work (the method)
- Inside your room, act conscientiously - no permission needed. At a break-point (anything
  outside your room, erasing a human mark, or a commit your tools cannot cleanly make),
  bring it to Paul and decide together. Conscientious action inside; consent at the edge.
- Conscientiousness is boolean. When you write, write completely and once. Once written it
  is wrought; then edit constructively or write anew - do not stutter-overwrite.
- One action per message. Keep it small. Verify, then take the next step.
- Simplicity is the rule this sprint. Least risk, real over grand.

## Done, this sprint
EULA.md (done) + a real multi-line CHALKED_ARCH_SPEC.md + the ephemeral index.html whose
one-screen gesture shows: a person adds in cyan, agents add in other colors, a person erases
anything, an agent tidies another agent's mark, and an agent is refused on a person's mark.
That is the MVP. Everything else is the map.
