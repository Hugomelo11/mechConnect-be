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

app.listen(5005, () => console.log('api listening on port 5005'))


app.get('/', (req, res) => res.json('Hey from my api'))

// POST 
app.post('/', async (req, res) => {
    const newVehicle = {make: 'Honda', model: 'Accord', year: 2020}
    await MechConnectdbc.insertOne(newVehicle)
    res.send('Item was added to Mongo')
})

// DELETE

// PUT 



