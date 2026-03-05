
import { ProfileAnalysis, Persona } from "@/types";

type GroqMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type GroqResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

async function callGroq(messages: GroqMessage[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      response_format: { type: "json_object" },
      temperature: 0.4,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Groq request failed (${response.status}): ${errorBody}`);
  }

  const data = (await response.json()) as GroqResponse;
  return data.choices?.[0]?.message?.content || "{}";
}

export async function generateAIReview(
data: Partial<ProfileAnalysis>,
  persona: Persona
): Promise<{ commentary: string; roadmap: string[] }> {
  const prompts = {
    recruiter: "You are a FAANG Technical Recruiter. Be strict, professional, and focus on employability.",
    roast: "You are a cynical Senior Engineer. Roast this profile mercilessly. Be funny but mean.",
     mentor: "You are a kind Engineering Manager. Be encouraging and focus on growth.",
  };
  const systemPrompt = `
    ${prompts[persona]}
    Analyze this GitHub profile summary.
    Profile Score: ${data.scores?.total}/100.
    Bio: ${data.bio || "None"}.
    Top Repos: ${data.repos?.map((r) => `${r.name} (${r.language}, Score: ${r.score})`).join(", ")}.
    Red Flags: ${data.redFlags?.join(", ")}.
    
    Output strictly valid JSON format:
    {
      "commentary": "A 2-3 sentence summary of the profile in your persona's voice.",
      "roadmap": ["Action item 1", "Action item 2", "Action item 3", "Action item 4"]
    }
  `;

  const rawContent = await callGroq([{ role: "system", content: systemPrompt }]);
  const content = JSON.parse(rawContent || "{}");
 
  return {
    commentary: content.commentary || "Could not generate review.",
    roadmap: content.roadmap || ["Improve README quality", "Add tests", "Increase commit consistency"],
  };
}