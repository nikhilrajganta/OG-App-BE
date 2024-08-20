import { createUser, getUserByName } from "../services/user.service.js";
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

  if (data.password.length < 8) {
    response.status(400).send({ msg: "Password is too short" });
    return;
  }
  const getUserByUname = await getUserByName(data.username);

  if (getUserByUname.data) {
    response.status(404).send({ msg: "user already exist" });
    return;
  }

  const hashpassword = await genHashpassword(data.password);

  try {
    await createUser({ username: data.username, password: hashpassword });

    response.send(data);
  } catch {
    response.status(404).send({ msg: "Unable to create User" });
  }
}

async function getUserInfo(request, response) {
  const data = request.body;
  console.log(data);

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
    response.status(200).send({ msg: "Login Successful", token });
    return;
  } else {
    response.status(400).send({ msg: "Invalid credentials" });
    return;
  }
}

export { createNewUser, getUserInfo };
