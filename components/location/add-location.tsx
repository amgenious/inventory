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
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function Addlocation() {
    const [name, setLocationName] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    async function onSubmit() {
      setIsSubmitting(true)
      
      try {
        const response = await fetch("/api/locations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name}),
        })
  
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || "Failed to create post")
        }
  
        toast(
           "Success! Location has been created",
        )
        router.refresh()
      } catch (error) {
        toast(
           `Failed to create location, Error ${error}`,
        )
      } finally {
        setIsSubmitting(false)
      }
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default"><Plus /> Add Location</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Location</DialogTitle>
          <DialogDescription>
            Add New Locations here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Location Name
            </Label>
            <Input id="name" placeholder="Location Name" onChange={(e) => setLocationName(e.target.value)} className="col-span-3" required/>
          </div>
        </div>
        <DialogFooter>
        <Button type="submit" className="w-full" disabled={isSubmitting} onClick={onSubmit}>
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
