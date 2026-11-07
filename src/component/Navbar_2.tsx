"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  CalendarPlus,
  CalendarDays,
  LayoutDashboard,
  UserRound,
  Heart,
  LogOut,
  Menu,
  CalendarCheck,
  CalendarClock,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// Navigation Items
const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Create Event",
    href: "/events/create",
    icon: CalendarPlus,
  },
  {
    title: "Upcoming Events",
    href: "/events",
    icon: CalendarClock,
  },
  {
    title: "My Events",
    href: "/events/my-events",
    icon: CalendarDays,
  },
  {
    title: "Joined Events",
    href: "/joined-events",
    icon: CalendarCheck,
  },

  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserRound,
  },
];

// Sidebar Content
function SidebarContent({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleSignOut = async () => {
    try {
      await authClient.signOut();

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#17152f] p-6 text-white">
      {/* Logo */}
      <Link href="/" className="mb-12 flex shrink-0 items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500">
          <Heart size={23} />
        </div>

        <span className="text-2xl font-black">
          Event<span className="text-violet-400">Hub</span>
        </span>
      </Link>

      {/* Workspace */}
      <p className="mb-4 shrink-0 text-xs font-bold uppercase tracking-[2px] text-slate-500">
        Workspace
      </p>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/"
              ? pathname === "/"
              : item.href === "/events"
                ? pathname === "/events"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

          const linkContent = (
            <Link
              href={item.href}
              className={`flex h-12 w-full items-center gap-3 rounded-xl px-4 text-base transition ${
                active
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );

          return (
            <div key={item.href}>
              {mobile ? <SheetClose>{linkContent}</SheetClose> : linkContent}
            </div>
          );
        })}
      </nav>

      {/* Logout - Bottom */}
      <div className="mt-auto shrink-0 border-t border-white/10 pt-5">
        {mobile ? (
          <SheetClose>
            <button
              type="button"
              onClick={
                handleSignOut
              }
              className="flex h-12 w-full items-center gap-3 rounded-xl px-4 font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={20} />
              Logout
            </button>
          </SheetClose>
        ) : (
          <button
              onClick={
                handleSignOut
              }
            type="button"
            className="flex h-12 w-full items-center gap-3 rounded-xl px-4 font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={20} />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

// Main Navbar
export default function Navbar_2() {
  return (
    <>
      {/* Desktop Sidebar - Full Screen Height */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 lg:flex lg:flex-col z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Navbar */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#17152f] px-4 text-white lg:hidden">
        {/* Mobile Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500">
            <Heart size={20} />
          </div>

          <span className="text-xl font-black">
            Event<span className="text-violet-400">Hub</span>
          </span>
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white hover:bg-white/10"
            aria-label="Open navigation menu"
          >
            <Menu size={25} />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="h-dvh w-72 max-w-[85vw] border-none bg-[#17152f] p-0 text-white"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            <SidebarContent mobile />
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
