const multer = require("multer");

// Resumes are parsed immediately and never written to disk, so memory
// storage is enough here.
const storage = multer.memoryStorage();

const resumeUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ["application/pdf", "text/plain"];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only PDF or .txt resumes are supported"));
    }

    cb(null, true);
  }
});

module.exports = { resumeUpload };
