const OpenAI = require("openai");
const AppError = require("../Helpers/AppError");

const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new AppError(
      "AI question generation is not configured. Set OPENAI_API_KEY in your environment.",
      500
    );
  }

  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// Truncate to keep prompts small and cheap - a few thousand words is
// plenty of signal from a resume or JD.
function truncate(text, maxChars = 12000) {
  if (!text) return "";
  return text.length > maxChars ? text.slice(0, maxChars) : text;
}

class AiQuestionService {

  /**
   * Generates a tailored set of interview questions from a candidate's
   * resume and the job description, weighted toward what the role
   * actually needs.
   */
  async generateFromResume({ resumeText, jobDescription, questionCount = 8 }) {

    if (!resumeText) {
      throw new AppError("Resume text is required");
    }

    if (!jobDescription) {
      throw new AppError("Job description is required");
    }

    const client = getClient();

    const systemPrompt = `You are an expert technical interviewer. You write sharp, specific
interview questions that probe whether a candidate's real experience matches a job description.
Avoid generic questions. Reference concrete things from the resume (projects, tools, roles) and
concrete requirements from the job description. Always respond with strict JSON only, no prose,
matching this shape:
{
  "questions": [
    {
      "question": "string",
      "category": "technical" | "behavioral" | "system_design" | "role_specific",
      "difficulty": "easy" | "medium" | "hard",
      "rationale": "one sentence on why this question matters for this candidate/role"
    }
  ]
}`;

    const userPrompt = `JOB DESCRIPTION:
${truncate(jobDescription)}

CANDIDATE RESUME:
${truncate(resumeText)}

Generate exactly ${questionCount} interview questions tailored to this candidate and this role.
Mix categories and difficulty. Ground each question in specifics from the resume and JD rather
than asking generic questions.`;

    let response;

    try {
      response = await client.chat.completions.create({
        model: MODEL,
        temperature: 0.5,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      });
    } catch (error) {
      throw new AppError(`AI question generation failed: ${error.message}`, 502);
    }

    const raw = response.choices?.[0]?.message?.content;

    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      throw new AppError("AI returned an unexpected format. Please try again.", 502);
    }

    if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
      throw new AppError("AI did not return any questions. Please try again.", 502);
    }

    return parsed.questions;
  }
}

module.exports = new AiQuestionService();
