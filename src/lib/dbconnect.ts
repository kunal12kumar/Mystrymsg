import { connect } from "http2";
import mongoose  from "mongoose";

// now to solve the problem multiple connection to the database

// by using typescript 

type connectionObject ={
    isconnected?: number
}

const connection: connectionObject={}  // this is to store the current status of the connection initilally it is assigned with the empty value

// creating a fuction to connect with the mongodb consdering wheter it is connected already or not 

const mongodbconnect= async()=>{

    // to check whether our database is already connected or not

    if (connection.isconnected){
        console.log("Database is already connected ")

        return
    }

    // if not connected  

    try{

        const db=await mongoose.connect(process.env.MONGODB_URI || '')
        // ASSIGINING THE CONNECTION STATUUS TO THE CONNECTION OBJECT

        connection.isconnected=db.connections[0].readyState   //from db we are extracting the connections nad its element readyState

    }
    catch(error)
    {
        console.log("connection failed " ,error);
        process.exit(1)

    }
}

