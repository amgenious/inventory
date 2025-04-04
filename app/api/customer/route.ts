
import { connectToDatabase } from "@/lib/mongodb";
import Customer from "@/models/customer";
import { NextResponse} from "next/server";



export async function POST(req:Request){
    try {
        const body = await req.json()
        const { name, email,contact,address } = body

        if (!name || !contact || !address) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }
        await connectToDatabase();
    
        const newCustomer = new Customer({ name, email,contact, address});

        await newCustomer.save();
        return NextResponse.json({body},{status:201})
      } catch (error) {
        return NextResponse.json({ message: "Error creating customer", error },{status:500});
      }
}
export async function GET(req:Request){
    try {
        await connectToDatabase();

        const customers = await Customer.find();
        return NextResponse.json({customers},{status:201});

      } catch (error) {
        return NextResponse.json({ message: "Error fetching customer", error },{status:500});
      }
}
