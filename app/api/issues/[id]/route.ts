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
export async function PUT(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json()
    const {transtype,transcode,customer,remarks } = body
    if(!transtype || !transcode){
      return NextResponse.json({message:"Missing issue parameter"},{status:400})
    }
    await connectToDatabase()
    
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ message: "Issue ID is required" }, { status: 400 })
    }

    const UpdateIssue = await Issues.findByIdAndUpdate(id,
      { 
       transtype:transtype,
       transcode:transcode,
       customer:customer,
       remarks:remarks
    },
      { new: true })
    if (!UpdateIssue) {
      return NextResponse.json({ message: "Issue update not successful" }, { status: 404 })
    }
    return NextResponse.json({ message: "Issue updated successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error updating issue:", error)
    return NextResponse.json({ message: "Error updating issue" }, { status: 500 })
  }
}