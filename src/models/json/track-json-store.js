import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/tracks.json"));
db.data = { tracks: [] };

export const trackJsonStore = {
  async getAllTracks() {
    await db.read();
    return db.data.tracks;
  },

  async addTrack(playlistId, track) {
    await db.read();
    track._id = v4();
    track.playlistid = playlistId;
    db.data.tracks.push(track);
    await db.write();
    return track;
  },

  async getTracksByPlaylistId(id) {
    await db.read();
    return db.data.tracks.filter((track) => track.playlistid === id);
  },

  async getTrackById(id) {
    await db.read();
    return db.data.tracks.find((track) => track._id === id);
  },

  async deleteTrack(id) {
    await db.read();
    const index = db.data.tracks.findIndex((track) => track._id === id);
    db.data.tracks.splice(index, 1);
    await db.write();
  },

  async deleteAllTracks() {
    db.data.tracks = [];
    await db.write();
  },

  async updateTrack(track, updatedTrack) {
    track.title = updatedTrack.title;
    track.artist = updatedTrack.artist;
    track.duration = updatedTrack.duration;
    await db.write();
  },
};
