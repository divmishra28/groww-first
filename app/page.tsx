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

const learningModules = [
  { id: 'risk', title: 'Risk basics', detail: 'Why your portfolio can move up and down.', xp: 20 },
  { id: 'sip', title: 'SIP basics', detail: 'How regular investing builds a habit.', xp: 20 },
  { id: 'diversification', title: 'Diversification', detail: 'Why spreading exposure can reduce concentration risk.', xp: 20 }
] as const;

const learningContent: Record<string, { id: string; title: string; body: string }[]> = {
  risk: [
    {
      id: 'what-is-risk',
      title: 'What is investment risk?',
      body: 'Investment risk is the possibility that the value of your investment changes in a way you did not expect, or that the money is worth less when you need it. Risk is not the same as saying an investment is bad. It is a reminder that outcomes are uncertain. Equity investments can move sharply because company earnings, interest rates, economic growth and investor expectations change. Debt investments can also lose value when rates or credit conditions change. Even a diversified portfolio can decline for a period of time. For a first-time investor, the useful question is not whether an investment has risk; it is whether the amount and type of risk fit the purpose of the money. Money needed soon may need more stability and liquidity. Money intended for a long-term goal may have more time to recover from temporary declines. Understanding that trade-off can make an investment decision feel more deliberate rather than exciting in one moment and stressful in the next.'
    },
    {
      id: 'volatility',
      title: 'Volatility is not the same as a permanent loss',
      body: 'Volatility describes how much an investment value moves up and down over time. A portfolio can fall 8% this month and recover later, so a temporary change in market value is not automatically the same as losing that money permanently. A permanent loss can happen when an investment deteriorates fundamentally, or when an investor is forced to sell at a bad time because the money is needed immediately. The difference matters because the same percentage change can feel very different depending on the goal and time horizon. Watching prices every day can make normal market movement feel like a crisis, especially for someone investing for several years. A calmer approach is to decide in advance how much volatility you can tolerate, keep near-term expenses separate from long-term investments, and review whether the reason for owning an investment has changed. Volatility can still be uncomfortable, but understanding what it represents can reduce the urge to react to every short-term move.'
    },
    {
      id: 'time-horizon',
      title: 'Why time horizon matters',
      body: 'Time horizon is the amount of time you expect to keep the money invested before you need it. It matters because market values can move sharply in the short term, while longer periods can give a portfolio more opportunity to experience different market conditions. For a goal that is only months away, a large decline just before the money is needed can be difficult to absorb. For a goal that is many years away, there may be more time to stay invested through several ups and downs. Time horizon is therefore not a promise that losses will disappear; it is a way to think about how much room you have for uncertainty. A useful starting question is, “When might I actually need this money?” The answer can influence how much equity, debt or other assets you are comfortable holding. If the timing of a goal changes, the investment approach may need to change too. Reviewing horizon alongside the purpose of the money helps turn an abstract risk discussion into a practical decision.'
    },
    {
      id: 'risk-tolerance',
      title: 'Risk tolerance vs. risk capacity',
      body: 'Risk tolerance is about how you feel when your investment value falls. Risk capacity is about whether your finances can actually absorb that fall without forcing you to sell. They are related, but they are not identical. Someone may say they are comfortable with market swings but still need the money for rent, tuition or a near-term purchase, which means their financial capacity for risk is limited. On the other hand, someone with stable cash flow, emergency savings and a long time horizon may have more capacity to stay invested through a temporary decline. A useful investing decision considers both sides. You can test your tolerance by asking how you would react if a portfolio fell 10%, 20% or more for a period. Then separately ask whether your goals, cash reserves and income would allow you to avoid selling under pressure. The aim is not to prove that you are brave. It is to choose a level of risk that you can understand, afford and live with.'
    },
    {
      id: 'inflation-risk',
      title: 'Inflation is also a form of risk',
      body: 'Inflation means prices tend to rise over time, which can reduce what a fixed amount of money can buy. That creates a different kind of risk from seeing your portfolio fall on a particular day. Imagine keeping all of a long-term goal in cash while prices for travel, education or housing rise every year. The number in your account may look stable, but its purchasing power can shrink. This does not mean every investor should chase higher-return assets. It means that the risk of staying too conservative for too long can matter when the goal is several years away. A sensible plan balances the need for stability with the need for the money to have a chance of growing faster than rising costs. The right balance depends on the goal, horizon, cash needs and ability to absorb market fluctuations. Thinking about inflation is especially useful for younger investors because goals like a home, education or long-term financial independence may be many years away.'
    },
    {
      id: 'liquidity-risk',
      title: 'Liquidity risk and why access matters',
      body: 'Liquidity is about how easily you can access your money when you need it without accepting a large disadvantage in price or timing. Liquidity risk matters because a portfolio can be healthy in the long run and still be a poor fit for a goal if the money has to be accessed tomorrow. Before investing, it helps to separate money needed for immediate expenses from money intended for longer-term goals. You should also understand that different investments have different settlement rules, market conditions and potential costs when you sell. For a beginner, this is one reason an emergency fund can be useful before taking significant long-term investment risk. A portfolio designed for a five-year goal should be considered differently from money that might be needed next week. Liquidity does not mean an investment is guaranteed or that every sale happens instantly at a fair value. It simply highlights whether the structure of the investment matches how quickly the money may need to be available.'
    }
  ],
  sip: [
    {
      id: 'what-is-sip',
      title: 'What is a SIP?',
      body: 'A Systematic Investment Plan, or SIP, is a way of investing a chosen amount at regular intervals, often once a month. Instead of deciding each time whether to invest, you set a recurring process that can make investing easier to maintain. For example, someone might choose ₹1,000 on the 10th of every month and continue that plan while their goal and budget remain suitable. A SIP is not an investment product by itself; it is a method for making repeated investments into the product you choose. That distinction matters because starting a SIP does not remove market risk or guarantee returns. The value of the underlying investment can rise or fall. The main benefit of a SIP for a beginner is behavioural: it can reduce the need to time every purchase and create a repeatable habit. A good SIP amount is one you can sustain without damaging your emergency savings or day-to-day budget. The goal is consistency and clarity, not simply setting the highest possible monthly amount.'
    },
    {
      id: 'how-it-works',
      title: 'How a SIP works',
      body: 'Once you set up a SIP, a chosen amount is scheduled to be invested at the frequency and date you selected, subject to the rules of the investment and payment setup. Because market prices change, the amount of units purchased can vary from one instalment to the next. When prices are lower, the same rupee amount may buy more units; when prices are higher, it may buy fewer. This does not mean every month is a bargain or that a SIP guarantees a better return than investing all the money at once. It simply creates a repeatable process that spreads purchases across different points in time. A beginner can think of a SIP as an automation that turns an intention into a habit. It is still important to review the underlying investment, fees, goal, time horizon and affordability. If your income changes or a goal changes, the SIP amount may need to be adjusted. The best SIP is not the one that looks impressive on a screen; it is the one that remains sensible when your real-life budget changes.'
    },
    {
      id: 'staying-consistent',
      title: 'Why consistency matters',
      body: 'The biggest advantage of a recurring investment habit is often behavioural rather than magical. Consistency can help you keep participating in the market without making every investment decision feel like a fresh test of your confidence. A sustainable amount is therefore more useful than a large amount that makes your monthly budget uncomfortable. Imagine two people: one invests ₹2,000 every month for a year, while another invests ₹8,000 for two months and then stops because the amount feels too high. The second person invested more at first, but the plan was less durable. A SIP works best when the amount fits your income, essential expenses, emergency savings and other priorities. Consistency also gives you a regular moment to review whether the plan still matches your goal. It does not protect you from losses, and it should not become a reason to ignore changing circumstances. The practical goal is simple: create a process you can repeat, review and adjust rather than relying on motivation every month.'
    },
    {
      id: 'sip-vs-lumpsum',
      title: 'SIP vs. lump-sum investing',
      body: 'SIP and lump-sum investing are two different ways of putting money to work. With a lump sum, you invest a larger amount at one point in time. With a SIP, you spread contributions across multiple dates. Neither method is automatically better for every situation. The choice depends on when the money becomes available, the investment objective, market conditions, cash-flow needs and the investor’s ability to tolerate uncertainty. A person who receives a regular salary may naturally prefer a monthly SIP because the investment follows their income pattern. Someone who receives a one-time bonus may consider whether a lump sum, a staged approach or a combination makes more sense for their goal. It is also important to understand that spreading purchases over time can reduce the pressure of picking one entry point, but it can also mean some money stays uninvested for longer. For a beginner, the useful question is not which method wins in theory. It is which method fits the source of the money, the goal and the behaviour you can realistically maintain.'
    },
    {
      id: 'choosing-amount-date',
      title: 'Choosing your SIP amount and date',
      body: 'Choosing the SIP amount is mainly a budgeting decision. Start with money that can remain available after essential expenses, emergency savings and important short-term commitments. A common mistake is selecting a large number because it feels productive and then struggling to maintain it. A smaller amount that remains comfortable can be easier to continue and increase later if your income grows. The date can also be chosen to fit your cash flow. Some investors prefer a date shortly after salary is credited so the investment happens before other spending decisions. Others prefer a later date once recurring bills are accounted for. The exact day is less important than making the schedule predictable and affordable. You should also know where the payment will come from and what happens if a payment fails. Over time, you can review the amount as income or goals change. Treat the SIP as one part of your monthly financial system, not as a fixed obligation that can never be changed.'
    },
    {
      id: 'changing-or-stopping',
      title: 'When should you change or stop a SIP?',
      body: 'A SIP is meant to support a goal, not control your life. There are legitimate reasons to change, pause or stop one. Your income may fall, you may need to build an emergency fund, a major expense may arrive, or the goal itself may have changed. The important distinction is between responding to a real change and reacting emotionally to a normal market move. If markets fall for a short period but your goal, horizon and finances remain the same, stopping purely out of fear can break the habit you originally wanted to build. If your circumstances have materially changed, forcing yourself to continue the same amount may be inappropriate. A good review asks three questions: Is the goal still the same? Is the amount still affordable? Does the underlying investment still fit the plan? If the answer to one of these has changed, adjusting the SIP can be sensible. The aim is not perfect continuity; it is a sustainable plan that keeps matching real life.'
    }
  ],
  diversification: [
    {
      id: 'why-diversify',
      title: 'Why diversify?',
      body: 'Diversification means spreading money across different investments so that one company, sector or asset does not determine the outcome of the whole portfolio. The idea is straightforward: if two investments react differently to the same event, combining them can reduce the impact of any single surprise. Diversification does not eliminate risk and it does not guarantee positive returns. It simply changes how concentrated the portfolio is. For example, owning one stock creates a very different risk profile from owning a broad set of companies through several holdings or a diversified fund. A beginner should understand that having many products is not automatically diversification. Ten funds that all own similar large technology companies can still be heavily concentrated. The useful question is, “What different risks do these holdings expose me to?” Good diversification can make a portfolio less dependent on one outcome while still leaving room for growth. The trade-off is that you may also give up some of the upside you would have received from a single winning investment. The objective is resilience, not perfection.'
    },
    {
      id: 'across-assets',
      title: 'Diversifying across asset types',
      body: 'Different asset types can behave differently because they respond to different economic conditions. Equity is generally associated with ownership in businesses and can provide growth over long periods, but its value can move sharply. Debt investments are generally linked to lending or fixed-income claims and can behave differently when rates or credit conditions change. Gold can also react differently from business earnings and interest rates in certain periods. Combining these asset types can reduce the chance that one market event affects every part of the portfolio in exactly the same way. This is why the Groww First prototype separates Equity, Debt and Gold instead of presenting one undifferentiated pool of money. Asset allocation is still a trade-off. Adding more stable assets can reduce the severity of some swings but can also lower growth potential. Increasing equity can raise long-term growth potential while accepting more volatility. The right mix depends on the goal, horizon, cash needs and risk comfort. Diversification is therefore not about collecting everything; it is about deliberately combining different exposures.'
    },
    {
      id: 'within-equity',
      title: 'Diversifying within equity',
      body: 'Equity can be diversified inside the asset class as well. You can spread exposure across companies, industries, company sizes and different investment vehicles. In this prototype, the Equity bucket is split between Stocks and Mutual Funds to show that difference. Direct stocks give you ownership exposure to specific companies, so the outcome can depend heavily on a small number of businesses you choose. Mutual funds can provide exposure to a broader basket of securities, depending on the fund’s strategy. That does not make every mutual fund automatically diversified; some are focused on a single sector, market segment or theme. The useful beginner question is what sits underneath the label. Two products can both be called “equity” while carrying very different concentration risks. A diversified equity approach can spread company-specific shocks across many holdings, but it still remains exposed to overall equity-market movements. Understanding what is inside an investment is therefore more important than counting how many product names appear in a portfolio.'
    },
    {
      id: 'concentration-risk',
      title: 'What is concentration risk?',
      body: 'Concentration risk is the possibility that a large part of your portfolio depends on one investment, company, sector, asset type or theme. A concentrated position can perform extremely well when the specific exposure does well, but it can also cause a large setback when that exposure faces a problem. Beginners can accidentally create concentration without realising it. For example, several funds may hold many of the same large companies, or a portfolio may become dominated by one stock because its price rises sharply. Looking only at the number of products can therefore be misleading. A better check is to look through the products and ask where the underlying money is actually exposed. Concentration is not always wrong; some investors deliberately take a focused view. But it should be an intentional choice rather than an accidental side effect of buying whatever looks popular. Diversification can reduce this risk by spreading exposure, while regular reviews can help you notice when one part of the portfolio has become disproportionately large.'
    },
    {
      id: 'rebalancing',
      title: 'What is rebalancing?',
      body: 'Rebalancing means bringing a portfolio back toward a chosen allocation after markets or contributions change the proportions. Suppose a plan starts with 50% Equity, 30% Debt and 20% Gold. If Equity rises strongly, the portfolio might end up with a larger Equity share even though the original plan has not changed. Rebalancing is the process of deciding whether to reduce the overweight area, increase the underweight areas, or use new contributions to move closer to the intended mix. The goal is not to predict which asset will rise next. It is to keep the portfolio aligned with the role each asset was meant to play. Rebalancing can involve costs, taxes or timing considerations, so it is not necessarily something to do every time prices move. A beginner may find it more useful to define a review rule, such as checking the allocation periodically or after a meaningful life change. Rebalancing is therefore less about constant trading and more about keeping the original plan from drifting silently.'
    },
    {
      id: 'correlation',
      title: 'Why different investments can still move together',
      body: 'Diversification works best when the things you own do not all respond in exactly the same way to the same event. This idea is sometimes described using correlation: how closely two investments tend to move relative to each other. You do not need to calculate a correlation number to understand the concept. Imagine owning three funds that all invest heavily in the same group of companies. Even though you have three fund names, the portfolio may behave like one concentrated position because the underlying exposures overlap. In contrast, combining assets or strategies with different drivers can create more variety in how the portfolio reacts. It is important not to assume that anything with a different label will always move differently. During periods of market stress, many risky assets can decline together. Diversification is about reducing dependence on one particular outcome, not guaranteeing that every holding will move in opposite directions. For a beginner, the practical takeaway is to look beneath the product names and understand what risks are actually being combined.'
    }
  ]
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

const allocationLabels = ['Equity', 'Debt', 'Gold'];
const allocationColors = ['#00d09c', '#d8f3ed', '#181818'];

const equitySubBuckets = [
  { label: 'Stocks', share: 60 },
  { label: 'Mutual Funds', share: 40 },
];

function formatINR(value: number) {
  return `₹${Math.max(0, value).toLocaleString('en-IN')}`;
}

function adjustedSplit(goal: Goal, risk: RiskComfort): [number, number, number] {
  const base = basePlans[goal].split;
  if (risk === 'Keep it steady') return [Math.max(10, base[0] - 15), Math.min(75, base[1] + 15), base[2]];
  if (risk === 'Comfortable with swings') return [Math.min(70, base[0] + 10), Math.max(15, base[1] - 10), base[2]];
  return base;
}

function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(angleInRadians), y: cy + radius * Math.sin(angleInRadians) };
}

