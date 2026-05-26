const { Questions } = require("../Models");

class questionRepository {

    async createQuestion(payload) {
        return await Questions.create(payload);
    }

    async getQuestions(query) {
        return await Questions.findAll();
    }

    async getQuestionById(id) {
        return await Questions.findByPk(id);
    }

   async updateQuestion(id, payload) {

        const data = await Questions.findByPk(id);
        if (!data) return null;

        await data.update({
            title: payload.title,
            description: payload.description,
            difficulty: payload.difficulty,
            tags: payload.tags
        });

        return data;
    }
    
    async deleteQuestion(id) {
        return await Questions.destroy({where: { id }});
    }
}

module.exports = new questionRepository();