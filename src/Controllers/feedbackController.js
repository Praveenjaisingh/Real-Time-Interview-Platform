const feedbackService = require("../Services/feedbackService");

exports.submitFeedback = async (req, res, next) => {
    try {
        const feedback = await feedbackService.submitFeedback(req.body, req.user);

        return res.status(201).json({
            status: true,
            message: "Feedback submitted",
            data: feedback
        });

    } catch (error) {
        next(error);
    }
};

exports.getFeedbackByInterview = async (req, res, next) => {
    try {
        const feedback = await feedbackService.getFeedbackByInterview(req.params.interviewId);

        return res.status(200).json({
            status: true,
            data: feedback
        });

    } catch (error) {
        next(error);
    }
};

exports.getFeedbackSummary = async (req, res, next) => {
    try {
        const summary = await feedbackService.getFeedbackSummary(req.params.userId);

        return res.status(200).json({
            status: true,
            data: summary
        });

    } catch (error) {
        next(error);
    }
};