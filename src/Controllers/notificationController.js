const notificationService = require("../Services/notificationService");

exports.getNotifications = async (req, res, next) => {
    try {
        const notifications = await notificationService.getNotifications(req.user.id);

        return res.status(200).json({
            status: true,
            data: notifications
        });

    } catch (error) {
        next(error);
    }
};

exports.markAsRead = async (req, res, next) => {
    try {
        await notificationService.markAsRead(req.body.notificationId);

        return res.status(200).json({
            status: true,
            message: "Marked as read"
        });

    } catch (error) {
        next(error);
    }
};

exports.deleteNotification = async (req, res, next) => {
    try {
        await notificationService.deleteNotification(req.params.id);

        return res.status(200).json({
            status: true,
            message: "Notification deleted"
        });

    } catch (error) {
        next(error);
    }
};