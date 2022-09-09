import { MongoClient } from "mongodb";
import "dotenv/config";


export const client = new MongoClient(process.env.MONGO_URI);
export const database = client.db("MechConnectDB");
export const MechConnectdbc = database.collection("MechConnectdbc");