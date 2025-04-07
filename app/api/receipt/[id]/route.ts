import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb";
import Receipt from "@/models/receipt";

export async function DELETE(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase()
    
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ message: "Receipt ID is required" }, { status: 400 })
    }

    const deletedUser = await Receipt.findByIdAndDelete(id)

    if (!deletedUser) {
      return NextResponse.json({ message: "Receipt not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Receipt deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting issue:", error)
    return NextResponse.json({ message: `Error deleting Receipt, ${error}` }, { status: 500 })
  }
}
