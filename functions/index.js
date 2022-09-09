import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import "dotenv/config";
import { deleteVehicle, getVehicles, newVehicle, updateVehicle } from "./getroutes.js";



const client = new MongoClient(process.env.MONGO_URI);
const database = client.db("MechConnectDB");
const MechConnectdbc = database.collection("MechConnectdbc");

client.connect();
console.log("Mongo connected");

const app = express();
app.use(cors());
app.use(express.json());

// GET
app.get("/vehicles", getVehicles)

// POST
app.post("/newVehicle", newVehicle)

// DELETE

app.delete("/", deleteVehicle)

// PUT

app.put("/", updateVehicle)

export const api = functions.https.onRequest(app);


