const notificationRepository = require("../Repositories/notificationRepository");
const AppError = require("../Helpers/AppError");

class notificationService {

    async getNotifications(userId) {
        return await notificationRepository.findByUser(userId);
    }

    async markAsRead(notificationId) {

        const notification = await notificationRepository.findById(notificationId);

        if (!notification) {
            throw new AppError("Notification not found");
        }

        return await notificationRepository.update(notificationId, {
            isRead: true
        });
    }

    async deleteNotification(id) {
        return await notificationRepository.delete(id);
    }
}

module.exports = new notificationService();