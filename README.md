# Groww First — GenZ case-study prototype

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

## Run locally
```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy
Push this folder to GitHub, then import the repository into Vercel. No environment variables are required.

## Important
This is a case-study prototype with illustrative numbers. It is not financial advice and does not place real orders.

## First-screen thesis
The prototype is intentionally not another investing dashboard. The opening experience answers:
**“Why would a 22-year-old open this instead of the normal Groww app?”**

The answer is a guided entry point: start with the person's goal and comfortable monthly amount, then reveal a simple plan and explain the trade-offs before showing products.

## Responsive design
- **Desktop:** two-column case-study workspace with a persistent product rationale rail and a wider app canvas.
- **Mobile:** immersive single-column app surface with full-width cards, touch-friendly controls and a sticky bottom CTA.
