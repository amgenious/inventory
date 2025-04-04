
import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/models/category";
import { NextResponse} from "next/server";


export async function POST(req:Request){
    try {
        const body = await req.json()
        const { name,description } = body

        if (!name || !description) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }
        await connectToDatabase();
        const newCategory = new Category({ name, description });

        await newCategory.save();
        return NextResponse.json({body},{status:201})
      } catch (error) {
        return NextResponse.json({ message: "Error creating location", error },{status:500});
      }
}
export async function GET(req:Request){
    try {
        await connectToDatabase();

        const category = await Category.find();
        return NextResponse.json({category},{status:201});

      } catch (error) {
        return NextResponse.json({ message: "Error fetching location", error },{status:500});
      }
}
