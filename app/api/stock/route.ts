
import { connectToDatabase } from "@/lib/mongodb";
import Stock from "@/models/stock";
import { NextResponse} from "next/server";


export async function POST(req:Request){
    try {
        const body = await req.json()
        const { name,category,location,measurement,partnumber,max_stock,min_stock,quantity,price } = body

        if (!name || !category  || !location || !partnumber) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }
        await connectToDatabase();
    
        const newStock = new Stock({ name, category, location,measurement,partnumber,max_stock,min_stock,quantity,price});

        await newStock.save();
        return NextResponse.json({body},{status:201})
      } catch (error) {
        return NextResponse.json({ message: `Error creating stock: ${error}`},{status:500});
      }
}
export async function GET(req:Request){
    try {
        await connectToDatabase();

        const stocks = await Stock.find();
        return NextResponse.json({stocks},{status:201});

      } catch (error) {
        return NextResponse.json({ message: "Error fetching stock", error },{status:500});
      }
}
