import { assert } from "chai";
import { db } from "../src/models/db.js";
import { maggie } from "./fixtures.js";

suite("User API tests", () => {

  setup(async () => {
    db.init();
  });

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(maggie);
    assert.equal(newUser, maggie);
  });
});