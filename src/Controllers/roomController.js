const roomService = require("../Services/roomService");

class roomController {

  async createRoom(req, res) {
    const room = await roomService.createRoom(req.body, req.user);

    return res.json({
      status: true,
      data: room
    });
  }

  async joinRoom(req, res) {
    const data = await roomService.joinRoom(req.params.id, req.user);

    return res.json({
      status: true,
      data
    });
  }

  async leaveRoom(req, res) {
    const data = await roomService.leaveRoom(req.params.id, req.user.id);

    return res.json({
      status: true,
      data
    });
  }

  async endRoom(req, res) {
    const data = await roomService.endRoom(req.params.id, req.user.id);

    return res.json({
      status: true,
      data
    });
  }

  async getParticipants(req, res) {
    const data = await roomService.getParticipants(req.params.id);

    return res.json({
      status: true,
      data
    });
  }
}

module.exports = new roomController();