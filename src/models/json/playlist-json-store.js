import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { Low } from "lowdb";
// eslint-disable-next-line import/no-unresolved
import { JSONFile } from "lowdb/node";
import { trackJsonStore } from "./track-json-store.js";

const db = new Low(new JSONFile("./src/models/json/playlists.json"));
db.data = { playlists: [] };

export const playlistJsonStore = {
  async getAllPlaylists() {
    await db.read();
    return db.data.playlists;
  },

  async addPlaylist(playlist) {
    await db.read();
    playlist._id = v4();
    db.data.playlists.push(playlist);
    await db.write();
    return playlist;
  },

  async getPlaylistById(id) {
    await db.read();
    let list = db.data.playlists.find((playlist) => playlist._id === id);
    if (list) {
      list.tracks = await trackJsonStore.getTracksByPlaylistId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserPlaylists(userid) {
    await db.read();
    return db.data.playlists.filter((playlist) => playlist.userid === userid);
  },

  async deletePlaylistById(id) {
    await db.read();
    const index = db.data.playlists.findIndex((playlist) => playlist._id === id);
    if (index !== -1) db.data.playlists.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaylists() {
    db.data.playlists = [];
    await db.write();
  },
};
