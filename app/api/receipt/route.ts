
import { connectToDatabase } from "@/lib/mongodb";
import Receipt from "@/models/receipt";
import { NextResponse} from "next/server";


export async function POST(req:Request){
    try {
        const body = await req.json()
        const { referencenumber,valuedate,invoicenumber,invoicedate,transtype,transcode,supplier,remarks,itemname,partnumber,location,quantity } = body

        if (!referencenumber || !supplier  || !location || !partnumber) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }
        await connectToDatabase();
    
        const newReceipt = new Receipt({ referencenumber, valuedate,invoicenumber,invoicedate,transtype,transcode,supplier,remarks,itemname,partnumber,location,quantity});

        await newReceipt.save();
        return NextResponse.json({body},{status:201})
      } catch (error) {
        return NextResponse.json({ message: `Error creating receipt: ${error}`},{status:500});
      }
}
export async function GET(req:Request){
    try {
        await connectToDatabase();

        const receipts = await Receipt.find();
        return NextResponse.json({receipts},{status:201});

      } catch (error) {
        return NextResponse.json({ message: "Error fetching receipts", error },{status:500});
      }
}
