const { v4: uuidv4 } = require("uuid");
const roomRepository = require("../Repositories/roomRepository");
const AppError = require("../Helpers/AppError");
const dailyService = require("./dailyService");
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

    // Create the actual video room on Daily.co - the returned URL is what
    // the frontend embeds to give a Meet/Teams-style call experience.
    const videoRoom = await dailyService.createRoom(roomId);

    const room = await roomRepository.createRoom({
      interviewId: Number(data.interviewId),
      createdBy: user.id,
      roomId,
      meetingLink: videoRoom.url,
      status: "active"
    });

    return room;
  }

  async joinRoom(roomId, user) {

    const room = await roomRepository.findByRoomId(roomId);
    if (!room) throw new AppError("Room not found");

    if (room.status === "ended") {
      throw new AppError("This interview room has ended");
    }

    const exists = await roomRepository.findParticipant(roomId, user.id);

    if (!exists) {
      await roomRepository.addParticipant(roomId, user.id);
    }

    // The host (room creator) joins with owner privileges (can mute
    // others, start recording, end the call for everyone).
    const isOwner = room.createdBy === user.id;

    const token = await dailyService.createMeetingToken(
      roomId,
      user.name || user.email || `User ${user.id}`,
      isOwner
    );

    return {
      roomId: room.roomId,
      meetingLink: room.meetingLink,
      token,
      isOwner
    };
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

    await dailyService.deleteRoom(roomId);

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