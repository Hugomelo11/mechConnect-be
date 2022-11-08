import { MongoClient } from "mongodb";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const client = new MongoClient(process.env.MONGO_URI);
const database = client.db("MechConnectDB");
const MechConnectdbc = database.collection("MechConnectdbc");

export const addUser = async (req, res) => {
  if (req.method === "POST" && req.body) {
    const { email, password, phone, address, vehicle, firstName, lastName } =
      req.body;
    try {
      const duplicateEmail = await vehicle.findOne({ email: email });
      if (!duplicateEmail) {
        const newUser = {
          email: email,
          phone: phone,
          password: password,
          address: address,
          firstName: firstName,
          lastName: lastName,
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertedUser = await vehicle.insertOne({
          ...newUser,
          password: hashedPassword,
        });
        console.log(insertedUser);
        newUser && res.status(200).json({ success: "User added " });
      } else {
        res.status(401).json({ error: "Email already exists " });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Invalid data or HTTP method" });
    }
  }
};

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

export async function updateVehicle(req, res) {
  MechConnectdbc.findOneAndUpdate(req.query, { $set: req.body });
}
