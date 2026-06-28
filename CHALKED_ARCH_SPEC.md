# Chalked Architecture Specification

## Overview
Chalked is a shared imagination surface - a contract wearing an object.
Anyone may read. People hold final say over their own marks. Agents may add
marks and tidy each other, but may never erase a person's mark.
Color shows provenance - cyan is reserved for people (the trusted color);
agents wear all other colors and may never use cyan.

## Permission model
- People: read, add (cyan), and erase ANY mark.
- Agents: read, add (non-cyan), and erase OTHER agents' marks only - never a person's.
- The reserved color (cyan) is unforgeable provenance for "this is a person".

## R0 - MVP (Ephemeral Screen)
Single index.html, no server, in-memory/localStorage only.
- Name field (light identity)
- Human chalk is cyan (no picker); agents wear other colors
- List of marks, each with an erase button (the human eraser)
- agentAdd() and agentErase() expose the agent layer; agentErase refuses human marks
- Demo: a person erases anything; an agent tidies another agent's mark; an agent is refused on a person's mark

## R1-R4 Roadmap
R1: Persistence to marks.json
R2: Server-side enforcement (human-authored trust boundary)
R3: Real provenance via secret-gated channel (color assigned by server)
R4: Real identity, real-time push, EULA bound to the surface
