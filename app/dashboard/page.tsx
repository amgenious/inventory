import { SectionCards } from "@/components/dashboard/section-cards"
import Getallinventory from "@/components/inventory/getallinventory"
import DataTable from "@/components/dashboard/data-table"

export default function Page() {
  return (
    <>
      <SectionCards />
      <div className="px-6">
      <DataTable />        
      </div>
    </>
           
  )
}
