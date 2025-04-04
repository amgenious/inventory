
import { connectToDatabase } from "@/lib/mongodb";
import Supplier from "@/models/supplier";
import { NextResponse} from "next/server";



export async function POST(req:Request){
    try {
        const body = await req.json()
        const { name, email,contact,address } = body

        if (!name || !contact || !address) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }
        await connectToDatabase();
    
        const newSupplier = new Supplier({ name, email,contact, address});

        await newSupplier.save();
        return NextResponse.json({body},{status:201})
      } catch (error) {
        return NextResponse.json({ message: "Error creating user", error },{status:500});
      }
}
export async function GET(req:Request){
    try {
        await connectToDatabase();

        const suppliers = await Supplier.find();
        return NextResponse.json({suppliers},{status:201});

      } catch (error) {
        return NextResponse.json({ message: "Error fetching users", error },{status:500});
      }
}
