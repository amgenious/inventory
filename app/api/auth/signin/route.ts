import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse} from "next/server";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export async function POST(req:Request){
    try {
        const body = await req.json()
        const {email,password } = body

        if (!email  || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }
        await connectToDatabase();
        const existingUser = await User.findOne({ email });
        const userInfo = await User.findOne({ email }).select('-password');
        
        if(!existingUser) {
            const error = new Error('User does not exist');
            return NextResponse.json({message:"User does not exist",error},{status:300});
          }
        // Hash password
        const checkPassword = bcrypt.compareSync(password,existingUser.password)
        if(checkPassword === true){
            const token = jwt.sign({userid:existingUser._id}, 'newsecret', {
                expiresIn:"5h",
            });
            return NextResponse.json({token,userInfo})
        }else{
            return NextResponse.json({message:"Wrong Password"}) 
        }
      } catch (error) {
        return NextResponse.json({ message: "Error signing user", error },{status:500});
      }
}