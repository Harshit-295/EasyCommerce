import User from "@/model/userSchema"
import bcryptjs from "bcryptjs";
import { NextResponse,NextRequest} from "next/server";
import jwt from "jsonwebtoken";
import {connect} from "@/dbConfig/dbConfig";

connect();


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {username,email,password} = reqBody;
        
        // check the existing user is or not
        const user = User.findOne({email});
        if(!user){
            return NextResponse.json({message:"Email already exists"})
        }


        // create the new user 
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})   
    }
}