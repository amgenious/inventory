import { SectionCards } from "@/components/dashboard/section-cards"
import data from "./data.json"
import { DataTable } from "@/components/dashboard/data-table"

export default function Page() {
  return (
    <>
      <SectionCards />
      <DataTable data={data} />        
    </>
           
  )
}
