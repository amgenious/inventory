import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb";
import Issues from "@/models/issues";

export async function DELETE(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase()
    
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ message: "Issue ID is required" }, { status: 400 })
    }

    const deletedUser = await Issues.findByIdAndDelete(id)

    if (!deletedUser) {
      return NextResponse.json({ message: "Issue not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Issue deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting issue:", error)
    return NextResponse.json({ message: "Error deleting issue" }, { status: 500 })
  }
}
