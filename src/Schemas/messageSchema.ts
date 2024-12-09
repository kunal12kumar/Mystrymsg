// This is the validation for the message sent by the 
import {z} from "zod";

export const messageSchema= z.object({
    content:z.string()
             .min(20, {message:"content should must be more than 20 words"})
             .max(300, {message: "content should less than 300 words"})


})