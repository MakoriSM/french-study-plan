import { useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const schedule = {
  Monday: {
    total: "2h",
    blocks: [
      { time: "20 min", activity: "Anki", type: "vocab", desc: "Review deck + learn 10–15 new holiday phrases" },
      { time: "25 min", activity: "Podcast / Listening", type: "listening", desc: "InnerFrench or Journal en français facile — listen once freely, then replay tricky sections" },
      { time: "20 min", activity: "Grammar drills", type: "grammar", desc: "One focused topic from your class or textbook (e.g. passé composé, pronoms)" },
      { time: "15 min", activity: "Shadowing", type: "speaking", desc: "Replay a podcast clip and speak along, mimicking rhythm and pronunciation" },
      { time: "20 min", activity: "Holiday scenario practice", type: "speaking", desc: "Talk through a scenario aloud: ordering food, asking directions, checking in" },
      { time: "10 min", activity: "Journal", type: "writing", desc: "Write 5–8 sentences in French about your day. Keep it simple." },
    ],
  },
  Tuesday: {
    total: "2h",
    blocks: [
      { time: "20 min", activity: "Anki", type: "vocab", desc: "Review due cards + add new words from yesterday's listening" },
      { time: "30 min", activity: "French class", type: "class", desc: "Evening class (or class homework / textbook exercises if class is another day)" },
      { time: "25 min", activity: "TV / Film in French", type: "listening", desc: "Watch something you enjoy with French audio + French subtitles" },
      { time: "20 min", activity: "Conversation with friend", type: "conversation", desc: "15–20 min call or in-person chat. Give them a topic in advance so you both know what to talk about" },
      { time: "15 min", activity: "Review & note mistakes", type: "review", desc: "Write down things you couldn't say or got wrong. Add to Anki." },
    ],
  },
  Wednesday: {
    total: "2h",
    blocks: [
      { time: "20 min", activity: "Anki", type: "vocab", desc: "Review deck — should be getting faster as cards mature" },
      { time: "25 min", activity: "Podcast / Listening", type: "listening", desc: "New episode. Try a slightly harder one this week if last week felt easy" },
      { time: "20 min", activity: "Grammar drills", type: "grammar", desc: "Continue this week's grammar focus. Do exercises, then make your own example sentences" },
      { time: "20 min", activity: "Shadowing", type: "speaking", desc: "New clip. Focus on the sounds you find hardest (r, u, nasal vowels)" },
      { time: "20 min", activity: "Holiday scenario practice", type: "speaking", desc: "Different scenario from Monday. Build your phrasebook as you go" },
      { time: "10 min", activity: "Journal", type: "writing", desc: "Write about what you want to do on your holiday — practice future tense" },
    ],
  },
  Thursday: {
    total: "2h",
    blocks: [
      { time: "20 min", activity: "Anki", type: "vocab", desc: "Review + learn new set of holiday vocabulary" },
      { time: "30 min", activity: "French class", type: "class", desc: "Evening class (or prep / homework if class is a different day)" },
      { time: "25 min", activity: "TV / Film in French", type: "listening", desc: "Continue what you started Tuesday, or try a French YouTube vlog" },
      { time: "20 min", activity: "Conversation with cousin", type: "conversation", desc: "Same format: short, focused, in French. Different person = different speaking style to adapt to" },
      { time: "15 min", activity: "Review & note mistakes", type: "review", desc: "Capture gaps from conversation. These become tomorrow's Anki cards" },
    ],
  },
  Friday: {
    total: "2h",
    blocks: [
      { time: "20 min", activity: "Anki", type: "vocab", desc: "End-of-week review — you should notice cards getting easier" },
      { time: "25 min", activity: "Podcast / Listening", type: "listening", desc: "Re-listen to Monday or Wednesday's episode. Notice how much more you catch" },
      { time: "25 min", activity: "Extended speaking", type: "speaking", desc: "Record yourself talking for 3–5 minutes on a topic. Listen back. Note what felt hard" },
      { time: "20 min", activity: "Grammar drills", type: "grammar", desc: "Quick review of the week's grammar. Quiz yourself without notes" },
      { time: "20 min", activity: "Holiday scenario practice", type: "speaking", desc: "Run through 3 scenarios back-to-back like a rehearsal — simulate a real day abroad" },
      { time: "10 min", activity: "Weekly reflection", type: "review", desc: "What improved? What's still hard? Adjust next week's focus areas" },
    ],
  },
  Saturday: {
    total: "1h",
    blocks: [
      { time: "15 min", activity: "Anki", type: "vocab", desc: "Light review only — no new cards on weekends" },
      { time: "30 min", activity: "Immersion: film, show, or music", type: "listening", desc: "Watch or listen to something fun. This is your reward session — enjoy it" },
      { time: "15 min", activity: "Journal or voice note", type: "writing", desc: "Write or record yourself summarising what you watched" },
    ],
  },
  Sunday: {
    total: "1h",
    blocks: [
      { time: "15 min", activity: "Anki", type: "vocab", desc: "Light review — keep the streak alive" },
      { time: "25 min", activity: "Re-watch or re-listen", type: "listening", desc: "Revisit something from earlier in the week. Consolidation matters" },
      { time: "20 min", activity: "Plan the week ahead", type: "review", desc: "Pick next week's grammar topic, queue podcast episodes, text your friend & cousin to schedule chats" },
    ],
  },
};

const typeColors = {
  vocab: { bg: "#FEF3C7", fg: "#92400E", border: "#FDE68A", icon: "📇" },
  listening: { bg: "#DBEAFE", fg: "#1E40AF", border: "#BFDBFE", icon: "🎧" },
  grammar: { bg: "#F3E8FF", fg: "#6B21A8", border: "#E9D5FF", icon: "📐" },
  speaking: { bg: "#FEE2E2", fg: "#991B1B", border: "#FECACA", icon: "🗣" },
  conversation: { bg: "#D1FAE5", fg: "#065F46", border: "#A7F3D0", icon: "💬" },
  writing: { bg: "#FFF7ED", fg: "#9A3412", border: "#FED7AA", icon: "✏️" },
  review: { bg: "#F1F5F9", fg: "#334155", border: "#E2E8F0", icon: "🔄" },
  class: { bg: "#FCE7F3", fg: "#9D174D", border: "#FBCFE8", icon: "🏫" },
};

const guideContent = {
  vocab: {
    title: "Anki & Vocabulary Guide",
    sections: [
      {
        heading: "Your two-deck system",
        body: "Start with the pre-made \"French 5000 Most Common Words\" deck as your base. Immediately suspend everything above the first 1000 words — at late A2 you already know 600–800 of these, so you're filling gaps, not starting from scratch. Skip cards you know confidently.\n\nThen create a personal deck called \"Mon français.\" This is where everything from your real practice goes: phrases you couldn't say during conversations, words from podcasts, expressions from class. This deck will quickly become more valuable than the pre-made one because it targets your actual gaps."
      },
      {
        heading: "Words vs phrases",
        body: "Lean heavily toward full phrases. A card that says \"la carte\" is fine, but \"Est-ce qu'on pourrait avoir la carte, s'il vous plaît?\" is ten times more useful because you're learning the word inside a sentence you'd actually say.\n\nFor every isolated word, put an example sentence on the back. For your personal deck, put what you wanted to say in English on the front, and the French on the back — this trains production, not just recognition."
      },
      {
        heading: "Daily rhythm",
        body: "Weekdays: review all due cards + add 10–15 new items.\nWeekends: review only, no new cards. Let your brain consolidate.\n\nAfter each conversation session (Tue/Thu), immediately add 5–8 things you couldn't say. After each podcast session, add 5–8 new words or phrases. This feeds the system — your practice generates your study material."
      }
    ]
  },
  listening: {
    title: "Listening & Immersion Guide",
    sections: [
      {
        heading: "Focused listening (weekday podcasts)",
        body: "Use a three-pass method:\n\nFirst listen: no subtitles, no pausing. Just get the gist — what's the topic, what's the main point? Don't panic about what you miss.\n\nSecond listen: pause when you hear something you almost understand but not quite. Write it down phonetically if you have to. Look it up. Limit yourself to 5–8 new Anki items per session or you'll drown.\n\nThird listen: follow along with the transcript (InnerFrench and most learner podcasts provide them). Connect what you heard to what was actually said.\n\nDon't do all three passes in one session. Do passes 1–2 on the day, use the re-listen slots (Friday/Sunday) for pass 3."
      },
      {
        heading: "Immersion listening (weekend TV/film)",
        body: "Use French audio with French subtitles. Not English subs — they become a crutch and your brain just reads the English. French subs let you connect sounds to words.\n\nPick something you'd genuinely enjoy. Don't take notes. Just watch and let your brain absorb patterns without pressure. This is your reward session."
      },
      {
        heading: "Recommended resources",
        body: "Podcasts: InnerFrench (clear, intermediate-friendly), Journal en français facile (news, slightly harder), Français Authentique (conversational)\n\nTV: Switch Netflix audio to French on shows you already know. French originals like \"Lupin\" or \"Dix pour cent\" (Call My Agent) work well.\n\nYouTube: French vloggers give you natural, everyday speech — search for topics you're interested in + \"en français\""
      }
    ]
  },
  speaking: {
    title: "Speaking, Shadowing & Scenarios Guide",
    sections: [
      {
        heading: "How shadowing works",
        body: "Find a short clip — 30 seconds to 2 minutes of natural-pace speech. A podcast excerpt or YouTube clip works well.\n\n1. Play one sentence, pause, repeat it aloud — match the melody, rhythm, and mouth feel, not just the words\n2. Move to the next sentence\n3. Once you've done the whole clip sentence-by-sentence, play it all and speak along in real time, slightly behind the speaker\n\nThis isn't about comprehension — it's muscle memory. Focus on sounds that don't exist in English: the French \"r,\" the \"u\" vs \"ou\" distinction, nasal vowels. It will feel silly. That's normal."
      },
      {
        heading: "Scenario practice: how to fill 20 minutes",
        body: "Play both roles. Be the waiter and the customer. Ask yourself follow-up questions. When you get stuck and can't say something, write it down in English — that becomes homework to look up and add to Anki.\n\nIf you run dry, restart the scenario with a complication: the restaurant doesn't have what you wanted, you missed your train, the pharmacist doesn't understand you.\n\nOn Fridays, run 3 scenarios back-to-back like a dress rehearsal for a real day abroad."
      },
      {
        heading: "Scenario bank (8 weeks' worth)",
        body: "Week 1: Checking into a hotel · Ordering at a restaurant\nWeek 2: Getting directions when lost · Buying train/bus tickets\nWeek 3: Small talk at a café/bar · Complaining about your room\nWeek 4: Shopping at a market · Asking locals for recommendations\nWeek 5: Making a reservation by phone · Returning something at a shop\nWeek 6: Explaining a problem at a pharmacy · Describing your job to a stranger\nWeek 7: Talking about what you did yesterday · Explaining tomorrow's plans\nWeek 8: Asking about opening hours/events · Full day simulation (chain all scenarios)"
      }
    ]
  },
  conversation: {
    title: "Conversation Practice Guide",
    sections: [
      {
        heading: "How to structure the sessions",
        body: "Text your friend/cousin a topic in advance so you both know what to talk about. This removes the awkward \"so... what do we say?\" moment.\n\nGood topics to rotate through: what you did last weekend, your holiday plans, a film or show you watched, food and cooking, describing your neighbourhood, something in the news, a childhood memory.\n\nKeep it to 15–20 minutes. Short and focused beats long and aimless."
      },
      {
        heading: "Ask them to be helpfully difficult",
        body: "Their natural instinct will be to switch to English when you hesitate, or fill in words for you. Ask them explicitly to:\n\n• Stay in French and let you struggle a bit\n• Only help when you're genuinely stuck\n• Correct your biggest mistakes (not every small one — that kills flow)\n• Speak at a natural pace, not artificially slowly\n\nThe productive discomfort of searching for a word is where the learning happens. If they rescue you every time, you never build that muscle."
      },
      {
        heading: "The 15-minute review after",
        body: "Immediately after each conversation, sit down and write:\n\n• 3–5 things I wanted to say but couldn't\n• 2–3 corrections they gave me\n• 1 thing that went better than last time\n\nThe first two become Anki cards. The third keeps you motivated. This review is what turns a nice chat into actual learning."
      }
    ]
  },
  grammar: {
    title: "Grammar Guide (no textbook needed)",
    sections: [
      {
        heading: "Your free tools",
        body: "Kwiziq French: free online grammar platform that assesses your level and gives exercises by CEFR level. Filter for A2/B1 content.\n\nFrançais avec Pierre (YouTube): excellent short grammar explanations in simple French — good for learning grammar in French, which is a double win.\n\nLanguageGuide.org and Lingolia French are also solid for quick reference and practice exercises."
      },
      {
        heading: "One topic per week, three sessions deep",
        body: "Don't jump between topics. Pick one grammar point per week and go deep:\n\nDay 1 (Mon): Learn the rule, do basic fill-in-the-blank exercises\nDay 2 (Wed): Harder exercises, write your own example sentences using the rule\nDay 3 (Fri): Quiz yourself without notes. Try to use the grammar point in your journal or speaking practice\n\nThis spaced approach locks things in far better than skimming five topics in a week."
      },
      {
        heading: "8-week grammar roadmap",
        body: "Week 1: Passé composé (what happened — \"j'ai mangé,\" \"je suis allé\")\nWeek 2: Imparfait (descriptions & habits — \"il faisait beau,\" \"je mangeais\")\nWeek 3: Passé composé vs imparfait together (the hard part — when to use which)\nWeek 4: Future proche + future simple (plans — \"je vais visiter,\" \"je visiterai\")\nWeek 5: Object pronouns (le, la, les, lui, leur — stop repeating the noun every time)\nWeek 6: Conditional for politeness (\"je voudrais,\" \"pourriez-vous,\" \"ce serait possible\")\nWeek 7: Question formation (inversion, est-ce que, intonation — ask things naturally)\nWeek 8: Review week — revisit the weakest two topics from weeks 1–7"
      }
    ]
  },
  writing: {
    title: "Writing & Journaling Guide",
    sections: [
      {
        heading: "How to journal in French",
        body: "Write 5–8 sentences about your day, your plans, or your opinions. Keep it simple — the goal is to practise producing French, not to write literature.\n\nUse it to practise the week's grammar topic. If you're working on passé composé, write about what you did. Future tense week? Write about your holiday plans.\n\nDon't look things up while writing. Write what you can, leave gaps or English words where you're stuck, then go back and fill them in afterwards. The gap-filling is where the learning is."
      },
      {
        heading: "Voice notes as an alternative",
        body: "On days when writing feels like a chore, record a voice note on your phone instead. Same idea — describe your day or summarise what you watched. Then listen back.\n\nHearing your own French played back is uncomfortable but incredibly useful. You'll notice hesitations and patterns you don't catch in real time."
      }
    ]
  },
  review: {
    title: "Review & Planning Guide",
    sections: [
      {
        heading: "Post-conversation review (Tue/Thu)",
        body: "Immediately after speaking with your friend or cousin:\n\n1. Write 3–5 things you wanted to say but couldn't\n2. Write 2–3 corrections they gave you\n3. Note 1 thing that went better than last time\n\nItems 1 and 2 become Anki cards (as full phrases). Item 3 is your motivation fuel."
      },
      {
        heading: "Weekly reflection (Friday)",
        body: "Take 10 minutes to honestly assess:\n\n• What improved this week?\n• What's still hard?\n• Did I actually do every session, or did I skip things?\n• What should I focus more on next week?\n\nAdjust the following week's emphasis based on this. If listening felt easy but speaking was painful, shift 10 minutes from listening to speaking. The plan should evolve as you do."
      },
      {
        heading: "Sunday planning session",
        body: "This is the session that makes the whole week work. In 20 minutes:\n\n1. Pick next week's grammar topic (follow the 8-week roadmap)\n2. Queue up podcast episodes so they're ready to go\n3. Text your friend and cousin to confirm conversation times\n4. Choose 2 speaking scenarios from the scenario bank\n5. Skim your Anki stats — are you keeping up, or building a backlog?\n\nWhen Monday comes, you sit down and know exactly what to do. No decisions, no friction."
      }
    ]
  },
  class: {
    title: "French Class Guide",
    sections: [
      {
        heading: "What to look for in London",
        body: "Look for classes at A2/B1 level that meet once or twice a week in the evening. Good options to search for: Alliance Française de Londres, Institut Français, City Lit, and local community centres.\n\nPrioritise classes that emphasise conversation over grammar lectures — you're handling grammar on your own. A class of 6–12 people is ideal: small enough to get speaking time, large enough to be social."
      },
      {
        heading: "How to get the most from class",
        body: "Class is your social anchor and accountability tool, but don't rely on it as your main learning. Group classes give each student maybe 5–10 minutes of actual speaking time per session.\n\nAlways do the homework — it's easy to skip, but it's free structured practice. If the class feels too easy or too hard after 2–3 sessions, switch. You don't have time to waste at the wrong level."
      }
    ]
  }
};

export default function FrenchStudyPlan() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("french-plan-checks") || "{}");
      const savedDate = localStorage.getItem("french-plan-date");
      const today = new Date().toDateString();
      if (savedDate !== today) {
        localStorage.setItem("french-plan-date", today);
        localStorage.removeItem("french-plan-checks");
        return {};
      }
      return saved;
    } catch { return {}; }
  });
  const [activeGuide, setActiveGuide] = useState(null);

  const toggleCheck = (day, idx) => {
    const key = `${day}-${idx}`;
    setCheckedItems((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem("french-plan-checks", JSON.stringify(next));
        localStorage.setItem("french-plan-date", new Date().toDateString());
      } catch {}
      return next;
    });
  };

  const day = schedule[selectedDay];
  const isWeekend = selectedDay === "Saturday" || selectedDay === "Sunday";
  const completedToday = day.blocks.filter((_, i) => checkedItems[`${selectedDay}-${i}`]).length;
  const totalToday = day.blocks.length;

  const GuidePanel = ({ type, onClose }) => {
    const guide = guideContent[type];
    if (!guide) return null;
    const colors = typeColors[type];

    return (
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}>
        <div
          onClick={onClose}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
          }}
        />
        <div style={{
          position: "relative",
          width: "100%",
          maxWidth: 560,
          maxHeight: "80vh",
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 24px 48px rgba(0,0,0,0.18)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            padding: "20px 24px 16px",
            borderBottom: `2px solid ${colors.border}`,
            background: colors.bg,
            flexShrink: 0,
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{colors.icon}</span>
                <h2 style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: colors.fg,
                  fontFamily: "'Newsreader', Georgia, serif",
                }}>
                  {guide.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 22,
                  cursor: "pointer",
                  color: "#999",
                  padding: "0 4px",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          </div>
          <div style={{
            padding: "20px 24px 28px",
            overflowY: "auto",
            flex: 1,
          }}>
            {guide.sections.map((section, i) => (
              <div key={i} style={{ marginBottom: i < guide.sections.length - 1 ? 24 : 0 }}>
                <h3 style={{
                  fontSize: 14,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: colors.fg,
                  margin: "0 0 8px 0",
                  fontFamily: "system-ui, sans-serif",
                }}>
                  {section.heading}
                </h3>
                <div style={{
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  color: "#333",
                  fontFamily: "system-ui, sans-serif",
                  whiteSpace: "pre-line",
                }}>
                  {section.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      fontFamily: "'Newsreader', 'Georgia', serif",
      maxWidth: 680,
      margin: "0 auto",
      padding: "24px 16px",
      color: "#1a1a1a",
    }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{
          fontSize: 22,
          fontWeight: 700,
          margin: "0 0 2px 0",
          letterSpacing: "-0.02em",
        }}>
          Plan d'étude — 8 semaines avant les vacances
        </h1>
        <p style={{
          fontSize: 14,
          color: "#666",
          margin: 0,
          fontStyle: "italic",
        }}>
          Late A2 → confident holiday French · {isWeekend ? "1 hour" : "2 hours"} / day
        </p>
      </div>

      <div style={{
        display: "flex",
        gap: 4,
        marginBottom: 24,
        overflowX: "auto",
        paddingBottom: 4,
      }}>
        {DAYS.map((d) => {
          const isSelected = d === selectedDay;
          const isWe = d === "Saturday" || d === "Sunday";
          const dayCompleted = schedule[d].blocks.filter((_, i) => checkedItems[`${d}-${i}`]).length;
          const dayTotal = schedule[d].blocks.length;
          const allDone = dayCompleted === dayTotal && dayTotal > 0;

          return (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              style={{
                flex: "1 1 0",
                minWidth: 72,
                padding: "10px 6px 8px",
                border: isSelected ? "2px solid #1a1a1a" : "1.5px solid #e0e0e0",
                borderRadius: 10,
                background: isSelected ? "#1a1a1a" : allDone ? "#f0fdf4" : "#fff",
                color: isSelected ? "#fff" : "#1a1a1a",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.02em" }}>
                {d.slice(0, 3).toUpperCase()}
              </span>
              <span style={{
                fontSize: 10,
                color: isSelected ? "#aaa" : "#999",
                fontFamily: "system-ui, sans-serif",
              }}>
                {isWe ? "1h" : "2h"}
              </span>
              {dayCompleted > 0 && (
                <span style={{
                  fontSize: 9,
                  color: isSelected ? "#6ee7b7" : allDone ? "#059669" : "#999",
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 600,
                }}>
                  {dayCompleted}/{dayTotal}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{
        marginBottom: 20,
        padding: "12px 16px",
        background: "#fafafa",
        borderRadius: 10,
        border: "1px solid #eee",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
        }}>
          <span style={{ fontSize: 13, fontFamily: "system-ui, sans-serif", color: "#555" }}>
            {selectedDay}'s progress
          </span>
          <span style={{
            fontSize: 13,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 600,
            color: completedToday === totalToday && totalToday > 0 ? "#059669" : "#1a1a1a",
          }}>
            {completedToday === totalToday && totalToday > 0 ? "C'est fait! ✓" : `${completedToday} / ${totalToday}`}
          </span>
        </div>
        <div style={{
          height: 6,
          background: "#e5e5e5",
          borderRadius: 3,
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${totalToday > 0 ? (completedToday / totalToday) * 100 : 0}%`,
            background: completedToday === totalToday && totalToday > 0 ? "#059669" : "#1a1a1a",
            borderRadius: 3,
            transition: "width 0.3s ease",
          }} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {day.blocks.map((block, i) => {
          const colors = typeColors[block.type];
          const checked = !!checkedItems[`${selectedDay}-${i}`];
          const hasGuide = !!guideContent[block.type];

          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                padding: "14px 16px",
                borderRadius: 10,
                border: `1.5px solid ${checked ? "#d1d5db" : colors.border}`,
                background: checked ? "#fafafa" : colors.bg,
                opacity: checked ? 0.55 : 1,
                transition: "all 0.2s ease",
                alignItems: "flex-start",
              }}
            >
              <div
                onClick={() => toggleCheck(selectedDay, i)}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  border: checked ? "2px solid #059669" : `2px solid ${colors.fg}44`,
                  background: checked ? "#059669" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1,
                  transition: "all 0.15s ease",
                  cursor: "pointer",
                }}>
                {checked && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 4,
                }}>
                  <span style={{ fontSize: 15 }}>{colors.icon}</span>
                  <span style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: checked ? "#888" : colors.fg,
                    textDecoration: checked ? "line-through" : "none",
                  }}>
                    {block.activity}
                  </span>
                  <span style={{
                    fontSize: 11,
                    fontFamily: "system-ui, sans-serif",
                    color: checked ? "#aaa" : "#888",
                    marginLeft: "auto",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}>
                    {block.time}
                  </span>
                </div>
                <p style={{
                  fontSize: 13,
                  fontFamily: "system-ui, sans-serif",
                  color: checked ? "#aaa" : "#555",
                  margin: 0,
                  lineHeight: 1.45,
                }}>
                  {block.desc}
                </p>
                {hasGuide && !checked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveGuide(block.type);
                    }}
                    style={{
                      marginTop: 8,
                      background: "none",
                      border: `1px solid ${colors.fg}33`,
                      borderRadius: 6,
                      padding: "4px 10px",
                      fontSize: 11,
                      fontFamily: "system-ui, sans-serif",
                      color: colors.fg,
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "all 0.15s ease",
                    }}
                  >
                    How do I do this? →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 24,
        padding: "14px 16px",
        background: "#fafafa",
        borderRadius: 10,
        border: "1px solid #eee",
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 16px",
        }}>
          {Object.entries(typeColors).map(([type, colors]) => (
            <div
              key={type}
              onClick={() => guideContent[type] && setActiveGuide(type)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                cursor: guideContent[type] ? "pointer" : "default",
                padding: "2px 4px",
                borderRadius: 4,
              }}
            >
              <span style={{ fontSize: 12 }}>{colors.icon}</span>
              <span style={{
                fontSize: 11,
                fontFamily: "system-ui, sans-serif",
                color: "#666",
                textTransform: "capitalize",
                textDecoration: guideContent[type] ? "underline dotted" : "none",
                textDecorationColor: "#ccc",
                textUnderlineOffset: 2,
              }}>
                {type}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p style={{
        fontSize: 12,
        color: "#999",
        fontStyle: "italic",
        textAlign: "center",
        marginTop: 16,
        fontFamily: "system-ui, sans-serif",
      }}>
        Tap checkboxes to track progress · Tap "How do I do this?" for detailed guides
      </p>

      {activeGuide && (
        <GuidePanel type={activeGuide} onClose={() => setActiveGuide(null)} />
      )}
    </div>
  );
}
