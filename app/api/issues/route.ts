
import { connectToDatabase } from "@/lib/mongodb";
import Issues from "@/models/issues";
import { NextResponse} from "next/server";


export async function POST(req:Request){
    try {
        const body = await req.json()
        const { referencenumber,valuedate,transtype,transcode,customer,remarks,itemname,partnumber,location,quantity } = body

        if (!referencenumber || !customer  || !location || !partnumber) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }
        await connectToDatabase();
    
        const newStock = new Issues({ referencenumber, valuedate,transtype,transcode,customer,remarks,itemname,partnumber,location,quantity});

        await newStock.save();
        return NextResponse.json({body},{status:201})
      } catch (error) {
        return NextResponse.json({ message: `Error creating issue: ${error}`},{status:500});
      }
}
export async function GET(req:Request){
    try {
        await connectToDatabase();

        const issues = await Issues.find();
        return NextResponse.json({issues},{status:201});

      } catch (error) {
        return NextResponse.json({ message: "Error fetching issue", error },{status:500});
      }
}
