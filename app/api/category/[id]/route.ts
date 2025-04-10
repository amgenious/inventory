import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/models/category";

export async function DELETE(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase()
    
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ message: "Category ID is required" }, { status: 400 })
    }

    const deletedUser = await Category.findByIdAndDelete(id)

    if (!deletedUser) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ message: "Error deleting category" }, { status: 500 })
  }
}

export async function PUT(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try{
    const body = await req.json()
    const {name,description} = body
    if(!name){
      return NextResponse.json({message:"Missing Category name or description"},{status:400})
    }
    await connectToDatabase()
    const id = (await params).id;
    if(!id){
      return NextResponse.json({message:"Category ID is required"},{status:300})
    }
    const UpdateLocation = await Category.findByIdAndUpdate(id,{name:name,description:description},{new:true})
    if(!UpdateLocation){
      return NextResponse.json({message:"Category update not successful"},{status:400})
    }
    return NextResponse.json({message:"Category updated successfully"},{status:201})
  }catch(error){
    console.error("Error updating category:", error)
    return NextResponse.json({ message: `Error updating category: ${error}` }, { status: 500 })    
  }
}
