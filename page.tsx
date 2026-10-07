'use client';

import { useMemo, useState } from "react";

type Goal = "Emergency fund" | "Big purchase" | "Long-term wealth";
type Experience = "Completely new" | "I know the basics" | "I already invest";

const plans: Record<Goal, { title: string; horizon: string; split: [number, number, number] }> = {
  "Emergency fund": { title: "Build a money buffer", horizon: "1–3 years", split: [45, 45, 10] },
  "Big purchase": { title: "Work toward a big purchase", horizon: "3–5 years", split: [40, 40, 20] },
  "Long-term wealth": { title: "Build long-term wealth", horizon: "5+ years", split: [50, 30, 20] }
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal>("Long-term wealth");
  const [income, setIncome] = useState(30000);
  const [monthly, setMonthly] = useState(3000);
  const [experience, setExperience] = useState<Experience>("Completely new");
  const [question, setQuestion] = useState("Why this plan?");

  const plan = plans[goal];
  const years = 10;
  const invested = monthly * 12 * years;
  const optimistic = Math.round(invested * 1.72);
  const moderate = Math.round(invested * 1.42);
  const downside = Math.round(invested * 0.86);

  const bars = useMemo(() => {
    const vals = [100, 112, 106, 125, 118, 142, 136, 158, 149, 172];
    return vals;
  }, []);

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <main className="app-shell">
      <div className="topbar">
        <div className="brand">groww<span>first</span></div>
        {step > 0 && <button className="text-btn" onClick={back}>Back</button>}
      </div>

      <div className="progress">
        {[0,1,2,3].map(i => <div key={i} className={i <= step ? "progress-dot active" : "progress-dot"} />)}
      </div>

      {step === 0 && (
        <section className="screen">
          <div className="eyebrow">YOUR FIRST INVESTMENT</div>
          <h1>What are you investing for?</h1>
          <p className="sub">No jargon. No finance lecture. Just a starting point.</p>
          <div className="cards">
            {(Object.keys(plans) as Goal[]).map((g) => (
              <button key={g} className={goal === g ? "choice selected" : "choice"} onClick={() => setGoal(g)}>
                <span className="choice-title">{g}</span>
                <span className="choice-copy">{plans[g].horizon}</span>
              </button>
            ))}
          </div>

          <div className="fields">
            <label>
              Monthly income
              <div className="money-input"><span>₹</span><input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} /></div>
            </label>
            <label>
              Amount you want to invest
              <div className="money-input"><span>₹</span><input type="number" value={monthly} onChange={e => setMonthly(Number(e.target.value))} /></div>
            </label>
          </div>

          <div className="experience">
            <div className="label">How comfortable are you?</div>
            {(["Completely new", "I know the basics", "I already invest"] as Experience[]).map(e => (
              <button key={e} className={experience === e ? "pill active" : "pill"} onClick={() => setExperience(e)}>{e}</button>
            ))}
          </div>

          <button className="primary" onClick={next}>Build my plan →</button>
        </section>
      )}

      {step === 1 && (
        <section className="screen">
          <div className="eyebrow">YOUR STARTING PLAN</div>
          <h1>{plan.title}</h1>
          <p className="sub">A simple demo based on your answers — not a financial recommendation.</p>

          <div className="plan-card">
            <div className="plan-header">
              <span>₹{monthly.toLocaleString("en-IN")} / month</span>
              <span>{plan.horizon}</span>
            </div>
            <div className="allocation">
              <div className="alloc-row"><div><b>{plan.split[0]}%</b><span>Diversified equity</span></div><div className="bar"><i style={{width: `${plan.split[0]}%`}} /></div></div>
              <div className="alloc-row"><div><b>{plan.split[1]}%</b><span>Safer/debt-oriented</span></div><div className="bar"><i style={{width: `${plan.split[1]}%`}} /></div></div>
              <div className="alloc-row"><div><b>{plan.split[2]}%</b><span>Gold</span></div><div className="bar"><i style={{width: `${plan.split[2]}%`}} /></div></div>
            </div>
          </div>

          <div className="explain-card">
            <div className="mini-title">WHY THIS KIND OF MIX?</div>
            <p>You told us you are {experience.toLowerCase()} and can invest ₹{monthly.toLocaleString("en-IN")} each month for a {plan.horizon} goal.</p>
            <button className="link-btn" onClick={next}>See what could go wrong →</button>
          </div>

          <button className="primary" onClick={next}>Understand it first →</button>
        </section>
      )}

      {step === 2 && (
        <section className="screen">
          <div className="eyebrow">BEFORE YOU BUY IT</div>
          <h1>What could happen to ₹{monthly.toLocaleString("en-IN")} a month?</h1>
          <p className="sub">Markets move up and down. The point is to know what that feels like before you invest.</p>

          <div className="chart-card">
            <svg viewBox="0 0 600 220" className="chart" role="img" aria-label="Illustrative investment path">
              <path d="M10 185 L75 168 L140 176 L205 145 L270 158 L335 110 L400 127 L465 75 L530 90 L590 42" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
              <line x1="10" y1="185" x2="590" y2="185" stroke="currentColor" strokeOpacity="0.15"/>
            </svg>
            <div className="chart-labels"><span>Today</span><span>Illustrative only</span><span>10 years</span></div>
          </div>

          <div className="scenario-grid">
            <div><span>Invested</span><b>₹{invested.toLocaleString("en-IN")}</b></div>
            <div><span>Illustrative middle</span><b>₹{moderate.toLocaleString("en-IN")}</b></div>
            <div><span>Tough outcome</span><b>₹{downside.toLocaleString("en-IN")}</b></div>
          </div>

          <div className="question-card">
            <div className="mini-title">ASK YOUR GROWw COACH</div>
            <div className="question-buttons">
              {["Why this plan?", "What can go wrong?", "What does this mean?", "Compare alternatives"].map(q =>
                <button key={q} onClick={() => setQuestion(q)} className={question === q ? "question active" : "question"}>{q}</button>
              )}
            </div>
            <p className="answer">
              {question === "Why this plan?" && "Because your answers point to a long-term goal. This demo prioritises diversification over chasing a single idea."}
              {question === "What can go wrong?" && "Your portfolio can fall in value, sometimes for long periods. A bad year is normal; needing the money unexpectedly is the bigger risk."}
              {question === "What does this mean?" && "The chart is not a promise. It is a visual way to understand that returns are uncertain and contributions are under your control."}
              {question === "Compare alternatives" && "A beginner might compare diversified equity, debt-oriented options and gold based on time horizon, risk and purpose—not just past returns."}
            </p>
          </div>

          <button className="primary" onClick={next}>I'm ready →</button>
        </section>
      )}

      {step === 3 && (
        <section className="screen completion">
          <div className="success-icon">✓</div>
          <div className="eyebrow">YOU'RE READY</div>
          <h1>Understand first. Invest second.</h1>
          <p className="sub">Your first investment should make sense to you before it leaves your bank account.</p>

          <div className="checklist">
            <div>✓ <span>Know your goal</span></div>
            <div>✓ <span>Know how much you're investing</span></div>
            <div>✓ <span>Understand the downside</span></div>
            <div>✓ <span>Know why you chose it</span></div>
          </div>

          <button className="primary" onClick={() => setStep(0)}>Restart demo</button>
          <p className="disclaimer">Prototype for the Groww GenZ case study. No real orders or financial advice.</p>
        </section>
      )}

      <footer>Prototype • Groww First</footer>
    </main>
  );
}
