import BottomNav from "./_components/bottom-navbar";
import Navbar from "./_components/navbar";
import SideBar from "./_components/side-bar";
import { SidebarProvider } from "./context/sidebar-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <SideBar />

        <div className="flex flex-col flex-1">
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-1 p-8 bg-background overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
      <BottomNav />
    </SidebarProvider>
  );
}
