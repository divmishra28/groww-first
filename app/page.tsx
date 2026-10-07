'use client';

import { useMemo, useState } from 'react';

type Goal = 'Emergency fund' | 'Big purchase' | 'Long-term wealth';
type RiskComfort = 'Keep it steady' | 'Some ups & downs' | 'Comfortable with swings';

type Plan = {
  title: string;
  horizon: string;
  split: [number, number, number];
  note: string;
  oneLiner: string;
};

const basePlans: Record<Goal, Plan> = {
  'Emergency fund': {
    title: 'Build a money buffer',
    horizon: '1–3 years',
    split: [20, 70, 10],
    note: 'Shorter goals need more stability because you may need the money sooner.',
    oneLiner: 'Prioritise stability over chasing returns.'
  },
  'Big purchase': {
    title: 'Work toward a big purchase',
    horizon: '3–5 years',
    split: [40, 40, 20],
    note: 'A medium horizon can balance growth with a meaningful stability bucket.',
    oneLiner: 'Balance growth with money you may need sooner.'
  },
  'Long-term wealth': {
    title: 'Build long-term wealth',
    horizon: '5+ years',
    split: [55, 25, 20],
    note: 'A longer horizon can tolerate more volatility, so growth gets a larger share in this demo.',
    oneLiner: 'Give compounding more room to work.'
  }
};

const goalMeta: Record<Goal, { icon: string; caption: string }> = {
  'Emergency fund': { icon: '◫', caption: 'Money you may need soon' },
  'Big purchase': { icon: '↗', caption: 'A planned milestone' },
  'Long-term wealth': { icon: '◒', caption: 'Build over 5+ years' }
};

const riskMeta: Record<RiskComfort, string> = {
  'Keep it steady': 'I would hate seeing my money swing around.',
  'Some ups & downs': 'I can handle normal market moves.',
  'Comfortable with swings': 'I can stay invested through big drops.'
};

const allocationLabels = ['Growth', 'Stability', 'Diversifier'];
const allocationColors = ['#00d09c', '#d8f3ed', '#181818'];

function formatINR(value: number) {
  return `₹${Math.max(0, value).toLocaleString('en-IN')}`;
}

