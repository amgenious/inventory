
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse} from "next/server";
import bcrypt from 'bcryptjs';


export async function POST(req:Request){
    try {
        const body = await req.json()
        const { name, email,pass,role } = body

        if (!name || !email  || !pass || !role) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }
        await connectToDatabase();
        const existingUser = await User.findOne({ email });

        if(existingUser) {
          const error = new Error('User already exists');
          return NextResponse.json({message:"User already exists"},{status:300});
        }
    
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);
        let password = hashedPassword
        const newUser = new User({ name, email, password,role});

        await newUser.save();
        return NextResponse.json({body},{status:201})
      } catch (error) {
        return NextResponse.json({ message: "Error creating user", error },{status:500});
      }
}
export async function GET(req:Request){
    try {
        await connectToDatabase();

        const users = await User.find();
        return NextResponse.json({users},{status:201});

      } catch (error) {
        return NextResponse.json({ message: "Error fetching users", error },{status:500});
      }
}
