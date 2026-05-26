const interviewRepository = require("../Repositories/interviewRepository");
const AppError = require("../Helpers/AppError");

class interviewService {

    async createInterview(data, user) {

        const payload = {
            title: data.title,
            description: data.description,
            createdBy: user.id,
            status: "scheduled"
        };

        const interview = await interviewRepository.createInterview(payload);

        return interview;
    }

    async getInterviews(query) {
        return await interviewRepository.getInterviews(query);
    }

    async getInterviewById(id) {

        const interview = await interviewRepository.getInterviewById(id);

        if (!interview) {
            throw new AppError("Interview not found");
        }

        return interview;
    }

   async updateInterview(data, user) {

        const payload = {
            id: data.id,
            title: data.title,
            description: data.description,
            createdBy: user.id,
            status: "scheduled"
        };
        const interview = await interviewRepository.updateInterview(payload);
        if (!interview) {
            throw new AppError("Interview not found");
        }
        return interview;
    }
    async deleteInterview(id) {

        const interview = await interviewRepository.deleteInterview(id);

        if (!interview) {
            throw new AppError("Interview not found");
        }

        return interview;
    }
}

module.exports = new interviewService();