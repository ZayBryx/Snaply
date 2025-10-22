"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Home, Briefcase, LayoutTemplate, LogOut, Menu, X } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Business", href: "/admin/business", icon: Briefcase },
  { name: "Templates", href: "/admin/template", icon: LayoutTemplate },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAction();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 m-2 border rounded"
      >
        <Menu size={22} />
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={cn(
          "fixed md:relative z-30 w-64 bg-white border-r border-gray-200 flex flex-col h-full transform transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h1 className="text-lg font-semibold">Snaply Admin</h1>
            <p className="text-xs text-gray-500">Manage content and accounts</p>
          </div>
          <button onClick={() => setOpen(false)} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition",
                  active
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                )}
                onClick={() => setOpen(false)}
              >
                <Icon size={18} className="opacity-70" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4" />

        <div className="p-4">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-600 hover:text-gray-900"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut size={18} className="mr-3 opacity-70" />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>

        <div className="p-4 text-xs text-gray-500">
          © {new Date().getFullYear()} Snaply
        </div>
      </aside>
    </>
  );
}
