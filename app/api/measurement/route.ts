
import { connectToDatabase } from "@/lib/mongodb";
import Measurement from "@/models/measurement";
import { NextResponse} from "next/server";


export async function POST(req:Request){
    try {
        const body = await req.json()
        const { name } = body

        if (!name) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }
        await connectToDatabase();
        const newMeasurement = new Measurement({ name });

        await newMeasurement.save();
        return NextResponse.json({body},{status:201})
      } catch (error) {
        return NextResponse.json({ message: "Error creating measurement", error },{status:500});
      }
}
export async function GET(req:Request){
    try {
        await connectToDatabase();

        const measurement = await Measurement.find();
        return NextResponse.json({measurement},{status:201});

      } catch (error) {
        return NextResponse.json({ message: "Error fetching measurement", error },{status:500});
      }
}
