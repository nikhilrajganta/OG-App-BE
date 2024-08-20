import express from "express";
import items from "./routes/items.route.js";
import cors from "cors";
import user from "./routes/user.route.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/items", items);
app.use("/user", user);

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩, OG ");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
