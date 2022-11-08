import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import "dotenv/config";
import {
  deleteVehicle,
  getVehicles,
  newVehicle,
  updateVehicle,
} from "./getroutes.js";


const client = new MongoClient(process.env.MONGO_URI);
const database = client.db("MechConnectDB");
const MechConnectdbc = database.collection("MechConnectdbc");

client.connect();
console.log("Mongo connected");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urleconded({ entended: true}))

app.get("/vehicles", getVehicles);

app.post("/newVehicle", newVehicle);

app.delete("/", deleteVehicle);

app.put("/", updateVehicle);

export const api = functions.https.onRequest(app);
