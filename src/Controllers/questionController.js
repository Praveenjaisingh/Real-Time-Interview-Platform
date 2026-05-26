const questionService = require("../Services/questionService");

exports.createQuestion = async (req, res, next) => {
    try {
        const question = await questionService.createQuestion(req.body);

        return res.status(201).json({
            status: true,
            message: "Question created",
            data: question
        });

    } catch (error) {
        next(error);
    }
};

exports.getQuestions = async (req, res, next) => {
    try {
        const questions = await questionService.getQuestions(req.query);

        return res.status(200).json({
            status: true,
            data: questions
        });

    } catch (error) {
        next(error);
    }
};

exports.getQuestionById = async (req, res, next) => {
    try {
        const interview = await questionService.getQuestionById(req.params.id);

        return res.status(200).json({
            status: true,
            data: interview
        });

    } catch (error) {
        next(error);
    }
};

exports.updateQuestion = async (req, res, next) => {
    try {
        const interview = await questionService.updateQuestion(req.params.id, req.body);

        return res.status(200).json({
            status: true,
            message: "Question updated successfully",
            data: interview
        });

    } catch (error) {
        next(error);
    }
};

exports.deleteQuestion = async (req, res, next) => {
    try {
        const interview = await questionService.deleteQuestion(req.params.id);

        return res.status(200).json({
            status: true,
            message: "Question deleted successfully",
            data: interview
        });

    } catch (error) {
        next(error);
    }
};