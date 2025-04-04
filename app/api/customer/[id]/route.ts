import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb";
import Customer from "@/models/customer";

export async function DELETE(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase()
    
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ message: "Customer ID is required" }, { status: 400 })
    }

    const deletedUser = await Customer.findByIdAndDelete(id)

    if (!deletedUser) {
      return NextResponse.json({ message: "Customer not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Customer deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting customer:", error)
    return NextResponse.json({ message: "Error deleting customer" }, { status: 500 })
  }
}
