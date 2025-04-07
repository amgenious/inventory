import React from 'react'
import {
Tabs,
TabsContent,
TabsList,
TabsTrigger,
} from "@/components/ui/tabs"
import Issuescorrection from './issues-correction'
import Receiptcorrection from './receipt-correction'

const Errorcorrectiondata = () => {
  return (
    <Tabs defaultValue="Issues" className="w-full flex flex-row gap-5">
    <TabsList className="flex flex-col gap-4 h-full w-[150px]">
      <TabsTrigger value="Issues" className='w-full flex justify-start cursor-pointer'>Issues</TabsTrigger>
      <TabsTrigger value="Receipts" className='w-full flex justify-start cursor-pointer'>Receipts</TabsTrigger>
    </TabsList>
    <TabsContent value="Issues">
      <Issuescorrection />
    </TabsContent>
    <TabsContent value="Receipts">
      <Receiptcorrection />
    </TabsContent>
  </Tabs>
  )
}

export default Errorcorrectiondata