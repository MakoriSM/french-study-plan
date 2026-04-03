import { useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const schedule = {
  Monday: {
    total: "2h",
    blocks: [
      { time: "30 min", activity: "Anki", type: "vocab", desc: "Review due cards + 10 new cards from 5000 deck. Add phrases from yesterday to Mon français deck." },
      { time: "30 min", activity: "Podcast (focused)", type: "listening", desc: "InnerFrench or Journal en français facile. First listen for gist, second listen pausing to note 5–8 new words." },
      { time: "30 min", activity: "Shadowing + Scenarios", type: "speaking", desc: "15 min shadowing a podcast clip, then 15 min talking through a holiday scenario aloud." },
      { time: "30 min", activity: "Grammar — Kwiziq", type: "grammar", desc: "Focus on this week's grammar topic. Do exercises, read the explanations." },
    ],
  },
  Tuesday: {
    total: "2h",
    blocks: [
      { time: "30 min", activity: "Anki", type: "vocab", desc: "Review due cards + add words from yesterday's podcast. 10 new cards from main deck." },
      { time: "30 min", activity: "TV / Film in French", type: "listening", desc: "French audio + French subtitles. Pick something you enjoy. Don't take notes — just absorb." },
      { time: "30 min", activity: "Conversation with friend", type: "conversation", desc: "Text them a topic in advance. Stay in French. Write down 3–5 things you couldn't say afterwards." },
      { time: "30 min", activity: "Writing — Journal", type: "writing", desc: "Write 8–10 sentences using this week's grammar topic. Don't look things up while writing — fill gaps after." },
    ],
  },
  Wednesday: {
    total: "2h",
    blocks: [
      { time: "30 min", activity: "Anki", type: "vocab", desc: "Review + new cards. Add anything from Tuesday's conversation and journal gaps." },
      { time: "30 min", activity: "Podcast (focused)", type: "listening", desc: "New episode or re-listen to Monday's with the transcript (pass 3). Note what you missed." },
      { time: "30 min", activity: "Shadowing + Scenarios", type: "speaking", desc: "15 min shadowing a new clip, then 15 min on a different scenario from Monday." },
      { time: "30 min", activity: "Grammar — Kwiziq", type: "grammar", desc: "Same topic as Monday but harder exercises. Write your own example sentences." },
    ],
  },
  Thursday: {
    total: "2h",
    blocks: [
      { time: "30 min", activity: "Anki", type: "vocab", desc: "Review + new cards. Deck should be growing nicely from all your other practice." },
      { time: "30 min", activity: "TV / Film in French", type: "listening", desc: "Continue what you started Tuesday, or try a French YouTube vlog." },
      { time: "30 min", activity: "Conversation with cousin", type: "conversation", desc: "Same format as Tuesday. Different person = different speaking style. Note mistakes after." },
      { time: "30 min", activity: "Writing — Journal", type: "writing", desc: "Write about your day or your holiday plans. Try to use this week's grammar naturally." },
    ],
  },
  Friday: {
    total: "2h",
    blocks: [
      { time: "30 min", activity: "Anki", type: "vocab", desc: "End-of-week review. Check your stats — are you keeping up or building a backlog?" },
      { time: "30 min", activity: "Podcast (re-listen)", type: "listening", desc: "Re-listen to this week's episodes. Notice how much more you catch than Monday." },
      { time: "30 min", activity: "Full scenario rehearsal", type: "speaking", desc: "Run 3 scenarios back-to-back. Simulate a real day in France. Record yourself if you're feeling brave." },
      { time: "30 min", activity: "Grammar — Kwiziq", type: "grammar", desc: "Quiz yourself on this week's topic without notes. Review weak spots. Pick next week's topic." },
    ],
  },
  Saturday: {
    total: "1h",
    blocks: [
      { time: "20 min", activity: "Anki", type: "vocab", desc: "Reviews only — no new cards. Let your brain consolidate." },
      { time: "40 min", activity: "Immersion — film, show, or music", type: "listening", desc: "Watch or listen to something fun. This is your reward session. Enjoy it." },
    ],
  },
  Sunday: {
    total: "1h",
    blocks: [
      { time: "20 min", activity: "Anki", type: "vocab", desc: "Reviews only. Keep the streak alive." },
      { time: "20 min", activity: "Re-watch or re-listen", type: "listening", desc: "Revisit something from the week. Consolidation matters." },
      { time: "20 min", activity: "Plan the week ahead", type: "review", desc: "Pick grammar topic, queue podcasts, text friend & cousin to schedule chats, choose 2 scenarios." },
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
};

const guideContent = {
  vocab: {
    title: "Anki & Vocabulary Guide",
    sections: [
      {
        heading: "Your two-deck system",
        body: "Start with the pre-made \"French 5000 Most Common Words\" deck as your base. Suspend everything above the first 1000 words — at late A2 you already know 600–800 of these, so you're filling gaps. Skip cards you know confidently.\n\nThen create a personal deck called \"Mon français.\" This is where everything from your real practice goes: phrases you couldn't say during conversations, words from podcasts, expressions from class. This deck targets your actual gaps and will become more valuable than the pre-made one."
      },
      {
        heading: "Words vs phrases",
        body: "Lean heavily toward full phrases. \"Est-ce qu'on pourrait avoir la carte, s'il vous plaît?\" is ten times more useful than just \"la carte\" because you're learning the word inside a sentence you'd actually say.\n\nFor your personal deck: English on the front (what you wanted to say), French on the back. This trains production, not just recognition."
      },
      {
        heading: "Settings & daily rhythm",
        body: "Set new cards per day to 10. This keeps daily reviews in the 15–20 minute range and gets you through Part 1 (500 words) in ~7 weeks. If reviews feel light after week 1, bump to 15. If you're drowning, drop to 8.\n\nLeave maximum reviews per day at 200 or set to 9999 — never let Anki hide due reviews from you.\n\nWeekdays: review all due cards + add new cards.\nWeekends: review only, no new cards. Let your brain consolidate.\n\nMark a card correct if you got the core meaning, even if the card shows extra translations. Mark it \"Again\" if you blanked or guessed wrong. Use \"Good\" for most correct answers rather than \"Easy.\""
      }
    ]
  },
  listening: {
    title: "Listening & Immersion Guide",
    sections: [
      {
        heading: "Focused listening (Mon/Wed/Fri podcasts)",
        body: "Use a three-pass method:\n\nFirst listen: no subtitles, no pausing. Just get the gist — what's the topic, what's the main point? Don't panic about what you miss.\n\nSecond listen: pause when you hear something you almost understand but not quite. Write it down phonetically if needed. Look it up. Limit yourself to 5–8 new Anki items per session.\n\nThird listen (Friday re-listen): follow along with the transcript. Connect what you heard to what was actually said."
      },
      {
        heading: "Immersion listening (Tue/Thu TV & film)",
        body: "Use French audio with French subtitles. Not English subs — they become a crutch. French subs let you connect sounds to words.\n\nPick something you'd genuinely enjoy. Don't take notes. Just watch and let your brain absorb patterns. This is your reward session."
      },
      {
        heading: "Recommended resources",
        body: "Podcasts: InnerFrench (clear, intermediate-friendly), Journal en français facile (news, slightly harder), Français Authentique (conversational)\n\nTV: Switch Netflix audio to French on shows you already know. French originals like \"Lupin\" or \"Dix pour cent\" (Call My Agent) work well.\n\nYouTube: French vloggers give you natural, everyday speech — search for topics you're interested in + \"en français\""
      }
    ]
  },
  speaking: {
    title: "Speaking & Shadowing Guide",
    sections: [
      {
        heading: "How shadowing works (first 15 min)",
        body: "Find a short clip — 30 seconds to 2 minutes of natural-pace speech.\n\n1. Play one sentence, pause, repeat it aloud — match the melody, rhythm, and mouth feel, not just the words\n2. Move to the next sentence\n3. Once done sentence-by-sentence, play the whole clip and speak along in real time, slightly behind the speaker\n\nFocus on sounds that don't exist in English: the French \"r,\" the \"u\" vs \"ou\" distinction, nasal vowels. It will feel silly. That's normal."
      },
      {
        heading: "Scenario practice (second 15 min)",
        body: "Play both roles. Be the waiter and the customer. Ask yourself follow-up questions. When you get stuck, write it down in English — that becomes an Anki card.\n\nIf you run dry, restart with a complication: the restaurant doesn't have what you wanted, you missed your train, the pharmacist doesn't understand you."
      },
      {
        heading: "Scenario bank (8 weeks)",
        body: "Week 1: Checking into a hotel · Ordering at a restaurant\nWeek 2: Getting directions when lost · Buying train/bus tickets\nWeek 3: Small talk at a café/bar · Complaining about your room\nWeek 4: Shopping at a market · Asking locals for recommendations\nWeek 5: Making a reservation by phone · Returning something at a shop\nWeek 6: Explaining a problem at a pharmacy · Describing your job to a stranger\nWeek 7: Talking about what you did yesterday · Explaining tomorrow's plans\nWeek 8: Asking about opening hours/events · Full day simulation (chain all scenarios)"
      }
    ]
  },
  conversation: {
    title: "Conversation Practice Guide",
    sections: [
      {
        heading: "How to structure the sessions",
        body: "Text your friend/cousin a topic in advance so you both know what to talk about.\n\nGood topics: what you did last weekend, your holiday plans, a film or show, food and cooking, describing your neighbourhood, something in the news, a childhood memory.\n\nKeep it to 20–25 minutes, leaving 5–10 minutes at the end for your review."
      },
      {
        heading: "Ask them to be helpfully difficult",
        body: "Ask them explicitly to:\n\n• Stay in French and let you struggle a bit\n• Only help when you're genuinely stuck\n• Correct your biggest mistakes (not every small one)\n• Speak at a natural pace, not artificially slowly\n\nThe productive discomfort of searching for a word is where the learning happens."
      },
      {
        heading: "The post-conversation review",
        body: "Immediately after, write down:\n\n• 3–5 things I wanted to say but couldn't\n• 2–3 corrections they gave me\n• 1 thing that went better than last time\n\nThe first two become Anki cards (as full phrases). The third keeps you motivated. This review is what turns a nice chat into actual learning."
      }
    ]
  },
  grammar: {
    title: "Grammar Guide — Kwiziq",
    sections: [
      {
        heading: "How Kwiziq works",
        body: "Kwiziq assesses your level and gives exercises by CEFR level. Filter for A2/B1 content. It adapts as you improve, so it won't waste time on things you've mastered.\n\nAlso useful: Français avec Pierre (YouTube) for short grammar explanations in simple French."
      },
      {
        heading: "One topic per week, three sessions",
        body: "Monday: Learn the rule, do basic exercises on Kwiziq\nWednesday: Harder exercises, write your own example sentences\nFriday: Quiz yourself without notes. Review weak spots. Pick next week's topic.\n\nThis spaced approach locks things in far better than skimming five topics in a week."
      },
      {
        heading: "8-week grammar roadmap",
        body: "Week 1: Passé composé (\"j'ai mangé,\" \"je suis allé\")\nWeek 2: Imparfait (\"il faisait beau,\" \"je mangeais\")\nWeek 3: Passé composé vs imparfait together\nWeek 4: Future proche + future simple (\"je vais visiter,\" \"je visiterai\")\nWeek 5: Object pronouns (le, la, les, lui, leur)\nWeek 6: Conditional for politeness (\"je voudrais,\" \"pourriez-vous\")\nWeek 7: Question formation (inversion, est-ce que, intonation)\nWeek 8: Review week — revisit the weakest two topics"
      }
    ]
  },
  writing: {
    title: "Writing & Journaling Guide",
    sections: [
      {
        heading: "How to journal in French",
        body: "Write 8–10 sentences about your day, your plans, or your opinions. The goal is to practise producing French, not to write literature.\n\nUse it to apply the week's grammar topic. Passé composé week? Write about what you did. Future tense week? Write about your holiday plans.\n\nDon't look things up while writing. Write what you can, leave gaps or English words where you're stuck, then go back and fill them in afterwards. The gap-filling is where the learning is."
      },
      {
        heading: "Voice notes as an alternative",
        body: "On days when writing feels like a chore, record a voice note instead. Describe your day or summarise what you watched. Then listen back.\n\nHearing your own French played back is uncomfortable but incredibly useful — you'll notice hesitations and patterns you miss in real time."
      },
      {
        heading: "Feeding back into Anki",
        body: "Every gap you couldn't fill while writing is a phrase you need. Look it up after your writing session and add the full French phrase to your Mon français Anki deck.\n\nThis creates a virtuous loop: writing reveals gaps → gaps become Anki cards → Anki cards fill gaps → next week's writing is smoother."
      }
    ]
  },
  review: {
    title: "Sunday Planning Guide",
    sections: [
      {
        heading: "The session that makes the whole week work",
        body: "In 20 minutes:\n\n1. Pick next week's grammar topic (follow the 8-week roadmap)\n2. Queue up podcast episodes so they're ready to go\n3. Text your friend and cousin to confirm conversation times\n4. Choose 2 speaking scenarios from the scenario bank\n5. Skim your Anki stats — are you keeping up, or building a backlog?\n\nWhen Monday comes, you sit down and know exactly what to do. No decisions, no friction."
      },
      {
        heading: "Weekly reflection questions",
        body: "• What improved this week?\n• What's still hard?\n• Did I actually do every session, or did I skip things?\n• Is any block consistently feeling too long or too short?\n\nAdjust next week's emphasis based on this. The plan should evolve as you do."
      }
    ]
  }
};

export default function FrenchStudyPlan() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [checkedItems, setCheckedItems] = useState({});
  const [activeGuide, setActiveGuide] = useState(null);

  const toggleCheck = (day, idx) => {
    const key = `${day}-${idx}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
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
          Late A2 → confident holiday French · 4 × 30 min blocks
        </p>
      </div>

      {/* Day selector */}
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

      {/* Progress bar */}
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

      {/* Schedule blocks */}
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

      {/* Legend */}
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
        Tap checkboxes to track progress · Tap "How do I do this?" for guides
      </p>

      {activeGuide && (
        <GuidePanel type={activeGuide} onClose={() => setActiveGuide(null)} />
      )}
    </div>
  );
}