const chatRepository = require("../Repositories/chatRepository");
const AppError = require("../Helpers/AppError");

class ChatService {

    async sendMessage(data, user) {

        if (!data.interviewId || !data.message) {
            throw new AppError("Invalid payload", 400);
        }

        return await chatRepository.createMessage({
            interviewId: data.interviewId,
            senderId: user.id,
            message: data.message
        });
    }

    async getMessages(interviewId) {

        if (!interviewId) {
            throw new AppError("interviewId required", 400);
        }

        return await chatRepository.getMessagesByInterview(interviewId);
    }

    async deleteMessage(id, user) {

        const message = await chatRepository.findByIdOrFail(id);

        if (message.senderId !== user.id) {
            throw new AppError("Not allowed to delete this message", 403);
        }

        await chatRepository.deleteMessage(id);

        return true;
    }
}

module.exports = new ChatService();