import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testPlaylists, testTracks, beethoven, mozart, concerto, testUsers } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Track Model tests", () => {

  let beethovenList = null;

  setup(async () => {
    db.init("mongo");
    await db.playlistStore.deleteAllPlaylists();
    await db.trackStore.deleteAllTracks();
    beethovenList = await db.playlistStore.addPlaylist(beethoven);
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testTracks[i] = await db.trackStore.addTrack(beethovenList._id, testTracks[i]);
    }
  });

  test("create single track", async () => {
    const mozartList = await db.playlistStore.addPlaylist(mozart);
    const track = await db.trackStore.addTrack(mozartList._id, concerto)
    assert.isNotNull(track._id);
    assertSubset (concerto, track);
  });

  test("get multiple tracks", async () => {
    const tracks = await db.trackStore.getTracksByPlaylistId(beethovenList._id);
    assert.equal(testTracks.length, testTracks.length)
  });

  test("delete all tracks", async () => {
    const tracks = await db.trackStore.getAllTracks();
    assert.equal(testTracks.length, tracks.length);
    await db.trackStore.deleteAllTracks();
    const newTracks = await db.trackStore.getAllTracks();
    assert.equal(0, newTracks.length);
  });

  test("get a track - success", async () => {
    const mozartList = await db.playlistStore.addPlaylist(mozart);
    const track = await db.trackStore.addTrack(mozartList._id, concerto)
    const newTrack = await db.trackStore.getTrackById(track._id);
    assertSubset (concerto, newTrack);
  });

  test("delete One Track - success", async () => {
    await db.trackStore.deleteTrack(testTracks[0]._id);
    const tracks = await db.trackStore.getAllTracks();
    assert.equal(tracks.length, testPlaylists.length - 1);
    const deletedTrack = await db.trackStore.getTrackById(testTracks[0]._id);
    assert.isNull(deletedTrack);
  });

  test("get a track - bad params", async () => {
    assert.isNull(await db.trackStore.getTrackById(""));
    assert.isNull(await db.trackStore.getTrackById());
  });

  test("delete one track - fail", async () => {
    await db.trackStore.deleteTrack("bad-id");
    const tracks = await db.trackStore.getAllTracks();
    assert.equal(tracks.length, testPlaylists.length);
  });
});
