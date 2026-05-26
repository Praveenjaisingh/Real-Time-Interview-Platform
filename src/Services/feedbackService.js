const { Interviews } = require("../Models");
const feedbackRepository = require("../Repositories/feedbackRepository");

class feedbackService {

    async submitFeedback(data, user) {

        const interview = await Interviews.findByPk(data.interviewId);

        if (!interview) {
            throw new Error("Interview not found");
        }

        const payload = {
            interviewId: data.interviewId,
            interviewerId: user.id,
            candidateId: data.candidateId || null,
            rating: data.rating,
            comments: data.comment
        };

        return await feedbackRepository.createFeedback(payload);
    }

    async getFeedbackByInterview(interviewId) {
        return await feedbackRepository.findByInterview(interviewId);
    }

    async getFeedbackSummary(userId) {

        const feedbacks = await feedbackRepository.findByUser(userId);

        const total = feedbacks.length;

        const avgRating =
            total > 0
                ? feedbacks.reduce((acc, f) => acc + f.rating, 0) / total
                : 0;

        return {
            totalFeedbacks: total,
            averageRating: avgRating.toFixed(2)
        };
    }
}

module.exports = new feedbackService();