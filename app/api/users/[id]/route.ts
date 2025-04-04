import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    
    const { id } = params

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 })
    }

    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 })
  }
}
