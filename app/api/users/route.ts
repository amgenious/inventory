
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse} from "next/server";


export async function POST(req:Request){
    try {
        const body = await req.json()
        const { name, email } = body

        if (!name || !email ) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }
        await connectToDatabase();
        const newUser = new User({ name, email });

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
