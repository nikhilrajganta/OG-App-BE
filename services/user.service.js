import { User } from "../entities/user.entity.js";

async function createUser(addUser) {
  return await User.create(addUser).go();
}

async function getUserByName(username) {
  return await User.get({ username }).go();
}

export { createUser, getUserByName };
