const { ChatMessages, Interviews, Users } = require("../Models");

class ChatRepository {

    async createMessage({ interviewId, senderId, message }) {

        const interview = await Interviews.findByPk(interviewId);

        if (!interview) {
            throw new Error("Invalid interviewId");
        }

        return await ChatMessages.create({
            interviewId,
            senderId,
            message
        });
    }

    async getMessagesByInterview(interviewId) {

        return await ChatMessages.findAll({
            where: { interviewId },
            order: [["createdAt", "ASC"]],
            include: [
                {
                    model: Users,
                    as: "sender",
                    attributes: ["id", "name"]
                }
            ]
        });
    }

    async findByIdOrFail(id) {

        const message = await ChatMessages.findByPk(id);

        if (!message) {
            throw new Error("Message not found");
        }

        return message;
    }

    async deleteMessage(id) {

        const message = await this.findByIdOrFail(id);

        await message.destroy();

        return true;
    }
}

module.exports = new ChatRepository();