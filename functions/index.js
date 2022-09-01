import functions from 'firebase-functions'
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import 'dotenv/config'



const client = new MongoClient(process.env.MONGO_URI)
const database = client.db('MechConnectDB')
const MechConnectdbc = database.collection('MechConnectdbc')

client.connect()
console.log('Mongo connected')


const app = express()
app.use(cors())
app.use(express.json());


// GET
app.get('/', async (req, res) => {
    const allVehicles = await MechConnectdbc.find().toArray()
    res.send(allVehicles)
})

// POST 
app.post('/', async (req, res) => {
    await MechConnectdbc.insertOne(req.body)
    
    res.send('not work')
})

// DELETE

app.delete('/', async (req, res) => {
    await MechConnectdbc.findOneAndDelete(req.query)
    res.send('item deleted')
})

// PUT  

app.put('/', (req, res) => {
    MechConnectdbc.findOneAndUpdate(req.query, {$set: req.body})
})

export const api = functions.https.onRequest(app);

// app.listen(5005, () => console.log('api listening on port 5005')
// export const api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
