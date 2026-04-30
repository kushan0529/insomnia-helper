import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronLeft, Flame } from 'lucide-react';
import toast from 'react-hot-toast';

const CBT_DATA = {
  sleep: {
    title: 'Sleep Hygiene Checklist',
    icon: '🛏️',
    tot: 19,
    sub: 'Build habits that consistently signal your brain it is safe to rest. Check off each one as you complete it today.',
    groups: [
      {
        label: 'Bedroom Environment', items: [
          { t: 'Room temperature set between 18–22°C (cool promotes sleep)', s: 'A cooler room triggers the body\'s natural temperature drop that initiates sleep.' },
          { t: 'Blackout curtains or eye mask in use tonight', s: 'Even faint light suppresses melatonin production by up to 50%.' },
          { t: 'No screens for at least 60 minutes before bed', s: 'Blue light delays your circadian sleep onset by up to 3 hours.' },
          { t: 'Phone on Do Not Disturb or moved to another room', s: 'Notifications cause micro-arousals even during deep sleep stages.' },
          { t: 'Bed used only for sleep and intimacy — no work, no scrolling', s: 'This trains your brain to associate the bed with sleep, not stimulation.' },
        ]
      },
      {
        label: 'Evening Routine', items: [
          { t: 'Same bedtime as yesterday (within 30 minutes)', s: 'Circadian rhythm thrives on consistency — even 30-min variance matters.' },
          { t: 'Wind-down routine started 90 minutes before sleep', s: 'Gradual decompression is far more effective than trying to switch off suddenly.' },
          { t: 'Warm bath or shower taken 1–2 hours before bed', s: 'The post-bath body temperature drop is a powerful sleep-onset trigger.' },
          { t: 'No caffeine consumed after 2pm today', s: 'Caffeine has a 5–6 hour half-life. Your 4pm coffee is still active at 10pm.' },
          { t: 'Light dinner eaten before 8pm — nothing heavy after', s: 'Heavy digestion raises core body temperature and disrupts sleep architecture.' },
          { t: 'No alcohol tonight (or at least 3 hours before bed)', s: 'Alcohol fragments sleep architecture and suppresses critical REM sleep.' },
        ]
      },
      {
        label: 'Mind Preparation', items: [
          { t: 'Written a "tomorrow to-do" list to offload mental RAM', s: 'Externalising tasks stops your brain rehearsing them while trying to sleep.' },
          { t: 'Completed 3 gratitude notes — specific, real things', s: 'Gratitude shifts brain state from problem-solving to contentment mode.' },
          { t: '10 minutes of physical book reading (no screens)', s: 'Reading reduces stress by 68% vs other relaxation methods (Sussex Univ. study).' },
          { t: 'No distressing news, arguments or stressful content after 9pm', s: 'Cortisol spikes take 2+ hours to fully metabolise back to baseline.' },
        ]
      },
      {
        label: 'Morning Anchors', items: [
          { t: 'Natural light within 30 minutes of waking this morning', s: 'Morning light sets your circadian clock 14–16 hours ahead — for tonight.' },
          { t: 'Same wake time set — including weekends', s: 'The most powerful single sleep regulation tool available.' },
          { t: 'No naps longer than 20 minutes after 3pm', s: 'Long afternoon naps deplete the sleep pressure needed at bedtime.' },
          { t: 'Some physical movement done today (any amount)', s: 'Exercise improves sleep quality by up to 65% (Johns Hopkins study).' },
        ]
      },
    ]
  },
  thought: {
    title: 'Thought Records',
    icon: '💭',
    tot: 17,
    sub: 'Identify, challenge and replace automatic negative thoughts. Work through each section slowly and honestly.',
    groups: [
      {
        label: 'Step 1 — Identify the Thought', items: [
          { t: 'Named the triggering situation (when, where, what happened)', s: 'Specific context is essential — "everything is bad" is too vague to challenge.' },
          { t: 'Written the exact automatic thought word-for-word', s: 'The raw, unfiltered first thought — not the edited, acceptable version.' },
          { t: 'Rated belief in it honestly (0–100%)', s: 'High belief ratings are valuable — they show you where the real work is.' },
          { t: 'Named the emotion it creates and rated its intensity (0–100%)', s: 'Anger? Fear? Shame? Sadness? Be precise. Naming emotion reduces its power.' },
        ]
      },
      {
        label: 'Step 2 — Examine the Evidence', items: [
          { t: 'Listed factual evidence that SUPPORTS the thought', s: 'Objective facts only — not interpretations or feelings.' },
          { t: 'Listed factual evidence that CHALLENGES the thought', s: 'What facts contradict, complicate or disprove this view?' },
          { t: 'Asked what a trusted, calm friend would say', s: 'External perspective bypasses your cognitive bias more than logic alone.' },
          { t: 'Considered 2–3 alternative explanations for the situation', s: 'What are other realistic reasons this situation could have happened?' },
        ]
      },
      {
        label: 'Step 3 — Distortion Check', items: [
          { t: 'Catastrophising? (treating worst case as certain)', s: 'Is the worst outcome actually probable? What is the most likely outcome?' },
          { t: 'Mind-reading? (assuming you know others\' thoughts)', s: 'Do I actually know this, or am I treating a guess as fact?' },
          { t: 'All-or-nothing? (black/white thinking, no middle ground)', s: 'Is there a realistic, nuanced middle ground I am completely ignoring?' },
          { t: 'Discounting positives? (only counting evidence against me)', s: 'Would I accept the same standard of evidence if it supported me?' },
          { t: 'Fortune-telling? (predicting failure with false certainty)', s: 'How many times have I made this exact prediction and been wrong?' },
        ]
      },
      {
        label: 'Step 4 — Build a Balanced Thought', items: [
          { t: 'Written a balanced, more accurate alternative thought', s: 'Not toxic positivity — a genuinely fairer, more complete view of reality.' },
          { t: 'Rated belief in the new thought (0–100%)', s: 'Even 20% belief in a better thought is real, meaningful progress.' },
          { t: 'Noted how my emotional intensity shifted (even slightly)', s: 'Tracking even small shifts builds the evidence that this technique works.' },
        ]
      },
    ]
  },
  relax: {
    title: 'Relaxation Protocol',
    icon: '🧘',
    tot: 21,
    sub: 'Progressive muscle relaxation, body scan and grounding. Move slowly — this is not a checklist to rush.',
    groups: [
      {
        label: 'Body Scan — Head to Toe', items: [
          { t: 'Scalp and forehead — raise eyebrows high, hold 5s, release fully', s: 'Releasing facial tension signals safety to the entire nervous system.' },
          { t: 'Eyes, cheeks and jaw — soften completely, let jaw hang open', s: 'The jaw is the most common place we store emotional tension unconsciously.' },
          { t: 'Neck and shoulders — roll back slowly 3 times, then drop', s: 'Shoulders carry the physical weight of worry. Let them fall naturally.' },
          { t: 'Chest — slow your breathing to 5–6 breaths per minute', s: 'This activates the parasympathetic nervous system within 2 minutes.' },
          { t: 'Arms, hands — make fists, squeeze 5s, fully open and relax', s: 'The contrast between tension and release amplifies the relaxation response.' },
          { t: 'Abdomen — let it fully expand with each breath, unguarded', s: 'The belly holds enormous tension. Letting it expand is a vulnerable act of safety.' },
          { t: 'Hips and lower back — released into whatever you are sitting on', s: 'Let gravity do the work. You do not need to hold yourself up right now.' },
          { t: 'Thighs, calves, feet — curl toes 5s, release, feel the floor', s: 'Physical grounding through the feet is an ancient, effective calming signal.' },
        ]
      },
      {
        label: '5‑4‑3‑2‑1 Grounding', items: [
          { t: 'Named 5 things I can see right now (look slowly)', s: 'Real, specific, present-moment objects. Be deliberate and slow.' },
          { t: 'Named 4 things I can physically feel (texture, temperature)', s: 'Clothes on skin, seat beneath you, temperature of the air.' },
          { t: 'Named 3 things I can hear right now (even quiet sounds)', s: 'Even subtle sounds. HVAC hum, distant traffic, your own breathing.' },
          { t: 'Named 2 things I can smell (even very faint)', s: 'This accesses a powerful memory-and-grounding circuit in your brain.' },
          { t: 'Named 1 thing I can taste right now', s: 'The most powerful present-moment anchor — brings you here immediately.' },
        ]
      },
      {
        label: 'Mindful Awareness', items: [
          { t: 'Sat quietly for 5 minutes with no goal, no phone', s: 'Not meditation. Just sitting. No achievement required.' },
          { t: 'Watched 3 thoughts pass without engaging or following them', s: 'Thoughts are not commands. You can notice them without obeying them.' },
          { t: 'Returned attention to breath each time the mind wandered', s: 'The moment of return IS the practice. That is the whole point of mindfulness.' },
          { t: 'Visited a safe place (real or imagined) in full sensory detail', s: 'What do you see, hear, feel, smell there? Make it vivid and specific.' },
          { t: 'Set one small, specific intention for the next hour', s: 'A focused intention keeps anxiety from flooding back in immediately.' },
          { t: 'Named one thing I am genuinely grateful for right now', s: 'Gratitude measurably reduces cortisol and raises serotonin (Harvard Medical).' },
          { t: 'Told myself: this feeling will pass, as it always has', s: 'Evidence-based self-compassion. It has passed before. Every single time.' },
          { t: 'Acknowledged: I am doing enough right now, exactly as I am', s: 'Self-acceptance reduces the secondary anxiety of "I should be better."' },
        ]
      },
    ]
  },
  anxiety: {
    title: 'Anxiety Reduction',
    icon: '😰',
    tot: 23,
    sub: 'Structured steps to interrupt, challenge and recover from an anxiety spiral. Work through these in order.',
    groups: [
      {
        label: 'Phase 1 — Interrupt (First 2 Minutes)', items: [
          { t: 'Said aloud: "I am experiencing anxiety — not actual danger"', s: 'Naming the state activates your prefrontal cortex and dampens the amygdala.' },
          { t: 'Started slow exhale — making exhale longer than inhale', s: 'A longer exhale directly activates the vagus nerve and parasympathetic system.' },
          { t: 'Splashed cold water on wrists or face', s: 'The mammalian dive reflex slows heart rate within 15–30 seconds.' },
          { t: 'Physically unclenched fists, jaw and dropped shoulders', s: 'Anxiety lives in body tension. Breaking the physical pattern interrupts the loop.' },
          { t: 'Planted feet flat on the floor and pressed down', s: 'Physical grounding through your feet interrupts mental spiralling immediately.' },
          { t: 'Took 3 slow deliberate breaths before doing anything else', s: 'Even 3 conscious breaths shift the autonomic nervous system measurably.' },
        ]
      },
      {
        label: 'Phase 2 — Challenge the Fear', items: [
          { t: 'Identified the specific fear — not just "everything" or "I don\'t know"', s: 'Vague anxiety is far harder to challenge than a specific, named fear.' },
          { t: 'Asked: "What is the actual realistic probability of this?"', s: 'Anxiety dramatically inflates probability. Reality is usually far kinder.' },
          { t: 'Asked: "What would I tell a close friend in this exact situation?"', s: 'Self-compassion bypasses the inner critic in ways pure logic cannot.' },
          { t: 'Asked: "Have I survived similar things before? What happened?"', s: 'Your survival rate for hard situations is 100%. Collect this evidence.' },
          { t: 'Asked: "Will this matter in 5 years? 5 months? 5 weeks?"', s: 'Temporal distance often reveals the actual, much smaller scale of a worry.' },
          { t: 'Named the realistic worst case — then asked: could I recover from it?', s: 'Most feared outcomes, when named clearly, are survivable and recoverable.' },
          { t: 'Identified the cognitive distortion driving this thought', s: 'Catastrophising? Mind-reading? Fortune-telling? Name the pattern.' },
        ]
      },
      {
        label: 'Phase 3 — Build Safety', items: [
          { t: 'Completed a 4-minute breathing exercise (box or 4-7-8)', s: 'Go to the Breathing page. 4 minutes measurably rebalances the nervous system.' },
          { t: 'Moved my body — walked, stretched, shook my hands out', s: 'Adrenaline is physical. It needs movement to metabolise out of your system.' },
          { t: 'Contacted one person or animal I feel safe around', s: 'Social safety is a primal, hardwired anxiety reducer for all humans.' },
          { t: 'Did something sensory and absorbing for 10+ minutes', s: 'Cooking, drawing, music — actively engages the prefrontal cortex constructively.' },
        ]
      },
      {
        label: 'Phase 4 — Rebuild After an Episode', items: [
          { t: 'Rested without guilt — anxiety attacks use real physical energy', s: 'A full anxiety episode is physiologically exhausting. Rest is not laziness.' },
          { t: 'Drank water and ate something (anxiety depletes both)', s: 'Low blood sugar and dehydration independently worsen anxiety symptoms.' },
          { t: 'Journaled what triggered this episode without self-judgment', s: 'Patterns become visible over time. Visible patterns can be changed.' },
          { t: 'Identified one early warning sign to catch sooner next time', s: 'Catching it earlier each time means faster recovery and less suffering.' },
          { t: 'Released all shame from this episode — it is not a character flaw', s: 'Anxiety is a physiological response. It is not a moral failure. Not yours.' },
          { t: 'Planned one small genuinely pleasant activity for today', s: 'Scheduling joy is a clinically validated anxiety-reduction intervention.' },
        ]
      },
    ]
  },
  depression: {
    title: 'Depression Relief',
    icon: '☁️',
    tot: 19,
    sub: 'Small, manageable steps for when even getting up feels impossible. Every single check is a real win — no exceptions.',
    groups: [
      {
        label: 'The Absolute Basics (Start Here Always)', items: [
          { t: 'Drank at least 2 glasses of water today', s: 'Dehydration independently mimics and worsens depressive symptoms.' },
          { t: 'Ate something today — anything counts', s: 'Blood sugar stability is biologically essential for mood regulation.' },
          { t: 'Got up and changed out of nightwear today', s: 'This one physical act has outsized, documented impact on mental state.' },
          { t: 'Opened a window or stepped outside for at least 5 minutes', s: 'Natural light reduces melatonin and raises serotonin — measurably.' },
        ]
      },
      {
        label: 'Behavioural Activation', items: [
          { t: 'Completed one tiny task (dishes, making bed, one reply)', s: 'Action generates motivation — not the other way around. Start tiny.' },
          { t: 'Contacted one person (even just a text or an emoji)', s: 'Even the smallest social contact counters the isolation that feeds depression.' },
          { t: 'Did something I used to enjoy — even for 5 minutes only', s: 'Re-exposure to pleasure begins to rewire depressed reward pathways.' },
          { t: 'Moved my body for at least 5 minutes (any movement)', s: 'Exercise is as effective as antidepressants for mild-to-moderate depression.' },
          { t: 'Left my immediate environment for 10+ minutes', s: 'Environmental change physically interrupts rumination loops.' },
        ]
      },
      {
        label: 'Thought Work', items: [
          { t: 'Noticed one specific negative self-statement today', s: '"I am worthless." "Nothing will improve." Write it down — name it exactly.' },
          { t: 'Found one piece of counter-evidence, however small', s: 'Something — anything — that contradicts the dark story. Even one thing.' },
          { t: 'Identified one thing I am looking forward to (even tiny)', s: 'Coffee. A show. A text. Something. Find it and hold it.' },
          { t: 'Practised self-compassion — spoke kindly to myself once today', s: 'Would you talk to a struggling friend the way you talk to yourself?' },
        ]
      },
      {
        label: 'Evening Review', items: [
          { t: 'Noted 3 things that happened today — however small or neutral', s: 'Training your brain to scan beyond the negative is a learnable clinical skill.' },
          { t: 'Gave myself credit for existing and showing up today', s: 'Living through depression takes enormous, unseen, unacknowledged courage.' },
          { t: 'Set one small, specific, doable intention for tomorrow', s: 'Not "be better." Something physical and concrete you can actually do.' },
          { t: 'Accepted today was enough — recovery is not linear', s: 'Today — however it looked — was a day you got through. That counted.' },
          { t: 'Acknowledged I deserve support and will ask for it', s: 'Asking for help is a learnable skill. It is not weakness. Not even close.' },
        ]
      },
    ]
  },
  stress: {
    title: 'Stress Management',
    icon: '😤',
    tot: 17,
    sub: 'When everything feels urgent, these structured steps restore clarity and control. Start at the top.',
    groups: [
      {
        label: 'Triage — What Actually Needs Attention', items: [
          { t: 'Done a full brain dump — every stressor written down', s: 'Write fast, no filter. Get every single thing out of your head and onto paper.' },
          { t: 'Sorted into: urgent+important / important only / neither', s: 'Most "urgent" things are not actually urgent. Categorise ruthlessly.' },
          { t: 'Identified the ONE most important task for today', s: 'One. Not three. Not five. One. Everything else waits or gets delegated.' },
          { t: 'Said no to or deferred at least one non-essential request today', s: 'Every yes to something unimportant is a no to what genuinely matters.' },
          { t: 'Identified what I genuinely cannot control and let it go', s: 'Releasing uncontrollable things reduces cortisol significantly and measurably.' },
        ]
      },
      {
        label: 'Body-Based Stress Release', items: [
          { t: 'Located exactly where I am holding tension in my body right now', s: 'Jaw? Shoulders? Chest? Gut? Stress is physical before it is mental.' },
          { t: '5-minute physical release: stretch, walk or shake', s: 'Cortisol requires movement to metabolise out of your system. It cannot rest away.' },
          { t: 'Took 3 slow deliberate deep breaths right now', s: 'Do this now. Activates parasympathetic nervous system immediately.' },
          { t: 'Unclenched jaw and consciously dropped shoulders', s: 'Do this right now. Set a reminder to do it again in one hour.' },
          { t: 'Turned off notifications for at least one uninterrupted hour', s: 'Constant availability is a chronic, measurable, quantified stress source.' },
        ]
      },
      {
        label: 'Boundaries and Recovery', items: [
          { t: 'Identified one boundary I need to set or reinforce', s: 'What are you currently tolerating that you know you should not be?' },
          { t: 'Scheduled a real break today — in the calendar, treated as fixed', s: 'Put it in now. Treat it like a meeting you cannot cancel. Because you cannot.' },
          { t: 'Spoken to at least one person about what I am carrying', s: 'Voicing stress halves its subjective weight. It is not complaining.' },
          { t: 'Done one thing purely for pleasure — no productivity allowed', s: 'Rest is not a reward for productivity. It is a biological requirement.' },
          { t: 'Focused on what I CAN control in this situation', s: 'Your sphere of influence. Everything outside it is not your burden.' },
          { t: 'Reminded myself: this intensity of feeling is temporary', s: 'Stress peaks pass. Every single one you have ever felt has passed.' },
          { t: 'Planned 7–9 hours of sleep tonight — treated as non-negotiable', s: 'Sleep deprivation multiplies the stress response by up to 60%.' },
        ]
      },
    ]
  }
};

