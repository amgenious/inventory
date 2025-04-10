import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

export async function DELETE(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase()
    
    const id = (await params).id;

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

export async function PUT(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try{
    const body = await req.json()
    const { name, email,role } = body
    if(!name){
      return NextResponse.json({message:"Missing user parameters"},{status:400})
    }
    await connectToDatabase()
    const id = (await params).id;
    if(!id){
      return NextResponse.json({message:"User ID is required"},{status:300})
    }
    const Updateuser = await User.findByIdAndUpdate(id,{name:name,email:email,role:role},{new:true})
    if(!Updateuser){
      return NextResponse.json({message:"User update not successful"},{status:400})
    }
    return NextResponse.json({message:"User updated successfully"},{status:201})

  }catch(error){
    console.error("Error updating user:", error)
    return NextResponse.json({ message: `Error updating user: ${error}` }, { status: 500 })    
  }
}