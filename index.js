import express from "express";
import items from "./routes/items.route.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use("/items", items);

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩, OG ");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
