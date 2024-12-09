// in this we are going to send the email 
// here we are importing resend library and using it to send email
import { Resend } from "resend";

export const  resend= new Resend(process.env.RESEND_API);