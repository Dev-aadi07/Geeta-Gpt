export async function getOpenAIResponse(prompt) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    console.error("❌ OpenAI API key is missing");
    return "❌ Missing API key.";
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You're a calm, spiritual assistant based on the Bhagavad Gita."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    // Check for OpenAI errors
    if (data.error) {
      console.error("❌ OpenAI error:", data.error);
      return "⚠️ OpenAI error: " + data.error.message;
    }

    console.log("📥 OpenAI response:", data);

    return data.choices?.[0]?.message?.content ?? "⚠️ No valid response from OpenAI.";
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return "⚠️ Failed to connect to OpenAI.";
  }
}

export async function classifyPrompt(query) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const prompt = `
You are KrishnAI, a spiritual assistant.

Classify the user's question and respond ONLY in valid JSON.

If the question is spiritual, motivational, emotional or life-problem based, return:
{
  "valid": true,
  "keywords": ["keyword1", "keyword2"]
}

If the question is irrelevant (like about celebrities, politics, tech, gossip), return:
{
  "valid": false,
  "message": "🙏 Dear seeker, I can only guide you on matters of the soul, not worldly gossip."
}

User's question: "${query}"
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You're a spiritual JSON classifier." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3
    })
  });

  const data = await response.json();

  console.log("📥 Classification:", data);

  const raw = data.choices?.[0]?.message?.content;
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("❌ Failed to parse OpenAI JSON:", raw);
    return { valid: false, message: "⚠️ Unable to process your question." };
  }
}

