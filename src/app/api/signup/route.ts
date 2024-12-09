// here we save the data into the database if it is not registered  if they are registered then not saved the data  if the email is varified but  want to change the password

// importing the database declared
import { mongodbconnect } from "@/lib/dbconnect";
// to save the data according to the schema

import userModel from "@/Models/user";
// for password hashing

import bcrypt from 'bcryptjs';
import { sendingemail } from "@/helpers/sendVarificationEmails";


export async function POST(request: Request) {

    await mongodbconnect();   //connecting database on the user requests

    // now to fetch the data entered by the user at the frontend

    try {

        const { username, email, password } = await request.json();

        //    checking the case if username already used
        const usernamealreadyexist = await userModel.findOne({
            username,
            isVarified: true,
        });

        //   now condition if usernamealready exist

        if (usernamealreadyexist) {
            return Response.json({
                success: false,
                message: "username already exist",

            },
                {
                    status: 40
                })
        }
        // now check by email

        const emailalreadyexist = await userModel.findOne({
            email
        })

        // generating verifycode or otp

        const verifycode = Math.floor(100000 + Math.random() * 90000).toString()

        // condition for email

        if (emailalreadyexist) {

            if (emailalreadyexist.isVarified) {
                return Response.json({
                    success: false,
                    message: "email already exist"
                },
                    {
                        status: 400
                    })
            }
            else {
                const hashpassword = await bcrypt.hash(password, 10);
                emailalreadyexist.password = hashpassword;
                emailalreadyexist.verifycode = verifycode;
                emailalreadyexist.codeexpire = new Date(Date.now() + 36000000);
                await emailalreadyexist.save()


            }
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new userModel({
                username,
                email,
                password: hashedPassword,
                verifycode,
                codeexpire: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [],
            });

            await newUser.save();


        }

        const emailResponse = await sendingemail(
            email,
            username,
            verifycode
        );
        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                { status: 500 }
            );
        }



    }

    catch (error) {
        console.error('Error registering user:', error);
        return Response.json(
            {
                success: false,
                message: 'Error registering user',
            },
            { status: 500 }
        );
    }


}




