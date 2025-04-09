import { NextRequest, NextResponse } from 'next/server';
import Receipt from '@/models/receipt';
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
    try{
        const searchParams = request.nextUrl.searchParams;
        const referencenumber = searchParams.get('referencenumber'); 
        const partnumber = searchParams.get('partnumber'); 
        const invoicenumber = searchParams.get('invoicenumber'); 
        const supplier = searchParams.get('supplier'); 
        const startDate = searchParams.get('startDate'); 
        const endDate = searchParams.get('endDate'); 
      
        let query: any = {};
        if (referencenumber) query.referencenumber = referencenumber;
        if (partnumber) query.partnumber = partnumber;
        if (invoicenumber) query.invoicenumber = invoicenumber;
        if (supplier) query.supplier = supplier;
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
        const searchedReceipt = await Receipt.find(query)
        
        if(!searchedReceipt){
            return NextResponse.json({message:"Such reference does not exit"},{status:404})
        }

        return NextResponse.json({searchedReceipt},{status:201})
       
    }catch(error){
         return NextResponse.json({ message: `Error searching receipt: ${error}`},{status:500});
    }
}