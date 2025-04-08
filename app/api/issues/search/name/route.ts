import { NextRequest, NextResponse } from 'next/server';
import Issues from "@/models/issues";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
    try{
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('query'); 
      
        if(!query){
            return NextResponse.json({message:"Missing query item"},{status:400})
        }
        await connectToDatabase()
        const searchedIssue = await Issues.find({itemname:query})
        if(!searchedIssue){
            return NextResponse.json({message:"Such reference does not exit"},{status:404})
        }
        return NextResponse.json({searchedIssue},{status:201})
       
    }catch(error){
         return NextResponse.json({ message: `Error searching issue: ${error}`},{status:500});
    }
}