const questionRepository = require("../Repositories/questionRepository");
const AppError = require("../Helpers/AppError");

class questionService {

    async createQuestion(data) {

        const payload = {
            title: data.title,
            description: data.description,
            difficulty: data.difficulty,
            tags: data.tags
        };

        return await questionRepository.createQuestion(payload);
    }

    async getQuestions(query) {
        return await questionRepository.getQuestions(query);
    }

     async getQuestionById(id) {

        const interview = await questionRepository.getQuestionById(id);

        if (!interview) {
            throw new AppError("Id not found");
        }

        return interview;
    }

    async updateQuestion(id, data) {

        const question = await questionRepository.updateQuestion(id, data);
        if (!question) {
            throw new AppError("Id not found");
        }
        return question;
    }
    
    async deleteQuestion(id) {

        const interview = await questionRepository.deleteQuestion(id);

        if (!interview) {
            throw new AppError("Id not found");
        }

        return interview;
    }
}

module.exports = new questionService();