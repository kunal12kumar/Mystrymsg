import {z} from "zod";

export const signinSchema= z.object({
    identifire:z.string(),
    password:z.string()
              .min(8,{message:"should be greater than 8 "})
              .max(12, {message:"should be smaller than 12 character"})
})