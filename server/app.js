import express from 'express';
import bcrypt from 'bcrypt'
import { dbConnection, db } from './dbConnection.js';
// import { MongoClient } from 'mongodb';


const app = express()
const port = 3000;

app.use(express.json())

//handling cors
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

//calling dbConnection
dbConnection()

app.get('/', (req, res) => res.send('Hello World!'))

// app.post('/signup',(req,res)=>{
//     console.log(req.body)
//     res.send({message:"got data "})
//     // req.on('data',(chunk)=>{
//     //     console.log(chunk.toString('utf-8'))
//     // })

// })

// Sample POST route to insert data

// controller for Signup
app.post('/signup', async (req, res) => {
  try {
    const { email, password, fname } = req.body;
    const newUser = req.body;
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      setTimeout(() => {
        return res.status(400).json({ message: 'Email already exists' });
      }, 1000);
    } else {
      // hashing password
      const passwordToBeHashed = password;
      const saltRounds = 10;
      bcrypt.hash(passwordToBeHashed, saltRounds, async (err, hasedPassword) => {
        if (err) throw err;
        console.log(hasedPassword)
        newUser.password = hasedPassword;
        if (hasedPassword) {
          const result = await db.collection('users').insertOne(newUser);
          res.status(201).json({ message: 'your data has been saved successfully!', insertedId: result.insertedId });
          console.log(result);
        }
      })
    }
  } catch (err) {
    res.status(500).json({ message: err, error: 'Failed to insert document' });
    console.log(err)
  }


});

// controller for login
app.post('/login',async(req,res)=>{
  const {email,password}=req.body;
  try{
    const checkUsernameExist = await db.collection('users').findOne({email});
    const {fname,lname} = checkUsernameExist;
    console.log(checkUsernameExist);
    
    const hasedPassword = checkUsernameExist.password;
    if(checkUsernameExist){
      const isMatchPassword = await bcrypt.compare(password,hasedPassword);
      console.log(isMatchPassword)
      if(isMatchPassword){
        res.status(201).json({message:'logged in successfully',fname,lname,email,login:true})
      }else{
        res.status(401).json({message:'username or password is incorrect'})
      }
    }else{
      res.status(404).json({message:'username does not exist'})
    }
  }catch(err){
    res.status(500).json({message:'internal server error',err:err})
  }

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))