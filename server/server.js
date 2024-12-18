
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import https from "https";
import fs from "fs";
import connectDb from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

// SSL Certificate files (for production, use your CA's cert and key)
const privateKey = fs.readFileSync("path/to/your/private-key.pem", "utf8");
const certificate = fs.readFileSync("path/to/your/certificate.pem", "utf8");
const ca = fs.readFileSync("path/to/your/ca.pem", "utf8");

const credentials = { key: privateKey, cert: certificate, ca: ca };

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectDb();

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);

// HTTPS server
https.createServer(credentials, app).listen(PORT, () => {
  console.log(`App is listening on https://localhost:${PORT}`);
});
