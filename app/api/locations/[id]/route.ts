import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb";
import Location from "@/models/location";

export async function DELETE(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase()
    
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ message: "Location ID is required" }, { status: 400 })
    }

    const deletedUser = await Location.findByIdAndDelete(id)

    if (!deletedUser) {
      return NextResponse.json({ message: "Location not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Location deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting Location:", error)
    return NextResponse.json({ message: "Error deleting location" }, { status: 500 })
  }
}
