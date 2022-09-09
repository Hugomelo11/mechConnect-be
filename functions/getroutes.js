import { MongoClient } from "mongodb";
import "dotenv/config";


const client = new MongoClient(process.env.MONGO_URI);
const database = client.db("MechConnectDB");
const MechConnectdbc = database.collection("MechConnectdbc");


// GET
export async function getVehicles(req, res) {
  const allVehicles = await MechConnectdbc.find().toArray(req.body);
  res.send(allVehicles);
}

// POST
export async function newVehicle(req, res) {
  const newVehicle = {
    info: req.body,
    createdAt: new Date(),
  };
  await MechConnectdbc.insertOne(newVehicle);

  res.send("not work");
}

// DELETE
export async function deleteVehicle(req, res) {
  await MechConnectdbc.findOneAndDelete(req.query);
  res.send("item deleted");
}


export async function updateVehicle (req, res) {
    MechConnectdbc.findOneAndUpdate(req.query, { $set: req.body });
  };