"use client"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import { useAuth } from "@/hooks/use-auth"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"


export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const { user, isAuthenticated, logout } = useAuth()
  const redirectPath = searchParams.get("from") || "/sign-in"
  const router = useRouter()

  useEffect(()=>{
    if(!isAuthenticated){
      router.push(redirectPath)
    }
  },[])
  if (!isAuthenticated) {
    return (
      <></>
    )
  }
    return (
        <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {children}
              </div>
              <Toaster richColors position="bottom-center"/>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }
  