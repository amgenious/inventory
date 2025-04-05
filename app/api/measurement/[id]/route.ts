import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb";
import Measurement from "@/models/measurement";

export async function DELETE(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase()
    
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ message: "Measurement ID is required" }, { status: 400 })
    }

    const deletedUser = await Measurement.findByIdAndDelete(id)

    if (!deletedUser) {
      return NextResponse.json({ message: "Measurement not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Measurement deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting Measurement:", error)
    return NextResponse.json({ message: "Error deleting Measurement" }, { status: 500 })
  }
}
