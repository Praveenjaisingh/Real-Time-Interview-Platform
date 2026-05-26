const chatService = require("../Services/chatService");

exports.sendMessage = async (req, res, next) => {
    try {
        const message = await chatService.sendMessage(req.body, req.user);

        return res.status(201).json({
            status: true,
            message: "Message sent",
            data: message
        });

    } catch (error) {
        next(error);
    }
};

exports.getMessages = async (req, res, next) => {
    try {
        const messages = await chatService.getMessages(req.params.interviewId);

        return res.status(200).json({
            status: true,
            data: messages
        });

    } catch (error) {
        next(error);
    }
};

exports.deleteMessage = async (req, res, next) => {
    try {
        await chatService.deleteMessage(req.params.id);

        return res.status(200).json({
            status: true,
            message: "Message deleted"
        });

    } catch (error) {
        next(error);
    }
};