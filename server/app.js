import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { dbConnection, db } from './dbConnection.js';
import { ObjectId } from 'mongodb';
// import { MongoClient } from 'mongodb';


const app = express()
const port = process.env.PORT || 3000;

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

// funtion to creating jwt
const createToken = (userId)=>{
  try{
    return jwt.sign({ id:userId}, process.env.JWT_SECRET,{ expiresIn: "1h" });
  }catch(err){
    console.log('token err',err)
  }
}
//=========================

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
          const token = createToken(result.insertedId)
          console.log(token)
          res.status(201).json({ message: 'your data has been saved successfully!', insertedId: result.insertedId,token });
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
    const {fname,lname,_id} = checkUsernameExist;
    console.log(checkUsernameExist);
    
    const hasedPassword = checkUsernameExist.password;
    if(checkUsernameExist){
      const isMatchPassword = await bcrypt.compare(password,hasedPassword);
      console.log(isMatchPassword)
      if(isMatchPassword){
        const token = createToken(_id)
        console.log(token)
        res.status(201).json({message:'logged in successfully',fname,lname,email,login:true,token})
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

//token verify

app.post('/verifyjwt', async(req,res)=>{
  const token = req.headers.authorization?.split(' ')[1];

  if(!token) return res.status(401).json({message:'Access Denied',status:false});
  try{
    const verified = jwt.verify(token,process.env.JWT_SECRET);
    req.user = verified;
    console.log(req.user);
    if(verified){
      const id = verified.id;
      const data =  await db.collection('users').findOne({_id:new ObjectId(`${id}`)}); 
      // console.log(data)
      res.status(201).json({message :'token verified successfully',status:true,data})
    }
  }catch(err){
    res.status(403).json({message:'invalid token',status:false})
  }
})



app.listen(port,'0.0.0.0', () => console.log(`Example app listening on port ${port}!`))