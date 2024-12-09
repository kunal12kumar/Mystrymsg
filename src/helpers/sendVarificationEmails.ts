//  In this we are going to write the syntax of sending email and the content 

// importing resend(api key) created from the   resendemail created in the lib file to use to send the email

import {resend} from "../lib/Resendemail"
// import the template used in the email

import VerificationEmail from "../../emails/verificationEmail"

// 

import { Apiresponses } from "@/types/Apiresponses"
import exp from "constants"

export const sendingemail= async(email:string, username:string ,verifycode:string): Promise<Apiresponses> => {

    try{

        await resend.emails.send({
            from:'Acme <onboarding@resend.dev>',
            to:email,
            subject:'Mystry message verification code',
            react:VerificationEmail({username, otp: verifycode})  //here we are sending the username and otp to the email template
            
        });

        return {success: true , message: "Email send successfully"};



    }
    catch(error
    ){
        console.error('Error sending email',error);  

        return {success:false , message:"Email verification failed"}

    }

}