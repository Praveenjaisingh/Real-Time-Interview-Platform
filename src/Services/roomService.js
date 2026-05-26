const { v4: uuidv4 } = require("uuid");
const roomRepository = require("../Repositories/roomRepository");
const AppError = require("../Helpers/AppError");
const { Interviews } = require("../Models");

class RoomService {

  async createRoom(data, user) {

    if (!user?.id) {
      throw new AppError("Invalid user");
    }

    const interview = await Interviews.findByPk(data.interviewId);

    if (!interview) {
      throw new AppError("Interview not found");
    }

    const roomId = uuidv4();

    const room = await roomRepository.createRoom({
      interviewId: Number(data.interviewId),
      createdBy: user.id,
      roomId,
      status: "active"
    });

    return room;
  }

  async joinRoom(roomId, user) {

    const room = await roomRepository.findByRoomId(roomId);
    if (!room) throw new AppError("Room not found");

    const exists = await roomRepository.findParticipant(roomId, user.id);
    if (exists) throw new AppError("Already joined");

    return await roomRepository.addParticipant(roomId, user.id);
  }

  async leaveRoom(roomId, userId) {

    const room = await roomRepository.findByRoomId(roomId);
    if (!room) throw new AppError("Room not found");

    await roomRepository.removeParticipant(roomId, userId);

    return { success: true };
  }

  async endRoom(roomId, userId) {

    const room = await roomRepository.findByRoomId(roomId);
    if (!room) throw new AppError("Room not found");

    if (room.createdBy !== userId) {
      throw new AppError("Only interviewer can end room");
    }

    await roomRepository.updateRoomStatus(roomId, "ended");
    await roomRepository.removeAllParticipants(roomId);

    return { success: true };
  }

  async getParticipants(roomId) {

    const room = await roomRepository.findByRoomId(roomId);
    if (!room) throw new AppError("Room not found");

    return await roomRepository.getParticipants(roomId);
  }
}

module.exports = new RoomService();