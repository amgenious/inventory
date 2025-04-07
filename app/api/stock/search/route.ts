import { NextRequest, NextResponse } from 'next/server';
import Stock from '@/models/stock';
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const name = searchParams.get('name'); 
    const quantity = searchParams.get('quantity'); 
    const category = searchParams.get('category'); 
    const partnumber = searchParams.get('partnumber'); 
    const location = searchParams.get('location'); 
    
    let query: any = {};
    if (name) query.name = name;
    if (quantity) query.quantity = quantity;
    if (category) query.category = category;
    if (partnumber) query.partnumber = partnumber;
    if (location) query.location = location;

    if (Object.keys(query).length === 0) {
        return NextResponse.json(
            { message: "At least one search parameter is required." },
            { status: 400 }
        );
    }
    try{
        await connectToDatabase()
        const searchedStock = await Stock.find(query)
        if(!searchedStock){
            return NextResponse.json({message:"Such reference does not exit"},{status:404})
        }
        return NextResponse.json({searchedStock},{status:201})
       
    }catch(error){
         return NextResponse.json({ message: `Error searching stock: ${error}`},{status:500});
    }

}