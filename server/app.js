import  express from 'express';
import { MongoClient } from 'mongodb';
const app = express()
const port = 3000;
const DB_URI = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'todoAppDB';
let db;


app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Or specify your frontend URL
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    
    next();
});

// mongodb connetion===========

MongoClient.connect(DB_URI)
.then(client=>{
    console.log('✅ Connected to MongoDB');
    db=client.db(DB_NAME);
    // console.log(db)
}).catch(error=>console.error('❌ MongoDB connection failed',error))
//================mongodb=========

app.get('/', (req, res) => res.send('Hello World!'))

// app.post('/signup',(req,res)=>{
//     console.log(req.body)
//     res.send({message:"got data "})
//     // req.on('data',(chunk)=>{
//     //     console.log(chunk.toString('utf-8'))
//     // })

// })

// Sample POST route to insert data
app.post('/signup', async (req, res) => {
  try {
    const {email} = req.body;
    const newUser = req.body;
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
        setTimeout(() => {
            return res.status(400).json({ message: 'Email already exists' });
        }, 1000);
    }else{
        const result = await db.collection('users').insertOne(newUser);
    res.status(201).json({message:'your data has been saved successfully!', insertedId: result.insertedId });

  }
    }catch (err) {
    res.status(500).json({ message:err,error: 'Failed to insert document' });
  }

    
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))