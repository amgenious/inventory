"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { GalleryVerticalEnd, Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from 'next/navigation';
import { useState,useEffect } from "react"
import { toast } from "sonner"

const Loginform = () => {
    const [email,setEmail] = useState("")
    const [password,setPassowrd] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter();
    const searchParams = useSearchParams()
    const { login, isAuthenticated } = useAuth()
      
    const redirectPath = searchParams.get("from") || "/dashboard"

    useEffect(() => {
        if (isAuthenticated) {
          router.push(redirectPath)
        }
      }, [isAuthenticated, router, redirectPath])

async function onSubmit(){
    setIsSubmitting(true)
    try{
    const response = await fetch("/api/auth/signin",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({email,password})
    })
    if(!response.ok){
        const error = await response.json()
        console.log(error)
        toast.error(`Error signing in: ${error} `) 
    }else{
        toast.success("Sign In Successful")
        const data = await response.json();
        login(data.userInfo,data.token)
        router.push("/dashboard");
    }
    }catch(error){
        toast.error(`Failed to sign in: ${error}`)
    }finally{
    setIsSubmitting(false)
    }
}
if (!isAuthenticated) {
    return (
      <></>
    )
  }
  return (
    <div className="flex flex-col gap-6">
    <form>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <a
            href="#"
            className="flex flex-col items-center gap-2 font-medium"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-6" />
            </div>
          </a>
          <h1 className="text-xl font-bold">Inventory Management System</h1>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="****"
              required
              onChange={(e)=> setPassowrd(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting} onClick={onSubmit}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Siging In...
            </>
          ) : (
            "Sign In"
          )}
          </Button>
        </div>
        
      </div>
    </form>
    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
      By clicking sign in, you agree to our <a href="#">Terms of Service</a>{" "}
      and <a href="#">Privacy Policy</a>.
    </div>
  </div>
  )
}

export default Loginform
