
import { connectToDatabase } from "@/lib/mongodb";
import Location from "@/models/location";
import { NextResponse} from "next/server";


export async function POST(req:Request){
    try {
        const body = await req.json()
        const { name } = body

        if (!name ) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }
        await connectToDatabase();
        const newLocation = new Location({ name });

        await newLocation.save();
        return NextResponse.json({body},{status:201})
      } catch (error) {
        return NextResponse.json({ message: "Error creating location", error },{status:500});
      }
}
export async function GET(req:Request){
    try {
        await connectToDatabase();

        const locations = await Location.find();
        return NextResponse.json({locations},{status:201});

      } catch (error) {
        return NextResponse.json({ message: "Error fetching location", error },{status:500});
      }
}
