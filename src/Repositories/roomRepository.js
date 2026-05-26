const { InterviewRooms, RoomParticipants, Users } = require("../Models");

class roomRepository {

  async createRoom(payload) {
    return await InterviewRooms.create(payload);
  }

  async findByRoomId(roomId) {
    return await InterviewRooms.findOne({
      where: { roomId }
    });
  }

  async addParticipant(roomId, userId) {
    return await RoomParticipants.create({
      roomId,
      userId
    });
  }

  async findParticipant(roomId, userId) {
    return await RoomParticipants.findOne({
      where: { roomId, userId }
    });
  }

  async removeParticipant(roomId, userId) {
    return await RoomParticipants.destroy({
      where: { roomId, userId }
    });
  }

  async removeAllParticipants(roomId) {
    return await RoomParticipants.destroy({
      where: { roomId }
    });
  }

  async updateRoomStatus(roomId, status) {
    return await InterviewRooms.update(
      { status },
      { where: { roomId } }
    );
  }

  async getParticipants(roomId) {
    return await RoomParticipants.findAll({
      where: { roomId },
      include: [
        {
          model: Users,
          as: "user",   
          attributes: ["id", "name", "email"]
        }
      ]
    });
  }
}

module.exports = new roomRepository();