import {z} from "zod";

// defining validation for the single element

export const usernameValidation = z.
                           string()
                           .max(20, "username cannot be more than 20 characters")
                           .min(8, "username cannot be less than 8 letters")

// now for whole validation of signup schema

export const signupSchema= z.object(
    {
        username:usernameValidation,
        email:z.string().email()
               .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email pattern"
               ),
        password: z.string()
                   .min(8 ,"must be greater than 8 ")
                   .max(12 , "must be less than 12"),
        otp:z.number()
             .min(4 ," exactly of 4 character")     
              
})