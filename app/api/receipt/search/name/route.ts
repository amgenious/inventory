import { NextRequest, NextResponse } from 'next/server';
import Receipt from '@/models/receipt';
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
    try{
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('query1'); 
      
        if(!query){
            return NextResponse.json({message:"Missing query item"},{status:400})
        }
        await connectToDatabase()
        const searchedReceipt = await Receipt.find({itemname:query})
        
        if(!searchedReceipt){
            return NextResponse.json({message:"Such reference does not exit"},{status:404})
        }

        return NextResponse.json({searchedReceipt},{status:201})
       
    }catch(error){
         return NextResponse.json({ message: `Error searching receipt: ${error}`},{status:500});
    }
}