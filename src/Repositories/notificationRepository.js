const { Notifications } = require("../Models");

class notificationRepository {

    async create(payload) {
        return await Notifications.create(payload);
    }

    async findByUser(userId) {
        return await Notifications.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]]
        });
    }

    async findById(id) {
        return await Notifications.findByPk(id);
    }

    async update(id, payload) {
        return await Notifications.update(payload, {
            where: { id }
        });
    }

    async delete(id) {
        return await Notification.destroy({
            where: { id }
        });
    }
}

module.exports = new notificationRepository();