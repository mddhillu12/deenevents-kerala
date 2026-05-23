// components/Footer.tsx
import Link from "next/link";
import { Heart, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 py-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-bold text-2xl mb-4 text-white">DeenEvents</h3>
            <p className="text-emerald-300 text-sm">
              Connecting the Muslim community in Kerala through authentic Islamic events.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/submit" className="hover:text-white transition">Submit Event</Link></li>
              <li><Link href="/districts" className="hover:text-white transition">Districts</Link></li>
              <li><Link href="/scholars" className="hover:text-white transition">Scholars</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/saved" className="hover:text-white transition">Saved Events</Link></li>
              <li><Link href="/my-events" className="hover:text-white transition">My Events</Link></li>
              <li><a href="#" className="hover:text-white transition">Join WhatsApp Channel</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>contact@deenevents.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>+91 00000 00000</span>
              </div>
            </div>
            <p className="mt-6 text-xs text-emerald-400">
              Made with <Heart className="inline w-4 h-4 text-red-500" /> for the Ummah in Kerala
            </p>
          </div>
        </div>

        <div className="border-t border-emerald-900 mt-12 pt-8 text-center text-xs text-emerald-400">
          © {new Date().getFullYear()} DeenEvents Kerala. All rights reserved.
        </div>
      </div>
    </footer>
  );
}