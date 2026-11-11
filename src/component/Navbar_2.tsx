
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

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
  Moon,
  Sun,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

// Navigation Items
const navItems = [
  { title: "Home", href: "/", icon: Home },
  { title: "Create Event", href: "/events/create", icon: CalendarPlus },
  { title: "Upcoming Events", href: "/events", icon: CalendarClock },
  { title: "My Events", href: "/events/my-events", icon: CalendarDays },
  {
    title: "Joined Events",
    href: "/events/joined-events",
    icon: CalendarCheck,
  },
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Profile", href: "/profile", icon: UserRound },
];

// Sidebar Content
function SidebarContent({
  mobile = false,
  isDark,
  onToggleTheme,
  mounted,
}: {
  mobile?: boolean;
  isDark: boolean;
  onToggleTheme?: () => void;
  mounted?: boolean;
}) {
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
    <div
      className={`flex h-full min-h-0 flex-col p-6 transition-colors duration-300 ${
        isDark
          ? "bg-[#17152f] text-white"
          : "bg-white text-gray-900"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="mb-12 flex shrink-0 items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white">
          <Heart size={23} />
        </div>

        <span className="text-2xl font-black">
          Event<span className="text-violet-500">Hub</span>
        </span>
      </Link>

      {/* Workspace */}
      <p
        className="mb-4 shrink-0 text-xs font-bold uppercase tracking-[2px] dark:text-slate-500 text-gray-400"
        
      >
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
              className={`flex h-12 w-full items-center gap-3 rounded-xl px-4 text-base transition-all duration-300 ${
                active
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white shadow-md shadow-violet-500/20"
                  : isDark
                    ? "text-slate-400 hover:bg-white/5 hover:text-white"
                    : "text-gray-600 hover:bg-violet-50 hover:text-violet-700"
              }`}
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );

          return (
            <div key={item.href}>
              {mobile ? (
                <SheetClose>
                  {linkContent}
                </SheetClose>
              ) : (
                linkContent
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div
        className={`mt-auto shrink-0 border-t pt-5 ${
          isDark ? "border-white/10" : "border-gray-200"
        }`}
      >
        {mobile ? (
          // MOBILE: Logout only
          <SheetClose>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex h-12 w-full items-center gap-3 rounded-xl px-4 font-semibold text-red-500 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={20} />
              Logout
            </button>
          </SheetClose>
        ) : (
          // DESKTOP: Logout + Theme Toggle side by side
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleSignOut}
              type="button"
              className="flex h-11 flex-1 items-center gap-3 rounded-xl px-4 font-semibold text-red-500 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={20} />
              Logout
            </button>

            <Button
              variant="ghost"
              size="icon"
              disabled={!mounted}
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`h-11 w-11 shrink-0 rounded-xl transition-all ${
                isDark
                  ? "text-yellow-400 hover:bg-gray-800"
                  : "text-violet-700 hover:bg-violet-50"
              }`}
            >
              {isDark ? <Sun size={21} /> : <Moon size={21} />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Navbar
export default function Navbar_2() {
  const { theme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isDark = mounted && theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 border-r lg:flex lg:flex-col">
        <SidebarContent
          isDark={isDark}
          mounted={mounted}
          onToggleTheme={toggleTheme}
        />
      </aside>

      {/* MOBILE NAVBAR */}
      <header
        className={`sticky top-0 z-50 flex h-16 items-center justify-between border-b px-4 transition-colors duration-300 lg:hidden ${
          isDark
            ? "border-gray-700 bg-[#17152f] text-white"
            : "border-gray-200 bg-white text-gray-900"
        }`}
      >
        {/* Mobile Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 text-white">
            <Heart size={20} />
          </div>

          <span className="text-xl font-black">
            Event<span className="text-violet-500">Hub</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Mobile Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            disabled={!mounted}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={
              isDark
                ? "text-yellow-400 hover:bg-gray-800"
                : "text-violet-700 hover:bg-violet-50"
            }
          >
            {isDark ? <Sun size={21} /> : <Moon size={21} />}
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition ${
                isDark
                  ? "text-white hover:bg-white/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Open navigation menu"
            >
              <Menu size={25} />
            </SheetTrigger>

            <SheetContent
              side="left"
              className={`h-dvh w-72 max-w-[85vw] p-0 ${
                isDark
                  ? "border-gray-700 bg-[#17152f] text-white"
                  : "border-gray-200 bg-white text-gray-900"
              }`}
            >
              <SheetTitle className="sr-only">
                Navigation Menu
              </SheetTitle>

              <SidebarContent mobile isDark={isDark} />
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
