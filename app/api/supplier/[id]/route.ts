import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb";
import Supplier from "@/models/supplier";

export async function DELETE(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase()
    
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 })
    }

    const deletedUser = await Supplier.findByIdAndDelete(id)

    if (!deletedUser) {
      return NextResponse.json({ message: "Supplier not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Supplier deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting supplier:", error)
    return NextResponse.json({ message: "Error deleting supplier" }, { status: 500 })
  }
}
