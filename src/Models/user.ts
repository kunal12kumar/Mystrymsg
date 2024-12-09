import mongoose ,{Schema, Document} from "mongoose";
import { string } from "zod";


// now we are using typescript to specify validation and custome validation 

// creating a interface for each model so we can use it in schema to validate the data type

export interface Message extends Document{
    content:string;
    createdAt: Date
};

// Now defining the schema for message 

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
});

// interface for user

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifycode:string;
    isVarified:boolean,
    codeexpire:Date;
    isAccepted:boolean;
    message:Message[]


}


const UserSchema : Schema <User>= new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true

    },
    verifycode:{
        type:String,
        required:true
    },
    isVarified:{
        type:Boolean,
        required:true
    },
    codeexpire:{
        type:Date,
        default: Date.now
    },
    isAccepted:{
        type:Boolean,
        required:true

    },
    message:[MessageSchema]



})

// since this is next js so we define schema so that if schema is created in the database the it will get used if there is no schema present there then a new will get created

const userModel= mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema);

export default userModel;