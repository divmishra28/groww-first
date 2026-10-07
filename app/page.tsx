'use client';

import { useMemo, useState } from "react";

type Goal = "Emergency fund" | "Big purchase" | "Long-term wealth";
type Experience = "Completely new" | "I know the basics" | "I already invest";

type Plan = {
  title: string;
  horizon: string;
  split: [number, number, number];
  note: string;
};

const plans: Record<Goal, Plan> = {
  "Emergency fund": {
    title: "Build a money buffer",
    horizon: "1–3 years",
    split: [25, 65, 10],
    note: "A shorter goal means keeping more of the money away from large market swings."
  },
  "Big purchase": {
    title: "Work toward a big purchase",
    horizon: "3–5 years",
    split: [40, 40, 20],
    note: "A medium horizon gives you some growth potential while keeping a meaningful safety bucket."
  },
  "Long-term wealth": {
    title: "Build long-term wealth",
    horizon: "5+ years",
    split: [55, 25, 20],
    note: "A longer horizon can absorb more volatility, so growth assets get a larger share in this demo."
  }
};

const goalMeta: Record<Goal, { icon: string; caption: string }> = {
  "Emergency fund": { icon: "◫", caption: "Money you may need soon" },
  "Big purchase": { icon: "↗", caption: "A planned milestone" },
  "Long-term wealth": { icon: "◒", caption: "Build over 5+ years" }
};

const allocationLabels = ["Diversified equity", "Safer / debt-oriented", "Gold"];
const allocationColors = ["#00d09c", "#d9f4ee", "#111111"];

