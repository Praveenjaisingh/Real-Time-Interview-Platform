const submissionService = require("../Services/submissionService");

exports.submitCode = async (req, res, next) => {
    try {
        const result = await submissionService.submitCode(req.body, req.user);

        return res.status(201).json({
            status: true,
            message: "Code submitted",
            data: result
        });

    } catch (error) {
        next(error);
    }
};