// in this we will define the data types return by the api 

// here we are importing the message defined in the  the user

import { Message } from "@/Models/user";

export interface Apiresponses{
    success:boolean,
    message:string,
    isAcceptingmessage?:boolean,
    messages?:Array<Message>
}