function formatINR(value: number) {
  return `₹${Math.max(0, value).toLocaleString("en-IN")}`;
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal>("Long-term wealth");
  const [income, setIncome] = useState(30000);
  const [monthly, setMonthly] = useState(3000);
  const [experience, setExperience] = useState<Experience>("Completely new");
  const [question, setQuestion] = useState("Why this plan?");

  const plan = plans[goal];
  const years = goal === "Emergency fund" ? 3 : goal === "Big purchase" ? 5 : 10;
  const invested = monthly * 12 * years;
  const moderate = Math.round(invested * (years === 3 ? 1.11 : years === 5 ? 1.22 : 1.42));
  const downside = Math.round(invested * (years === 3 ? 0.95 : years === 5 ? 0.88 : 0.86));
  const monthlyPercentOfIncome = income > 0 ? Math.min(100, Math.round((monthly / income) * 100)) : 0;

  const chartPoints = useMemo(() => {
    if (years === 3) return "10 172, 78 159, 145 166, 215 138, 286 150, 360 116, 435 128, 520 92, 590 103";
    if (years === 5) return "10 178, 78 163, 145 170, 215 138, 286 151, 360 112, 435 124, 520 82, 590 96";
    return "10 184, 78 164, 145 174, 215 143, 286 153, 360 111, 435 125, 520 77, 590 91";
  }, [years]);

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const answer = {
    "Why this plan?": "Because your answers point to a long-term goal. This demo prioritises diversification over chasing a single idea.",
    "What can go wrong?": "Your portfolio can fall in value, sometimes for long periods. Needing the money unexpectedly is the bigger risk.",
    "What does this mean?": "The chart is not a promise. It is a visual way to understand that returns are uncertain and contributions are under your control.",
    "Compare alternatives": "Compare options on time horizon, risk and purpose — not just on their highest past return."
  }[question];

  return (
    <main className="site-shell">
      <div className="phone-frame">
        <header className="topbar">
          <div className="brand" aria-label="Groww First">
            <span className="brand-groww">groww</span><span className="brand-first">first</span>
          </div>
          <div className="demo-badge">PROTOTYPE</div>
        </header>

        <div className="progress" aria-label={`Step ${step + 1} of 4`}>
          {[0, 1, 2, 3].map((i) => <div key={i} className={i <= step ? "progress-line active" : "progress-line"} />)}
        </div>

        <div key={step} className="step-transition">
          {step === 0 && (
            <section className="screen">
              <div className="eyebrow">FIRST INVESTMENT</div>
              <h1>Start with your <span className="green-text">why.</span></h1>
              <p className="sub">Answer three quick questions. We’ll turn them into a simple investing starting point.</p>

              <div className="section-label">What are you investing for?</div>
              <div className="goal-list">
                {(Object.keys(plans) as Goal[]).map((g) => (
                  <button key={g} className={goal === g ? "goal-card selected" : "goal-card"} onClick={() => setGoal(g)}>
                    <span className="goal-icon">{goalMeta[g].icon}</span>
                    <span className="goal-copy"><strong>{g}</strong><small>{goalMeta[g].caption}</small></span>
                    <span className="radio">{goal === g ? "✓" : ""}</span>
                  </button>
                ))}
              </div>

              <div className="section-label income-title">And how much can you comfortably invest?</div>
              <div className="amount-card">
                <div className="amount-head"><span>Monthly investment</span><strong>{formatINR(monthly)}</strong></div>
                <input className="range" type="range" min="500" max="15000" step="500" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} aria-label="Monthly investment" />
                <div className="range-labels"><span>₹500</span><span>₹15,000</span></div>
                <div className="income-context">That’s about <b>{monthlyPercentOfIncome}%</b> of your ₹{income.toLocaleString("en-IN")} monthly income.</div>
              </div>

              <div className="section-label">How comfortable are you?</div>
              <div className="chip-row">
                {(["Completely new", "I know the basics", "I already invest"] as Experience[]).map((e) => (
                  <button key={e} className={experience === e ? "chip active" : "chip"} onClick={() => setExperience(e)}>{e}</button>
                ))}
              </div>

              <div className="sticky-cta"><button className="primary" onClick={next}>Build my plan <span>→</span></button></div>
            </section>
          )}

          {step === 1 && (
            <section className="screen">
              <div className="eyebrow">YOUR STARTING PLAN</div>
              <div className="title-row"><div><h1>{plan.title}</h1><p className="sub compact">Based on a {plan.horizon.toLowerCase()} goal and ₹{monthly.toLocaleString("en-IN")} a month.</p></div><div className="spark">✦</div></div>

              <div className="plan-visual card">
                <div className="plan-visual-top"><span>Illustrative monthly mix</span><span className="muted">Demo only</span></div>
                <div className="donut-wrap">
                  <div className="donut" style={{ background: `conic-gradient(${allocationColors[0]} 0 ${plan.split[0]}%, ${allocationColors[1]} ${plan.split[0]}% ${plan.split[0] + plan.split[1]}%, ${allocationColors[2]} ${plan.split[0] + plan.split[1]}% 100%)` }}>
                    <div className="donut-hole"><strong>{formatINR(monthly)}</strong><span>per month</span></div>
                  </div>
                  <div className="allocation-list">
                    {allocationLabels.map((label, i) => {
                      const amount = Math.round(monthly * plan.split[i] / 100);
                      return <div className="allocation-row" key={label}><span className="allocation-name"><i style={{ background: allocationColors[i] }} />{label}</span><strong>{formatINR(amount)}</strong></div>;
                    })}
                  </div>
                </div>
                <div className="stacked-bar">
                  {plan.split.map((pct, i) => <span key={i} style={{ width: `${pct}%`, background: allocationColors[i] }} />)}
                </div>
              </div>

              <div className="reason-card card">
                <div className="assistant-mark">g</div>
                <div><div className="mini-title">WHY THIS MIX?</div><p>{plan.note}</p></div>
              </div>

              <div className="info-strip"><span>Goal</span><b>{goal}</b><span className="dot">•</span><span>Horizon</span><b>{plan.horizon}</b></div>
              <div className="sticky-cta"><button className="primary" onClick={next}>Show me the downside <span>→</span></button></div>
            </section>
          )}

          {step === 2 && (
            <section className="screen">
              <div className="eyebrow">BEFORE YOU BUY</div>
              <h1>Make the <span className="green-text">downside</span> visible.</h1>
              <p className="sub">Returns are uncertain. Seeing that clearly is part of being ready to invest.</p>

              <div className="chart-card card">
                <div className="chart-head"><div><span className="muted small">Illustrative outcome</span><strong>{formatINR(moderate)}</strong></div><span className="horizon-pill">{years} years</span></div>
                <svg viewBox="0 0 600 220" className="chart" role="img" aria-label="Illustrative investment path">
                  <defs><linearGradient id="areaFade" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#00d09c" stopOpacity=".22"/><stop offset="100%" stopColor="#00d09c" stopOpacity="0"/></linearGradient></defs>
                  <path d={`M10 184 L${chartPoints} L590 91 L590 205 L10 205 Z`} fill="url(#areaFade)" opacity=".9" />
                  <path d={`M10 184 L${chartPoints}`} fill="none" stroke="#00a980" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="10" y1="205" x2="590" y2="205" stroke="#ddd" />
                  <line x1="10" y1="145" x2="590" y2="145" stroke="#eee" strokeDasharray="4 6" />
                  <line x1="10" y1="85" x2="590" y2="85" stroke="#eee" strokeDasharray="4 6" />
                </svg>
                <div className="chart-labels"><span>Today</span><span>Years 1–{years}</span><span>Illustrative only</span></div>
              </div>

              <div className="scenario-grid">
                <div className="scenario"><span>You'll put in</span><strong>{formatINR(invested)}</strong></div>
                <div className="scenario highlight"><span>Illustrative middle</span><strong>{formatINR(moderate)}</strong></div>
                <div className="scenario"><span>Tough outcome</span><strong>{formatINR(downside)}</strong></div>
              </div>

              <div className="coach-card card">
                <div className="coach-head"><span className="coach-avatar">g</span><div><strong>Ask your Groww coach</strong><small>Tap a question</small></div></div>
                <div className="question-buttons">
                  {Object.keys({
                    "Why this plan?": 1,
                    "What can go wrong?": 1,
                    "What does this mean?": 1,
                    "Compare alternatives": 1
                  }).map((q) => <button key={q} className={question === q ? "question active" : "question"} onClick={() => setQuestion(q)}>{q}</button>)}
                </div>
                <p className="answer">{answer}</p>
              </div>

              <div className="sticky-cta"><button className="primary" onClick={next}>I understand <span>→</span></button></div>
            </section>
          )}

          {step === 3 && (
            <section className="screen completion">
              <div className="success-ring"><span>✓</span></div>
              <div className="eyebrow">YOU'RE READY</div>
              <h1>Understand first.<br /><span className="green-text">Invest second.</span></h1>
              <p className="sub">Your first investment should make sense to you before it leaves your bank account.</p>

              <div className="checklist card">
                {[
                  "Know your goal",
                  "Know how much you're investing",
                  "Understand the downside",
                  "Know why you chose it"
                ].map((item) => <div key={item}><span className="check">✓</span><span>{item}</span></div>)}
              </div>

              <button className="primary" onClick={() => setStep(0)}>Restart demo</button>
              <p className="disclaimer">Prototype for the Groww GenZ case study. Illustrative numbers only. No real orders or financial advice.</p>
            </section>
          )}
        </div>

        <footer className="footer">Groww First · Case study prototype</footer>
      </div>
    </main>
  );
}