const CBTProgram = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('cbt_progress_v2');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('cbt_progress_v2', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (id) => {
    const isChecking = !checkedItems[id];
    setCheckedItems(prev => ({ ...prev, [id]: isChecking }));
    if (isChecking) {
      toast.success('✓ Progress saved', { duration: 1000 });
    }
  };

  const restartDay = () => {
    if (!activeCategory) return;
    const newChecked = { ...checkedItems };
    Object.keys(newChecked).forEach(key => {
      if (key.startsWith(activeCategory + '_')) {
        delete newChecked[key];
      }
    });
    setCheckedItems(newChecked);
    toast.success('Checklist reset for today');
  };

  const getProgress = (catKey) => {
    const cat = CBT_DATA[catKey];
    const done = Object.keys(checkedItems).filter(k => k.startsWith(catKey + '_') && checkedItems[k]).length;
    return { done, total: cat.tot, pct: (done / cat.tot) * 100 };
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12">
      <AnimatePresence mode="wait">
        {!activeCategory ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="mb-12">
              <span className="text-[10px] font-bold tracking-[3px] uppercase text-g mb-3 block">CBT Toolkit</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Rewire your <span className="text-g">thinking</span></h2>
              <p className="text-[#8892B0] text-sm md:text-[15px] leading-relaxed max-w-[600px]">
                Six structured checklists teaching you evidence-based skills. Check off as you go — progress saves automatically.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {Object.keys(CBT_DATA).map(key => {
                const cat = CBT_DATA[key];
                const prog = getProgress(key);
                return (
                  <motion.div
                    key={key}
                    whileHover={{ y: -4, borderColor: 'rgba(201,168,76,0.3)', backgroundColor: 'rgba(15,18,32,0.9)' }}
                    onClick={() => setActiveCategory(key)}
                    className="glass-card p-6 cursor-pointer"
                  >
                    <div className="text-3xl mb-4">{cat.icon}</div>
                    <h3 className="text-[15px] font-semibold mb-2">{cat.title}</h3>
                    <p className="text-[12px] text-[#8892B0] leading-relaxed mb-6 line-clamp-2">{cat.sub}</p>

                    <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prog.pct}%` }}
                        className="h-full bg-gradient-to-r from-g to-g2"
                      />
                    </div>
                    <div className="text-[10px] text-[#4A5370] text-right">{Math.round(prog.pct)}% Complete</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <button
              onClick={() => setActiveCategory(null)}
              className="flex items-center gap-2 text-g text-[13px] font-semibold mb-8 hover:gap-3 transition-all"
            >
              <ChevronLeft size={16} /> Back to toolkit
            </button>

            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="font-heading text-3xl font-bold mb-2">{CBT_DATA[activeCategory].title}</h2>
                <p className="text-[#8892B0] text-sm leading-relaxed max-w-[600px]">{CBT_DATA[activeCategory].sub}</p>
              </div>
              <button
                onClick={restartDay}
                className="btn-glass !py-2 !px-4 text-[12px] flex items-center gap-2 hover:bg-red-500/10 hover:border-red-500/20 transition-all text-[#8892B0] hover:text-red-400"
              >
                <Flame size={14} /> Restart Day
              </button>
            </div>

            <div className="space-y-10 mb-12">
              {CBT_DATA[activeCategory].groups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold tracking-[2px] uppercase text-g whitespace-nowrap">{group.label}</span>
                    <div className="h-px bg-g/20 flex-1" />
                  </div>
                  <div className="space-y-3">
                    {group.items.map((item, iIdx) => {
                      const id = `${activeCategory}_${gIdx}_${iIdx}`;
                      const isChecked = checkedItems[id];
                      return (
                        <div
                          key={iIdx}
                          onClick={() => toggleItem(id)}
                          className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer select-none ${isChecked
                            ? 'bg-green-500/5 border-green-500/20'
                            : 'bg-s1/50 border-white/5 hover:border-g/20'
                            }`}
                        >
                          <div className={`w-5 h-5 rounded-md border-1.5 flex flex-col items-center justify-center shrink-0 mt-1 transition-all ${isChecked ? 'bg-green-500/20 border-green-500' : 'border-white/20'
                            }`}>
                            {isChecked && <div className="text-[11px] text-green-500">✓</div>}
                          </div>
                          <div className="flex-1">
                            <div className={`text-sm font-medium leading-tight mb-1 ${isChecked ? 'text-[#8892B0] line-through decoration-[#4A5370]' : 'text-white'}`}>
                              {item.t}
                            </div>
                            <div className="text-[12px] text-[#4A5370] leading-relaxed">
                              {item.s}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CBTProgram;
