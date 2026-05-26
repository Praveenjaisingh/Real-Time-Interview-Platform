const { Feedbacks } = require("../Models");

class feedbackRepository {

    async createFeedback(payload) {
        return await Feedbacks.create(payload);
    }

    async findByInterview(interviewId) {
        return await Feedbacks.findAll({
            where: { interviewId }
        });
    }

    async findByUser(userId) {
        return await Feedbacks.findAll({
            where: { interviewerId: userId }
        });
    }
}

module.exports = new feedbackRepository();