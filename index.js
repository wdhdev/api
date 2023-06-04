const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const router = require("./util/router");
const port = process.env.port;

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use("/", router);

app.listen(port, () => {
    console.log(`[API] Listening on Port: ${port}`);
})