#!/usr/bin/env node

const wol = require("wol");
const express = require("express");

const app = express();

const MAC_ADDRESS = process.env.MAC;
const GO = process.env.GO;

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.post("/go", (req, res) => {
  if (req.header("go") === GO) {
    wol.wake(MAC_ADDRESS, (err, res) => {
      console.log(`Woke at: ${new Date()}`);
    });
    res.json({ success: true });
  } else {
    res.status(200).send();
  }
});

app.set("listen_address", process.env.ADDRESS || "localhost");
app.set("port", process.env.PORT || 8732);

app.use(express.json());

app.listen(app.get("port"), app.get("listen_address"), () => {
  console.log(
    `Find the server at: http://${app.get("listen_address")}:${app.get(
      "port"
    )}/`
  );
});
