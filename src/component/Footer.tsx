
import Link from "next/link";
import {
  Heart,
  HandHeart,
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/upcoming-events" },
  { name: "Create Event", href: "/create-event" },
  { name: "Joined Events", href: "/joined-events" },
  { name: "Manage Events", href: "/manage-events" },
];

const communityLinks = [
  { name: "About Us", href: "/about" },
  { name: "Event Gallery", href: "/gallery" },
  { name: "Contact Us", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto px-4">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand Section */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <HandHeart className="size-6" />
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Event<span className="text-primary">Hub</span>
              </span>
            </Link>

            <p className="text-sm leading-7 text-muted-foreground">
              Bringing people together to create positive change.
              Discover community events, volunteer your time, and
              make a meaningful difference in your local community.
            </p>

            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Heart className="size-4 fill-current" />
              Together We Make a Difference
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-5 text-base font-semibold">
              Our Community
            </h3>

            <ul className="space-y-3">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-base font-semibold">
              Get In Touch
            </h3>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-primary" />
                <a href="mailto:hello@eventhub.com">
                  hello@eventhub.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-primary" />
                <a href="tel:+8801700000000">
                  +880 1700-000000
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Facebook"
              >
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="size-4" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="icon"

                aria-label="Instagram"
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="size-4" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="icon"
                aria-label="LinkedIn"
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 py-7 text-center md:flex-row">

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EventHub. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with
            <Heart className="size-4 fill-red-500 text-red-500" />
            for a better community.
          </p>

          <Button variant="link" className="gap-1">
            <Link href="/upcoming-events">
              Explore Events
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>

        </div>
      </div>
    </footer>
  );
}
