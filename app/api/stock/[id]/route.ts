import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb";
import Stock from "@/models/stock";

export async function DELETE(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase()
    
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ message: "Stock ID is required" }, { status: 400 })
    }

    const deletedUser = await Stock.findByIdAndDelete(id)

    if (!deletedUser) {
      return NextResponse.json({ message: "Stock not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Stock deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting stock:", error)
    return NextResponse.json({ message: "Error deleting stock" }, { status: 500 })
  }
}
export async function PUT(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json()
    const {newquantity} = body
    if(!newquantity){
      return NextResponse.json({message:"Missing new quantity"},{status:400})
    }
    await connectToDatabase()
    
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ message: "Stock ID is required" }, { status: 400 })
    }

    const UpdateStockQuantity = await Stock.findByIdAndUpdate(id,
      { quantity: newquantity },
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
