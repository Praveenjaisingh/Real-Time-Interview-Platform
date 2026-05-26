const submissionRepository = require("../Repositories/submissionRepository");
const questionRepository = require("../Repositories/questionRepository");

class submissionService {

    async submitCode(data, user) {
        const question = await questionRepository.getQuestionById(data.questionId);

        if (!question) {
            throw new Error("Invalid questionId: Question does not exist");
        }
        const payload = {
            userId: user.id,
            questionId: data.questionId,
            code: data.code,
            language: data.language,
            status: "pending"
        };

        return await submissionRepository.create(payload);
    }
}

module.exports = new submissionService();