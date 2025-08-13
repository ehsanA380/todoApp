import { loadEnvFile } from 'node:process';
import { MongoClient } from 'mongodb';

loadEnvFile();
const DB_URI = process.env.MONGO_URI ;
// const DB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'todoAppDB';
let db;

function dbConnection(){
    // mongodb connetion===========

    MongoClient.connect(DB_URI)
    .then(client=>{
        console.log('✅ Connected to MongoDB');
        db=client.db(DB_NAME);
        // console.log(db)
    }).catch(error=>console.error('❌ MongoDB connection failed',error))
    //================mongodb=========

}
export  {dbConnection,db}
