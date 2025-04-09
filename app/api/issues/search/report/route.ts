import { NextRequest, NextResponse } from 'next/server';
import Issues from '@/models/issues';
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
    try{
        const searchParams = request.nextUrl.searchParams;
        const referencenumber = searchParams.get('referencenumber'); 
        const partnumber = searchParams.get('partnumber'); 
        const customer = searchParams.get('customer'); 
        const startDate = searchParams.get('startDate'); 
        const endDate = searchParams.get('endDate'); 
      
        let query: any = {};
        if (referencenumber) query.referencenumber = referencenumber;
        if (partnumber) query.partnumber = partnumber;
        if (customer) query.customer = customer;
        if (startDate && endDate) {
            query.createdAt = {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            };
          }
    
        if (Object.keys(query).length === 0) {
            return NextResponse.json(
                { message: "At least one search parameter is required." },
                { status: 400 }
            );
        }
        await connectToDatabase()
        const searchedIssue = await Issues.find(query)
        
        if(!searchedIssue){
            return NextResponse.json({message:"Such reference does not exit"},{status:404})
        }

        return NextResponse.json({searchedIssue},{status:201})
       
    }catch(error){
         return NextResponse.json({ message: `Error searching isssue: ${error}`},{status:500});
    }
}