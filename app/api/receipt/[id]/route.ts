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

export async function PUT(req: Request,  { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json()
    const {invoicenumber,transtype,transcode,supplier,remarks } = body
    if(!transtype || !transcode){
      return NextResponse.json({message:"Missing receipt parameter"},{status:400})
    }
    await connectToDatabase()
    
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ message: "Receipt ID is required" }, { status: 400 })
    }

    const UpdateIssue = await Receipt.findByIdAndUpdate(id,
      { 
       invoicenumber:invoicenumber,
       transtype:transtype,
       transcode:transcode,
       supplier:supplier,
       remarks:remarks
    },
      { new: true })
    if (!UpdateIssue) {
      return NextResponse.json({ message: "Receipt update not successful" }, { status: 404 })
    }
    return NextResponse.json({ message: "Receipt updated successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error updating receipt:", error)
    return NextResponse.json({ message: "Error updating receipt" }, { status: 500 })
  }
}
