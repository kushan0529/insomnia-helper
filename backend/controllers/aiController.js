const Groq = require('groq-sdk');
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.depressionCheck = async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers) {
      return res.status(400).json({ message: 'No answers provided' });
    }
    const prompt = `You are a clinical depression screening assistant. Based on these answers: ${JSON.stringify(answers)}, determine if the user is likely depressed or not. Respond ONLY with a JSON object: { "depressed": true } or { "depressed": false }. Do not add any explanation.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(chatCompletion.choices[0].message.content);
    res.json(result);
  } catch (error) {
    console.error('Groq AI Assessment Error:', error);
    res.status(200).json({ depressed: false }); // Fallback as requested
  }
};

exports.storyAnalysis = async (req, res) => {
  try {
    const { content } = req.body;
    const prompt = `Analyze this text for a support group board. Return ONLY JSON: { "triggerWarning": boolean, "moodTag": string, "supportMessage": string }. Text: ${content}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(chatCompletion.choices[0].message.content);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sleepCoach = async (req, res) => {
  try {
    const { messages } = req.body;
    const systemPrompt = "You are a compassionate CBT-I sleep therapist. Speak warmly and never recommend medications.";

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      model: "llama-3.3-70b-versatile",
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
