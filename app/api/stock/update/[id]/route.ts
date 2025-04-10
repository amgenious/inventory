import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb";
import Stock from "@/models/stock";
import { min } from "date-fns";

export async function PUT(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json()
    const { name,category,location,measurement,partnumber,max_stock,min_stock,quantity,price } = body
    if(!name){
      return NextResponse.json({message:"Missing stock parameter"},{status:400})
    }
    await connectToDatabase()
    
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ message: "Stock ID is required" }, { status: 400 })
    }

    const UpdateStockQuantity = await Stock.findByIdAndUpdate(id,
      { 
        name:name,
        category:category,
        location:location,
        measurement,
        partnumber:partnumber,
        max_stock:max_stock,
        min_stock:min_stock,
        quantity: quantity,
        price:price 
    },
      { new: true })
    if (!UpdateStockQuantity) {
      return NextResponse.json({ message: "Stock update not successful" }, { status: 404 })
    }
    return NextResponse.json({ message: "Stock updated successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error updating stock:", error)
    return NextResponse.json({ message: "Error updating stock" }, { status: 500 })
  }
}