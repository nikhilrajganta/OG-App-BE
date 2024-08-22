import { User } from "../entities/user.entity.js";
import { Session } from "../entities/session.entity.js";

async function createUser(addUser) {
  return await User.create(addUser).go();
}

async function getUserByName(username) {
  return await User.get({ username }).go();
}

async function createSession(sessionData) {
  return await Session.create(sessionData).go();
}

export { createUser, getUserByName, createSession };
