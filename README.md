# Groww First — GenZ case-study prototype by Divyansh Mishra

A mobile-first prototype for the Groww GenZ case study.

## Product thesis
Help a first-time investor understand their first investment before they buy it.

## UX direction
The prototype is intentionally closer to a polished Groww-style experience: bright white surfaces, strong black typography, restrained green accenting, rounded cards, progressive disclosure, mobile-first spacing, sticky CTA, slider input, micro-interactions, and a visual portfolio allocation.

## Stack
- Next.js
- React
- TypeScript
- CSS
- No live financial APIs
- No real brokerage/order functionality

## Important
This is a case-study prototype with illustrative numbers. It is not financial advice and does not place real orders.

## First-screen thesis
The prototype is intentionally not another investing dashboard. The opening experience answers:
**“Why would a 22-year-old open this instead of the normal Groww app?”**

The answer is a guided entry point: start with the person's goal and comfortable monthly amount, then reveal a simple plan and explain the trade-offs before showing products.

## Responsive design
- Immersive single-column app surface with full-width cards, touch-friendly controls and a sticky bottom CTA.

## Live-app audit changes
- Removed the misleading default selected goal; the user must choose a goal before continuing.
- Replaced “investment experience” with risk comfort because it actually changes the illustrative allocation.
- Hid the desktop product-rationale rail on mobile and reduced first-screen duplication.
- Added a visible Back control for steps 2–4.
- Clarified all allocation and outcome numbers as educational/illustrative rather than recommendations.
- Added a compact “before you buy” comprehension check on the downside screen.
