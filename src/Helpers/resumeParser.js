const pdfParse = require("pdf-parse");
const AppError = require("./AppError");

/**
 * Extracts plain text from an uploaded resume file buffer.
 * Currently supports PDF and plain text uploads.
 */
async function extractResumeText(file) {

  if (!file) {
    throw new AppError("Resume file is required");
  }

  const mimeType = file.mimetype;

  if (mimeType === "application/pdf") {
    const parsed = await pdfParse(file.buffer);
    return parsed.text.trim();
  }

  if (mimeType === "text/plain") {
    return file.buffer.toString("utf-8").trim();
  }

  throw new AppError(
    "Unsupported resume format. Please upload a PDF or .txt file."
  );
}

module.exports = { extractResumeText };
