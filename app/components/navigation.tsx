
"use client";

import Link from "next/link";
import { useUserStore } from "../lib/stores/userStore";
import { useRouter } from "next/navigation";

const Navigation = () => {

  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const signOut = useUserStore((s) => s.signOut);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut().then(() => {
      router.push("/");
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 px-8 py-6 z-50 backdrop-blur-sm bg-black/15">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="font-display text-2xl font-semibold text-foreground tracking-wide">
          The Community Table
        </Link>
        
        <div className="flex items-center gap-8">
          <Link 
            href="/about" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide uppercase"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide uppercase"
          >
            Contact Us
          </Link>

          {user ? (
            <>
              <Link href="#" onClick={handleSignOut} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide uppercase">Sign out</Link>
            </>
            ) : (
                <></>
                )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;