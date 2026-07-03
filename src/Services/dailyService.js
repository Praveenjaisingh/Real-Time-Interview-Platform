const axios = require("axios");
const AppError = require("../Helpers/AppError");

const DAILY_API_URL = "https://api.daily.co/v1";

const dailyClient = axios.create({
  baseURL: DAILY_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
    "Content-Type": "application/json"
  }
});

class DailyService {

  /**
   * Creates a video room on Daily.co for a given interview room.
   * Rooms auto-expire (exp) so stale rooms don't pile up if "end" is never called.
   */
  async createRoom(roomName) {

    if (!process.env.DAILY_API_KEY) {
      throw new AppError(
        "Video provider not configured. Set DAILY_API_KEY in your environment.",
        500
      );
    }

    try {
      const nowInSeconds = Math.floor(Date.now() / 1000);

      const { data } = await dailyClient.post("/rooms", {
        name: roomName,
        privacy: "private",
        properties: {
          exp: nowInSeconds + 60 * 60 * 6, // auto-expire in 6 hours
          enable_chat: true,
          enable_screenshare: true,
          enable_recording: "cloud",
          start_video_off: false,
          start_audio_off: false,
          eject_at_room_exp: true
        }
      });

      return data; // { name, url, ... }

    } catch (error) {
      const message =
        error.response?.data?.info ||
        error.response?.data?.error ||
        error.message;

      throw new AppError(`Failed to create video room: ${message}`, 502);
    }
  }

  /**
   * Issues a short-lived meeting token so the participant's name and
   * owner/host permissions (mute others, end room, start recording) carry
   * into the call.
   */
  async createMeetingToken(roomName, userName, isOwner = false) {

    if (!process.env.DAILY_API_KEY) {
      throw new AppError(
        "Video provider not configured. Set DAILY_API_KEY in your environment.",
        500
      );
    }

    try {
      const { data } = await dailyClient.post("/meeting-tokens", {
        properties: {
          room_name: roomName,
          user_name: userName,
          is_owner: isOwner,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4
        }
      });

      return data.token;

    } catch (error) {
      const message =
        error.response?.data?.info ||
        error.response?.data?.error ||
        error.message;

      throw new AppError(`Failed to create meeting token: ${message}`, 502);
    }
  }

  async deleteRoom(roomName) {

    if (!process.env.DAILY_API_KEY) return;

    try {
      await dailyClient.delete(`/rooms/${roomName}`);
    } catch (error) {
      // Room may already be gone/expired - not fatal, just log it.
      console.log("Daily room cleanup skipped:", error.response?.data || error.message);
    }
  }
}

module.exports = new DailyService();
