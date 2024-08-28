import {
  createUser,
  getUserByName,
  createSession,
} from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const genHashpassword = async (password) => {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

async function createNewUser(request, response) {
  const data = request.body;
  const password = data.password;
  const roleId = 1;

  if (data.password.length < 8) {
    response.status(400).send({ msg: "Password is too short" });
    return;
  }
  const getUserByUname = await getUserByName(data.username);

  if (getUserByUname.data) {
    response.status(404).send({ msg: "Username already taken..." });
    return;
  }

  const hashpassword = await genHashpassword(password);
  const hashedData = {
    username: data.username,
    password: hashpassword,
    roleId: roleId,
  };
  console.log(hashedData);

  try {
    await createUser(hashedData);

    response.send(data);
  } catch {
    response.status(404).send({ msg: "Unable to create User" });
  }
}

async function getUserInfo(request, response) {
  const data = request.body;
  const username = data.username;
  const storedDBUser = await getUserByName(data.username);

  if (!storedDBUser.data) {
    response.status(404).send({ msg: "Invalid credentials" });
    return;
  }
  const storedPassword = storedDBUser.data.password;
  const providedPassword = data.password;

  console.log(providedPassword, storedPassword);

  const isPasswordCheck = await bcrypt.compare(
    providedPassword,
    storedPassword
  );
  console.log(isPasswordCheck);
  if (isPasswordCheck) {
    var token = jwt.sign(
      { foo: storedDBUser.data.username },
      process.env.SECRET_KEY
    );

    const sessionData = { username, token };
    const roleId = storedDBUser.data.roleId;
    await createSession(sessionData);
    response
      .status(200)
      .send({ msg: "Login Successful", token, roleId, username });
    return;
  } else {
    response.status(400).send({ msg: "Invalid credentials" });
    return;
  }
}

export { createNewUser, getUserInfo };
