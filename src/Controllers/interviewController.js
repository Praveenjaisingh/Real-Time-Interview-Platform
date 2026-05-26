const interviewService = require("../Services/interviewService");

exports.createInterview = async (req, res, next) => {
    try {
        const interview = await interviewService.createInterview(req.body, req.user);

        return res.status(201).json({
            status: true,
            message: "Interview created successfully",
            data: interview
        });

    } catch (error) {
        next(error);
    }
};

exports.getInterviews = async (req, res, next) => {
    try {
        const interviews = await interviewService.getInterviews(req.query);

        return res.status(200).json({
            status: true,
            data: interviews
        });

    } catch (error) {
        next(error);
    }
};

exports.getInterviewById = async (req, res, next) => {
    try {
        const interview = await interviewService.getInterviewById(req.params.id);

        return res.status(200).json({
            status: true,
            data: interview
        });

    } catch (error) {
        next(error);
    }
};

exports.updateInterview = async (req, res, next) => {
    try {
        const interview = await interviewService.updateInterview(
            {
                id: req.params.id,
                ...req.body
            },
            req.user
        );
        return res.status(200).json({
            status: true,
            message: "Interview updated successfully",
            data: interview
        });

    } catch (error) {
        next(error);
    }
};

exports.deleteInterview = async (req, res, next) => {
    try {
        const interview = await interviewService.deleteInterview(req.params.id);

        return res.status(200).json({
            status: true,
            message: "Interview deleted successfully",
            data: interview
        });

    } catch (error) {
        next(error);
    }
};