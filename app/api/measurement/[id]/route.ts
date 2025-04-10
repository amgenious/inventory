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
export async function PUT(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try{
    const body = await req.json()
    const {name} = body
    if(!name){
      return NextResponse.json({message:"Missing measurement name"},{status:400})
    }
    await connectToDatabase()
    const id = (await params).id;
    if(!id){
      return NextResponse.json({message:"Measurement ID is required"},{status:300})
    }
    const UpdateLocation = await Measurement.findByIdAndUpdate(id,{name:name},{new:true})
    if(!UpdateLocation){
      return NextResponse.json({message:"Measurement update not successful"},{status:400})
    }
    return NextResponse.json({message:"Measurement updated successfully"},{status:201})
  }catch(error){
    console.error("Error updating measurement:", error)
    return NextResponse.json({ message: `Error updating measurement: ${error}` }, { status: 500 })    
  }
}
