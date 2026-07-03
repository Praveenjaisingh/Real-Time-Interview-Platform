const aiQuestionService = require("../Services/aiQuestionService");
const { extractResumeText } = require("../Helpers/resumeParser");
const { Questions, InterviewQuestions, Interviews } = require("../Models");
const AppError = require("../Helpers/AppError");

exports.generateQuestions = async (req, res, next) => {
  try {
    const { jobDescription, resumeText, interviewId, questionCount, save } = req.body;

    // Resume can come in as an uploaded file (PDF/txt) or as raw pasted text.
    let finalResumeText = resumeText;

    if (req.file) {
      finalResumeText = await extractResumeText(req.file);
    }

    if (!finalResumeText) {
      throw new AppError("Provide a resume file or resumeText");
    }

    if (interviewId) {
      const interview = await Interviews.findByPk(interviewId);
      if (!interview) {
        throw new AppError("Interview not found");
      }
    }

    const generated = await aiQuestionService.generateFromResume({
      resumeText: finalResumeText,
      jobDescription,
      questionCount: questionCount ? Number(questionCount) : 8
    });

    // "save" defaults to true - persist so questions can be reused/edited
    // like any manually created question, and optionally link to the interview.
    const shouldSave = save !== "false" && save !== false;

    if (!shouldSave) {
      return res.status(200).json({
        status: true,
        message: "Questions generated (not saved)",
        data: generated
      });
    }

    const created = await Questions.bulkCreate(
      generated.map((q) => ({
        title: q.question,
        description: q.rationale || "",
        difficulty: q.difficulty || "medium",
        category: q.category || "role_specific",
        source: "ai",
        rationale: q.rationale || null
      }))
    );

    if (interviewId) {
      await InterviewQuestions.bulkCreate(
        created.map((question) => ({
          interviewId: Number(interviewId),
          questionId: question.id
        }))
      );
    }

    return res.status(201).json({
      status: true,
      message: `Generated and saved ${created.length} AI questions`,
      data: created
    });

  } catch (error) {
    next(error);
  }
};
