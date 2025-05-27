import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/admin/components/Layout/SideBar/app-sidebar"

export default function LayoutSideBar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-white">
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}