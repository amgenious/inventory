"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Plus } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const Addmeasurement = () => {
    const [name, setMeasurementName] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
        async function onSubmit() {
          setIsSubmitting(true)
          
          try {
            const response = await fetch("/api/measurement", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({name}),
            })
      
            if (!response.ok) {
              const error = await response.json()
              throw new Error(error.message || "Failed to create measurement")
            }
      
            toast(
               "Success! Measurement has been added.",
            )
            router.push('/dashboard/staticdata')
          } catch (error) {
            toast(
               `Failed to create category, Error: ${error}`
            )
          } finally {
            setIsSubmitting(false)
          }
        }
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="default"><Plus /> Add Measurement</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Measurement</DialogTitle>
        <DialogDescription>
          Add New Measurements here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="name">
            Measurement Name
          </Label>
          <Input id="name" placeholder="Measurement Name" onChange={(e) => setMeasurementName(e.target.value)} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting} onClick={onSubmit}>
        {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Post"
          )}
          </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default Addmeasurement