const { Interviews } = require("../Models");

class interviewRepository {

    async createInterview(payload) {
        return await Interviews.create(payload);
    }

    async getInterviews(query) {
        return await Interviews.findAll();
    }

    async getInterviewById(id) {
        return await Interviews.findByPk(id);
    }

   async updateInterview(payload) {

        const interview = await Interviews.findByPk(payload.id);

        if (!interview) return null;

        await interview.update({
            title: payload.title,
            description: payload.description,
            createdBy: payload.createdBy,
            status: payload.status
        });
        return interview;
    }

    async deleteInterview(id) {
        return await Interviews.destroy({where: { id }});
    }
}

module.exports = new interviewRepository();