function adjustedSplit(goal: Goal, risk: RiskComfort): [number, number, number] {
  const base = basePlans[goal].split;
  if (risk === 'Keep it steady') return [Math.max(10, base[0] - 15), Math.min(75, base[1] + 15), base[2]];
  if (risk === 'Comfortable with swings') return [Math.min(70, base[0] + 10), Math.max(15, base[1] - 10), base[2]];
  return base;
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [monthly, setMonthly] = useState(3000);
  const [risk, setRisk] = useState<RiskComfort>('Some ups & downs');
  const [question, setQuestion] = useState('Why this plan?');
  const [hasInvested, setHasInvested] = useState(false);

  const plan = goal ? basePlans[goal] : null;
  const split = goal ? adjustedSplit(goal, risk) : [45, 35, 20] as [number, number, number];
  const years = goal === 'Emergency fund' ? 3 : goal === 'Big purchase' ? 5 : 10;
  const invested = monthly * 12 * years;
  const illustrative = Math.round(invested * (years === 3 ? 1.08 : years === 5 ? 1.22 : 1.42));
  const stress = Math.round(invested * (years === 3 ? 0.97 : years === 5 ? 0.92 : 0.88));

  const answer = {
    'Why this plan?': plan?.note ?? 'We are starting with your goal and comfort with volatility rather than making you pick a product first.',
    'What can go wrong?': 'Your portfolio can fall in value, sometimes for a long time. The bigger risk is needing the money when markets are down.',
    'What does this mean?': 'The mix is an educational illustration. It is not a promise of returns or a personal recommendation.',
    'Compare alternatives': 'Compare options on time horizon, risk and purpose — not just on their highest past return.'
  }[question as keyof Record<string, string>];

  const chartPoints = useMemo(() => {
    if (years === 3) return '10 160, 90 142, 160 150, 230 124, 300 132, 380 108, 455 118, 520 91, 590 104';
    if (years === 5) return '10 166, 90 150, 160 157, 230 132, 300 140, 380 112, 455 123, 520 86, 590 98';
    return '10 170, 90 151, 160 163, 230 134, 300 147, 380 107, 455 121, 520 76, 590 89';
  }, [years]);

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <main className="site-shell">
      <div className="desktop-layout">
        <aside className="desktop-rail">
          <div className="rail-brand"><span>groww</span> first</div>
          <div className="rail-eyebrow">PRODUCT THESIS</div>
          <h2>Don't start with a stock.<br /><span>Start with yourself.</span></h2>
          <p>Groww First is a guided layer before the catalogue. It helps a new investor understand a sensible starting point before seeing products.</p>
          <div className="rail-contrast">
            <div><span>NORMAL GROWW</span><b>“What should I buy?”</b></div>
            <div className="rail-arrow">↓</div>
            <div className="rail-highlight"><span>GROWW FIRST</span><b>“What makes sense for me?”</b></div>
          </div>
          <div className="rail-steps">
            <div><span>01</span><div><b>Goal</b><small>Start with the purpose</small></div></div>
            <div><span>02</span><div><b>Plan</b><small>See a simple mix</small></div></div>
            <div><span>03</span><div><b>Downside</b><small>Know the trade-off</small></div></div>
          </div>
          <div className="rail-note"><span>DESIGNED FOR</span><b>20–26 year-old first-time investors</b><small>First paycheck · part-time income · first investing account</small></div>
        </aside>

        <div className="app-frame">
          <header className="topbar">
            <button className={step > 0 ? 'back-btn visible' : 'back-btn'} onClick={back} aria-label="Go back">← <span>Back</span></button>
            <div className="brand" aria-label="Groww First"><span className="brand-groww">groww</span><span className="brand-first">first</span></div>
            <div className="demo-badge">PROTOTYPE</div>
          </header>

          <div className="progress" aria-label={`Step ${step + 1} of 6`}>
            {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className={i <= step ? 'progress-line active' : 'progress-line'} />)}
          </div>

          <div key={step} className="step-transition">
            {step === 0 && (
              <section className="screen first-screen">
                <div className="first-intro">
                  <div className="eyebrow">GROWW FIRST · FIRST INVESTMENT</div>
                  <div className="hero-kicker">Normal Groww helps you <span>pick a product.</span></div>
                  <h1>Your first paycheck deserves a <span className="green-text">starting point.</span></h1>
                  <p className="sub hero-sub">Tell us what you’re trying to do with your money. We’ll turn it into a simple plan you can actually understand.</p>
                </div>

                <div className="first-grid">
                  <div className="first-main">
                    <div className="section-label">1. What are you investing for?</div>
                    <div className="goal-list">
                      {(Object.keys(goalMeta) as Goal[]).map((g) => (
                        <button key={g} className={goal === g ? 'goal-card selected' : 'goal-card'} onClick={() => setGoal(g)}>
                          <span className="goal-icon">{goalMeta[g].icon}</span>
                          <span className="goal-copy"><strong>{g}</strong><small>{goalMeta[g].caption}</small></span>
                          <span className="radio">{goal === g ? '✓' : ''}</span>
                        </button>
                      ))}
                    </div>

                    <div className="section-label income-title">2. What feels comfortable to invest each month?</div>
                    <div className="amount-card">
                      <div className="amount-head"><span>Monthly investment</span><strong>{formatINR(monthly)}</strong></div>
                      <input className="range" type="range" min="500" max="15000" step="500" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} aria-label="Monthly investment" />
                      <div className="range-labels"><span>₹500</span><span>₹15,000</span></div>
                      <div className="income-context"><b>Keep it sustainable.</b> Pick an amount you could keep investing every month without stressing your budget.</div>
                    </div>

                    <div className="section-label">3. How much ups & downs can you handle?</div>
                    <div className="risk-list">
                      {(Object.keys(riskMeta) as RiskComfort[]).map((r) => (
                        <button key={r} className={risk === r ? 'risk-card active' : 'risk-card'} onClick={() => setRisk(r)}>
                          <span className="risk-dot" />
                          <span><b>{r}</b><small>{riskMeta[r]}</small></span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <aside className="first-aside">
                    <div className="thesis-card">
                      <div className="thesis-top"><span className="thesis-badge">WHY THIS EXISTS</span><span className="thesis-time">~2 min</span></div>
                      <div className="thesis-flow">
                        <div><span>01</span><b>Start with you</b><small>Goal · amount · comfort</small></div>
                        <i>→</i>
                        <div><span>02</span><b>See a starting mix</b><small>Simple, not overwhelming</small></div>
                        <i>→</i>
                        <div><span>03</span><b>Understand the trade-off</b><small>Upside · downside · why</small></div>
                      </div>
                    </div>
                    <div className="desktop-value-card">
                      <div className="mini-title">WHAT CHANGES HERE?</div>
                      <div className="value-row"><span>Instead of</span><b>scrolling through funds</b></div>
                      <div className="value-row"><span>You get</span><b>a starting point</b></div>
                      <div className="value-row"><span>Then</span><b>products you can understand</b></div>
                    </div>
                    <div className="first-screen-proof"><span className="proof-check">✓</span><div><b>Not another dashboard.</b><small>A guided first step before the product catalogue.</small></div></div>
                  </aside>
                </div>

                <div className="mobile-trust">No account needed · Takes about 2 minutes · Educational prototype</div>
                <div className="sticky-cta"><button className="primary" disabled={!goal} onClick={next}>Build my first plan <span>→</span></button></div>
              </section>
            )}

            {step === 1 && (
              <section className="screen">
                <div className="eyebrow">YOUR STARTING PLAN</div>
                <div className="title-row"><div><h1>{plan?.title}</h1><p className="sub compact">Based on a {plan?.horizon.toLowerCase()} goal, {formatINR(monthly)} a month and “{risk}”.</p></div><div className="spark">✦</div></div>

                <div className="plan-desktop-grid">
                  <div className="plan-visual card">
                    <div className="plan-visual-top"><span>Illustrative monthly mix</span><span className="muted">Learning prototype</span></div>
                    <div className="donut-wrap">
                      <div className="donut" style={{ background: `conic-gradient(${allocationColors[0]} 0 ${split[0]}%, ${allocationColors[1]} ${split[0]}% ${split[0] + split[1]}%, ${allocationColors[2]} ${split[0] + split[1]}% 100%)` }}>
                        <div className="donut-hole"><strong>{formatINR(monthly)}</strong><span>per month</span></div>
                      </div>
                      <div className="allocation-list">
                        {allocationLabels.map((label, i) => <div className="allocation-row" key={label}><span className="allocation-name"><i style={{ background: allocationColors[i] }} />{label}</span><strong>{formatINR(Math.round(monthly * split[i] / 100))}</strong></div>)}
                      </div>
                    </div>
                    <div className="stacked-bar">{split.map((pct, i) => <span key={i} style={{ width: `${pct}%`, background: allocationColors[i] }} />)}</div>
                  </div>

                  <div className="plan-side">
                    <div className="reason-card card"><div className="assistant-mark">g</div><div><div className="mini-title">WHY THIS MIX?</div><p>{plan?.note}</p></div></div>
                    <div className="info-strip"><span>Goal</span><b>{goal}</b><span className="dot">•</span><span>Horizon</span><b>{plan?.horizon}</b></div>
                    <div className="education-card card"><div className="mini-title">WHAT EACH BUCKET DOES</div><div><b>Growth</b><span>Potential to grow over time</span></div><div><b>Stability</b><span>Helps reduce portfolio swings</span></div><div><b>Diversifier</b><span>Can behave differently from equities</span></div></div>
                    <div className="prototype-note">Illustrative mix only. No real product or order is being recommended here.</div>
                  </div>
                </div>

                <div className="sticky-cta"><button className="primary" onClick={next}>Show me the downside <span>→</span></button></div>
              </section>
            )}

            {step === 2 && (
              <section className="screen">
                <div className="eyebrow">BEFORE YOU BUY</div>
                <h1>Make the <span className="green-text">downside</span> visible.</h1>
                <p className="sub">The goal isn't to predict the future. It's to make sure you understand what uncertainty feels like.</p>

                <div className="downside-grid">
                  <div className="downside-main">
                    <div className="chart-card card">
                      <div className="chart-head"><div><span className="muted small">Illustrative value after {years} years</span><strong>{formatINR(illustrative)}</strong></div><span className="horizon-pill">Demo · not a forecast</span></div>
                      <svg viewBox="0 0 600 220" className="chart" role="img" aria-label="Illustrative investment path">
                        <defs><linearGradient id="areaFade" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#00d09c" stopOpacity=".22"/><stop offset="100%" stopColor="#00d09c" stopOpacity="0"/></linearGradient></defs>
                        <path d={`M10 184 L${chartPoints} L590 205 L10 205 Z`} fill="url(#areaFade)" />
                        <path d={`M10 184 L${chartPoints}`} fill="none" stroke="#00a980" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="10" y1="205" x2="590" y2="205" stroke="#ddd" />
                        <line x1="10" y1="145" x2="590" y2="145" stroke="#eee" strokeDasharray="4 6" />
                        <line x1="10" y1="85" x2="590" y2="85" stroke="#eee" strokeDasharray="4 6" />
                      </svg>
                      <div className="chart-labels"><span>Start</span><span>Market ups & downs</span><span>{years} years</span></div>
                    </div>
                    <div className="scenario-grid">
                      <div className="scenario"><span>Total contributions</span><strong>{formatINR(invested)}</strong></div>
                      <div className="scenario highlight"><span>Illustrative middle</span><strong>{formatINR(illustrative)}</strong></div>
                      <div className="scenario"><span>Stress example</span><strong>{formatINR(stress)}</strong></div>
                    </div>
                  </div>

                  <aside className="downside-side">
                    <div className="coach-card card">
                      <div className="coach-head"><span className="coach-avatar">g</span><div><strong>Ask your Groww coach</strong><small>Plain-English answers</small></div></div>
                      <div className="question-buttons">
                        {['Why this plan?', 'What can go wrong?', 'What does this mean?', 'Compare alternatives'].map((q) => <button key={q} className={question === q ? 'question active' : 'question'} onClick={() => setQuestion(q)}>{q}</button>)}
                      </div>
                      <p className="answer">{answer}</p>
                    </div>
                  </aside>
                </div>

                <div className="before-buy-card card"><b>Before you invest, you should be able to answer:</b><span>What am I investing for?</span><span>How much can I keep investing?</span><span>What happens if markets fall?</span></div>
                <div className="sticky-cta"><button className="primary" onClick={next}>I understand <span>→</span></button></div>
              </section>
            )}

            {step === 3 && (
              <section className="screen completion">
                <div className="success-ring"><span>✓</span></div>
                <div className="eyebrow">YOU'RE READY</div>
                <h1>Understand first.<br /><span className="green-text">Invest second.</span></h1>
                <p className="sub">Your first investment should make sense to you before it leaves your bank account.</p>
                <div className="checklist">
                  <div><span className="check">✓</span>Know your goal</div>
                  <div><span className="check">✓</span>Choose a sustainable amount</div>
                  <div><span className="check">✓</span>Understand the downside</div>
                  <div><span className="check">✓</span>Know why the mix exists</div>
                </div>
                <button className="primary" onClick={next}>Continue to my first investment <span>→</span></button>
                <p className="disclaimer">Groww First is a case-study prototype. It does not place real orders or provide financial advice.</p>
              </section>
            )}

            {step === 4 && (
              <section className="screen">
                <div className="eyebrow">YOUR STARTING POINT</div>
                <div className="title-row"><div><h1>Here's what <span className="green-text">makes sense.</span></h1><p className="sub compact">One simple starting point, based on what you told us — before you see a wall of products.</p></div><div className="spark">✦</div></div>

                <div className="starting-point-grid">
                  <div className="starting-point-main">
                    <div className="summary-hero card">
                      <div className="summary-top"><span className="mini-title">YOUR INPUTS</span><span className="summary-pill">Personalised demo</span></div>
                      <div className="summary-chips">
                        <span><b>Goal</b>{goal}</span>
                        <span><b>Monthly</b>{formatINR(monthly)}</span>
                        <span><b>Comfort</b>{risk}</span>
                        <span><b>Horizon</b>{plan?.horizon ?? '5+ years'}</span>
                      </div>
                    </div>

                    <div className="starting-point-card card">
                      <div className="starting-point-head"><div><div className="mini-title">YOUR SIMPLE START</div><h2>{plan?.title ?? 'Build long-term wealth'}</h2></div><div className="starting-amount">{formatINR(monthly)}<small>/ month</small></div></div>
                      <div className="simple-start-copy">{plan?.oneLiner ?? 'Give compounding more room to work.'}</div>
                      <div className="mini-allocation">{allocationLabels.map((label, i) => <div key={label} className="mini-allocation-row"><span><i style={{ background: allocationColors[i] }} />{label}</span><strong>{split[i]}%</strong></div>)}</div>
                      <div className="prototype-note">This is an educational starting mix, not a product recommendation. In the real Groww flow, this is the point where the user could explore suitable products.</div>
                    </div>
                  </div>

                  <aside className="starting-point-side">
                    <div className="guardrail-card card">
                      <div className="mini-title">BEFORE YOU INVEST</div>
                      <div className="guardrail-line"><span className="check">✓</span><div><b>You don't need to get it perfect.</b><small>You need a plan you understand and can stick with.</small></div></div>
                      <div className="guardrail-line"><span className="check">✓</span><div><b>Short-term drops can happen.</b><small>A lower portfolio value doesn't automatically mean the plan is broken.</small></div></div>
                      <div className="guardrail-line"><span className="check">✓</span><div><b>Your amount should feel sustainable.</b><small>Consistency matters more than stretching your budget.</small></div></div>
                    </div>
                  </aside>
                </div>

                <div className="sticky-cta"><button className="primary" onClick={next}>See my first investment <span>→</span></button></div>
              </section>
            )}

            {step === 5 && (
              <section className="screen first-investment-screen">
                {!hasInvested ? (
                  <>
                    <div className="eyebrow">YOUR FIRST INVESTMENT</div>
                    <div className="investment-hero">
                      <div><h1>Ready for your <span className="green-text">first ₹500?</span></h1><p className="sub">You've made the hard part simpler: you know what you're investing for, how much you can sustain and what the downside looks like.</p></div>
                      <div className="first-investment-badge">01<br /><small>FIRST INVESTMENT</small></div>
                    </div>

                    <div className="first-investment-grid">
                      <div className="investment-card card">
                        <div className="investment-card-top"><span>START WITH</span><strong>₹500</strong></div>
                        <div className="investment-progress"><span style={{ width: '50%' }} /></div>
                        <div className="investment-progress-labels"><span>₹500 invested</span><b>₹1,000 milestone</b></div>
                        <div className="investment-reasons">
                          <div><span className="check">✓</span><div><b>Goal is clear</b><small>{goal ?? 'Long-term wealth'}</small></div></div>
                          <div><span className="check">✓</span><div><b>Amount is sustainable</b><small>{formatINR(monthly)} planned each month</small></div></div>
                          <div><span className="check">✓</span><div><b>Downside is visible</b><small>You know this value can move up and down</small></div></div>
                        </div>
                      </div>

                      <aside className="first-investment-side">
                        <div className="why-invest-card card">
                          <div className="mini-title">WHY START SMALL?</div>
                          <p>Because your first job is not to maximise returns. It's to become comfortable being an investor.</p>
                          <div className="small-callout">A ₹500 first step is easier to understand, review and repeat.</div>
                        </div>
                      </aside>
                    </div>

                    <div className="sticky-cta"><button className="primary" onClick={() => setHasInvested(true)}>Simulate ₹500 investment <span>→</span></button></div>
                    <p className="disclaimer investment-disclaimer">Prototype only. This button simulates the moment a real Groww investment flow would hand off to an existing product/order experience.</p>
                  </>
                ) : (
                  <div className="invested-state completion">
                    <div className="success-ring"><span>✓</span></div>
                    <div className="eyebrow">FIRST STEP COMPLETE</div>
                    <h1>You're officially<br /><span className="green-text">an investor.</span></h1>
                    <p className="sub">₹500 is now your first milestone. The next goal is not to trade more — it's to keep building the habit.</p>
                    <div className="milestone-card card"><div className="milestone-top"><span>YOUR PROGRESS</span><strong>₹500 / ₹1,000</strong></div><div className="investment-progress"><span style={{ width: '50%' }} /></div><div className="milestone-next"><span>Next milestone</span><b>Reach ₹1,000 invested</b></div></div>
                    <div className="next-habit card"><span className="check">✓</span><div><b>Your next step</b><small>Set up a monthly investment you can sustain.</small></div></div>
                    <button className="primary" onClick={() => { setHasInvested(false); setStep(0); }}>Restart the demo</button>
                    <p className="disclaimer">Groww First is a case-study prototype. No real order is placed.</p>
                  </div>
                )}
              </section>
            )}
          </div>
          <footer className="footer">Groww First · Case study prototype</footer>
        </div>
      </div>
    </main>
  );
}
