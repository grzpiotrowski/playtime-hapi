import { userJsonStore } from "./json/user-json-store.js";
import { playlistJsonStore } from "./json/playlist-json-store.js";
import { trackJsonStore } from "./json/track-json-store.js";

export const db = {
  userStore: null,
  playlistStore: null,
  trackStore: null,

  init() {
    this.userStore = userJsonStore;
    this.playlistStore = playlistJsonStore;
    this.trackStore = trackJsonStore;
  },
};