function donutArcPath(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [monthly, setMonthly] = useState(3000);
  const [monthlyInput, setMonthlyInput] = useState('');
  const [monthlyEditing, setMonthlyEditing] = useState(false);
  const [monthlyError, setMonthlyError] = useState('');
  const [risk, setRisk] = useState<RiskComfort>('Some ups & downs');
  const [question, setQuestion] = useState('Why this plan?');
  const [hasInvested, setHasInvested] = useState(false);
  const [gamificationTab, setGamificationTab] = useState<'Journey' | 'Learning'>('Journey');
  const [xp, setXp] = useState(0);
  const [earned, setEarned] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [chartTooltip, setChartTooltip] = useState<{ type: 'allocation' | 'performance'; index: number; x: number; y: number } | null>(null);
  const [activeLearningModule, setActiveLearningModule] = useState<string | null>(null);
  const [activeLearningTopic, setActiveLearningTopic] = useState<string | null>(null);

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
  const awardXp = (id: string, points: number) => {
    if (earned.includes(id)) return;
    setEarned((items) => [...items, id]);
    setXp((value) => value + points);
  };

  const journeyPercent = Math.min(100, Math.round((earned.filter((id) => ['goal', 'downside', 'first-investment'].includes(id)).length / 3) * 100));
  const nextLearning = learningModules.find((module) => !earned.includes(`learn-${module.id}`));
  const level = xp >= 200 ? 'Builder' : xp >= 100 ? 'Starter+' : 'Starter';

  return (
    <main className={darkMode ? 'site-shell dark-mode' : 'site-shell'} data-theme={darkMode ? 'dark' : 'light'}>
        <div className="app-frame">
          <header className="topbar">
            <button className={step > 0 ? 'back-btn visible' : 'back-btn'} onClick={back} aria-label="Go back">← <span>Back</span></button>
            <div className="brand" aria-label="Groww First"><img src="/groww.png" alt="Groww" className="brand-logo" /><span className="brand-name">Groww First</span></div>
            <button className="theme-toggle" type="button" onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
              <span>{darkMode ? "☀" : "☾"}</span>{darkMode ? "Light" : "Dark"}
            </button>
          </header>

          <div className="progress" aria-label={`Step ${step + 1} of 6`}>
            {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className={i <= step ? 'progress-line active' : 'progress-line'} />)}
          </div>

          <section className="gamification-hub card" aria-label="Investor Journey">
            <div className="hub-top">
              <div>
                <div className="mini-title">YOUR INVESTOR JOURNEY</div>
                <div className="hub-title"><strong>{journeyPercent}% complete</strong><span>{level} · {xp} XP</span></div>
              </div>
              <div className="xp-chip">{xp} XP</div>
            </div>
            <div className="journey-bar"><span style={{ width: `${journeyPercent}%` }} /></div>
            <div className="hub-tabs">
              {(['Journey', 'Learning'] as const).map((tab) => (
                <button key={tab} className={gamificationTab === tab ? 'hub-tab active' : 'hub-tab'} onClick={() => setGamificationTab(tab)}>{tab}</button>
              ))}
            </div>
            {gamificationTab === 'Journey' && (
              <div className="journey-preview">
                <div className={earned.includes('goal') ? 'journey-item done' : 'journey-item'}><span>{earned.includes('goal') ? '✓' : '1'}</span><div><b>Know your goal</b><small>Start with what this money is for.</small></div><strong>+25 XP</strong></div>
                <div className={earned.includes('downside') ? 'journey-item done' : 'journey-item'}><span>{earned.includes('downside') ? '✓' : '2'}</span><div><b>Understand the downside</b><small>Know what can go wrong before investing.</small></div><strong>+40 XP</strong></div>
                <div className={earned.includes('first-investment') ? 'journey-item done' : 'journey-item'}><span>{earned.includes('first-investment') ? '✓' : '3'}</span><div><b>Make your first ₹500</b><small>Turn understanding into action.</small></div><strong>+100 XP</strong></div>
              </div>
            )}
            {gamificationTab === 'Learning' && (
              <div className="learning-list">
                {learningModules.map((module) => (
                  <button key={module.id} className={earned.includes(`learn-${module.id}`) ? 'learning-card complete' : 'learning-card'} onClick={() => { awardXp(`learn-${module.id}`, module.xp); setActiveLearningModule(module.id); setActiveLearningTopic(learningContent[module.id][0].id); }}>
                    <span className="learning-icon">{earned.includes(`learn-${module.id}`) ? '✓' : '✦'}</span>
                    <span><b>{module.title}</b><small>{module.detail}</small></span>
                    <strong>+{module.xp} XP</strong>
                  </button>
                ))}
              </div>
            )}
            {nextLearning ? <div className="next-learning"><span>NEXT TO LEARN</span><b>{nextLearning.title}</b><small>{nextLearning.xp} XP waiting</small></div> : <div className="next-learning complete"><span>LEARNING COMPLETE</span><b>You’ve completed the current learning set.</b><small>Keep investing consistently and building the habit.</small></div>}
          </section>

          <div key={step} className="step-transition">
            {step === 0 && (
              <section className="screen first-screen">
                <div className="first-intro">
                  <div className="eyebrow">Groww First · First Investment</div>
                  <div className="hero-kicker">Groww helps you <span>pick a product.</span></div>
                  <h1>Your first paycheck deserves a <span className="green-text">starting point.</span></h1>
                  <p className="sub hero-sub">Tell us what you’re trying to do with your money. We’ll turn it into a simple plan you can actually understand.</p>
                </div>

                <div className="first-grid">
                  <div className="first-main">
                    <div className="section-label">1. What are you investing for?</div>
                    <div className="goal-list">
                      {(Object.keys(goalMeta) as Goal[]).map((g) => (
                        <button key={g} className={goal === g ? 'goal-card selected' : 'goal-card'} onClick={() => { setGoal(g); awardXp('goal', 25); }}>
                          <span className="goal-icon">{goalMeta[g].icon}</span>
                          <span className="goal-copy"><strong>{g}</strong><small>{goalMeta[g].caption}</small></span>
                          <span className="radio">{goal === g ? '✓' : ''}</span>
                        </button>
                      ))}
                    </div>

                    <div className="section-label income-title">2. What feels comfortable to invest each month?</div>
                    <div className="amount-card">
                      <div className="amount-head">
                        <span>Monthly investment</span>
                        <label className={monthlyError ? 'monthly-input-wrap has-error' : 'monthly-input-wrap'} aria-label="Monthly investment amount">
                          <span aria-hidden="true">₹</span>
                          <input
                            className="monthly-input"
                            type="number"
                            inputMode="numeric"
                            min="500"
                            max="1000000"
                            step="1"
                            value={monthlyEditing ? monthlyInput : String(monthly)}
                            placeholder={monthlyEditing ? '' : undefined}
                            onFocus={() => {
                              if (!monthlyEditing) {
                                setMonthlyEditing(true);
                                setMonthlyInput('');
                                setMonthlyError('');
                              }
                            }}
                            onChange={(e) => {
                              setMonthlyInput(e.target.value);
                              setMonthlyError('');
                            }}
                            onBlur={() => {
                              const raw = monthlyInput.trim();
                              const parsed = raw === '' ? NaN : Number(raw);
                              if (!Number.isFinite(parsed) || parsed < 500 || parsed > 1000000) {
                                setMonthlyError('Enter an amount between ₹500 and ₹10,00,000.');
                                return;
                              }
                              setMonthly(parsed);
                              setMonthlyEditing(false);
                              setMonthlyInput('');
                              setMonthlyError('');
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                (e.currentTarget as HTMLInputElement).blur();
                              }
                              if (e.key === 'Escape') {
                                setMonthlyEditing(false);
                                setMonthlyInput('');
                                setMonthlyError('');
                                (e.currentTarget as HTMLInputElement).blur();
                              }
                            }}
                            aria-invalid={Boolean(monthlyError)}
                          />
                        </label>
                      </div>
                      <input className="range" type="range" min="500" max="1000000" step="1000" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} aria-label="Monthly investment slider" />
                      <div className="range-labels"><span>₹500</span><span>₹10,00,000</span></div>
                      {monthlyError && <div className="monthly-error" role="alert">{monthlyError}</div>}
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

                <div className="mobile-trust">No account needed · Takes about 2 minutes · Prototype</div>
                <div className="sticky-cta"><button className="primary" disabled={!goal} onClick={next}>Build my first plan <span>→</span></button></div>
              </section>
            )}

            {step === 1 && (
              <section className="screen">
                <div className="eyebrow">YOUR STARTING PLAN</div>
                <div className="title-row"><div><h1>{plan?.title}</h1><p className="sub compact">Based on a {plan?.horizon.toLowerCase()} goal, {formatINR(monthly)} a month and “{risk}”.</p></div><div className="spark">✦</div></div>

                <div className="plan-desktop-grid">
                  <div className="plan-visual card">
                    <div className="plan-visual-top"><span>Monthly mix</span></div>
                    <div className="donut-wrap">
                      <div className="donut-interactive">
                        <svg viewBox="0 0 220 220" className="donut-svg" aria-label="Interactive monthly allocation chart">
                          {(() => {
                            let cursor = 0;
                            return split.map((pct, i) => {
                              const start = cursor * 3.6;
                              const end = (cursor + pct) * 3.6;
                              cursor += pct;
                              return <path key={allocationLabels[i]} d={donutArcPath(110, 110, 96, start, end)} fill={allocationColors[i]} className={chartTooltip?.type === 'allocation' && chartTooltip.index === i ? 'donut-segment active' : 'donut-segment'} onMouseEnter={() => setChartTooltip({ type: 'allocation', index: i, x: 50, y: 8 })} onMouseLeave={() => setChartTooltip(null)} onFocus={() => setChartTooltip({ type: 'allocation', index: i, x: 50, y: 8 })} onBlur={() => setChartTooltip(null)} tabIndex={0} />;
                            });
                          })()}
                          <circle cx="110" cy="110" r="58" className="donut-center" />
                        </svg>
                        <div className="donut-hole"><strong>{formatINR(monthly)}</strong><span>per month</span></div>
                        {chartTooltip?.type === 'allocation' && <div className="chart-tooltip donut-tooltip"><b>{allocationLabels[chartTooltip.index]}</b><span>{split[chartTooltip.index]}% · {formatINR(Math.round(monthly * split[chartTooltip.index] / 100))}</span>{chartTooltip.index === 0 && <small>Stocks {Math.round(equitySubBuckets[0].share)}% · Mutual Funds {Math.round(equitySubBuckets[1].share)}%</small>}</div>}
                      </div>
                      <div className="allocation-list">
                        {allocationLabels.map((label, i) => (
                          <div key={label}>
                            <div className="allocation-row" onMouseEnter={() => setChartTooltip({ type: 'allocation', index: i, x: 50, y: 8 })} onMouseLeave={() => setChartTooltip(null)}><span className="allocation-name"><i style={{ background: allocationColors[i] }} />{label}</span><strong>{formatINR(Math.round(monthly * split[i] / 100))}</strong></div>
                            {label === 'Equity' && <div className="allocation-sublist">
                              {equitySubBuckets.map((bucket) => <div className="allocation-subrow" key={bucket.label}><span>{bucket.label}</span><strong>{formatINR(Math.round(monthly * split[i] * bucket.share / 10000))}</strong></div>)}
                            </div>}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="stacked-bar">{split.map((pct, i) => <span key={i} style={{ width: `${pct}%`, background: allocationColors[i] }} />)}</div>
                  </div>

                  <div className="plan-side">
                    <div className="reason-card card"><div className="assistant-mark">g</div><div><div className="mini-title">WHY THIS MIX?</div><p>{plan?.note}</p></div></div>
                    <div className="info-strip"><span>Goal</span><b>{goal}</b><span className="dot">•</span><span>Horizon</span><b>{plan?.horizon}</b></div>
                    <div className="education-card card"><div className="mini-title">WHAT EACH BUCKET DOES</div><div><b>Equity</b><span>Growth exposure, split between stocks and mutual funds.</span><em>Stocks 60% · Mutual Funds 40%</em></div><div><b>Debt</b><span>Helps reduce portfolio swings.</span></div><div><b>Gold</b><span>Can behave differently from equities.</span></div></div>
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
                      <div className="chart-head"><div><span className="muted small">Value after {years} years</span><strong>{formatINR(illustrative)}</strong></div><span className="horizon-pill">Demo · not a forecast</span></div>
                      <div className="chart-wrap">
                        <svg viewBox="0 0 600 220" className="chart" role="img" aria-label="Interactive illustrative investment path">
                          <defs><linearGradient id="areaFade" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#00d09c" stopOpacity=".22"/><stop offset="100%" stopColor="#00d09c" stopOpacity="0"/></linearGradient></defs>
                          <path d={`M10 184 L${chartPoints} L590 205 L10 205 Z`} fill="url(#areaFade)" />
                          <path d={`M10 184 L${chartPoints}`} fill="none" stroke="#00a980" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                          <line x1="10" y1="205" x2="590" y2="205" stroke="#ddd" />
                          <line x1="10" y1="145" x2="590" y2="145" stroke="#eee" strokeDasharray="4 6" />
                          <line x1="10" y1="85" x2="590" y2="85" stroke="#eee" strokeDasharray="4 6" />
                          {chartPoints.split(',').map((point, i) => {
                            const [x, y] = point.trim().split(' ').map(Number);
                            const pointValue = Math.round(invested * (0.9 + ((184 - y) / 150) * 0.55));
                            return <circle key={`${x}-${y}`} cx={x} cy={y} r={chartTooltip?.type === 'performance' && chartTooltip.index === i ? 7 : 5} fill="#00a980" className="chart-point" onMouseEnter={() => setChartTooltip({ type: 'performance', index: i, x: x / 6, y: y / 2.2 })} onMouseLeave={() => setChartTooltip(null)} onFocus={() => setChartTooltip({ type: 'performance', index: i, x: x / 6, y: y / 2.2 })} onBlur={() => setChartTooltip(null)} tabIndex={0} />;
                          })}
                        </svg>
                        {chartTooltip?.type === 'performance' && (() => { const point = chartPoints.split(',')[chartTooltip.index].trim().split(' ').map(Number); const value = Math.round(invested * (0.9 + ((184 - point[1]) / 150) * 0.55)); return <div className="chart-tooltip performance-tooltip" style={{ left: `${chartTooltip.x}%`, top: `${Math.max(4, chartTooltip.y - 13)}%` }}><b>{chartTooltip.index === 0 ? 'Start' : `Point ${chartTooltip.index}`}</b><span>{formatINR(value)}</span><small>Illustrative only · not a forecast</small></div>; })()}
                      </div>
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
                <div className="sticky-cta"><button className="primary" onClick={() => { awardXp('downside', 40); next(); }}>I understand <span>→</span></button></div>
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
                <p className="disclaimer">Groww First does not place real orders.</p>
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
                      <div className="mini-allocation">{allocationLabels.map((label, i) => <div key={label}><div className="mini-allocation-row"><span><i style={{ background: allocationColors[i] }} />{label}</span><strong>{split[i]}%</strong></div>{label === 'Equity' && <div className="mini-suballocation"><span>Stocks {Math.round(split[i] * 0.6)}%</span><span>Mutual Funds {Math.round(split[i] * 0.4)}%</span></div>}</div>)}</div>
                      <div className="prototype-note"></div>
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

                    <div className="sticky-cta"><button className="primary" onClick={() => { setHasInvested(true); awardXp('first-investment', 100); }}>Simulate ₹500 investment <span>→</span></button></div>
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
                    
                  </div>
                )}
              </section>
            )}
          </div>
          <footer className="footer">Groww First · Prototype</footer>

          {activeLearningModule && (
            <div className="learning-modal-backdrop" role="presentation" onMouseDown={() => { setActiveLearningModule(null); setActiveLearningTopic(null); }}>
              <div className="learning-modal card" role="dialog" aria-modal="true" aria-labelledby="learning-modal-title" onMouseDown={(event) => event.stopPropagation()}>
                <div className="learning-modal-head">
                  <div>
                    <div className="mini-title">LEARN</div>
                    <h2 id="learning-modal-title">{learningModules.find((module) => module.id === activeLearningModule)?.title}</h2>
                  </div>
                  <button className="modal-close" type="button" onClick={() => { setActiveLearningModule(null); setActiveLearningTopic(null); }} aria-label="Close learning module">×</button>
                </div>

                <div className="learning-topic-list">
                  {learningContent[activeLearningModule].map((topic) => (
                    <button key={topic.id} type="button" className={activeLearningTopic === topic.id ? 'learning-topic active' : 'learning-topic'} onClick={() => setActiveLearningTopic(topic.id)}>
                      <span>{activeLearningTopic === topic.id ? '✓' : '→'}</span>
                      <b>{topic.title}</b>
                    </button>
                  ))}
                </div>

                {activeLearningTopic && (
                  <div className="learning-topic-content">
                    <div className="learning-topic-label">WHAT TO KNOW</div>
                    <h3>{learningContent[activeLearningModule].find((topic) => topic.id === activeLearningTopic)?.title}</h3>
                    <p>{learningContent[activeLearningModule].find((topic) => topic.id === activeLearningTopic)?.body}</p>
                  </div>
                )}

                <div className="learning-modal-foot">+{learningModules.find((module) => module.id === activeLearningModule)?.xp} XP added to your learning progress</div>
              </div>
            </div>
          )}
        </div>
    </main>
  );
}
