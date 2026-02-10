import Navigation from "../components/navigation";
import Image from "next/image";
import { AboutTimeline } from "../components/timeline";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-7xl px-8 py-12 bg-white dark:bg-black">
        <Navigation />

        {/* Banner */}
        <div className="relative mt-8 h-[320px] w-full overflow-hidden rounded-2xl">
          <Image
            src="/chef_banner.jpg"
            alt="Culinary experience banner"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center px-10">
            <h1 className="max-w-2xl text-4xl font-semibold text-white">
              Building a bridge between culinary creators and their community
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

           <div className="md:col-span-1 space-y-6">
            <AboutTimeline />
          </div>

          <div className="md:col-span-2 space-y-6 text-white/80">
             {/* Content */}
            <section className="mx-auto mt-16 max-w-3xl space-y-10 text-zinc-700 dark:text-zinc-300">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                  About Us
                </h2>
                <p>
                  We’re building a platform for chefs, bartenders, brew specialists,
                  and culinary experimenters who want a more direct, meaningful
                  connection with the people who enjoy their work.
                </p>
                <p>
                  Food and drink have always been about stories, craft, and shared
                  moments - yet most platforms reduce creators to listings and
                  customers to transactions. We want to change that.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  Phase 1: Building the pilot
                </h3>
                <p>
                  This is the first phase of the journey. Right now, we’re reaching
                  out to a small group of passionate culinary creators to form our
                  pilot community.
                </p>
                <p>
                  During this phase, we’re working closely with chefs and hosts to
                  understand how they want to present themselves, how they connect
                  with their audience, and what tools genuinely help them run
                  experiences smoothly.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  What’s coming next
                </h3>
                <p>
                  Once our initial team is in place, we’ll begin custom - curating
                  profile and about pages for each creator, allowing them to
                  showcase their work, philosophy, and upcoming experiences in a
                  way that feels personal and authentic.
                </p>
                <p>
                  As the platform grows, we’ll introduce features shaped directly by
                  feedback from our pilot community - including payments, insights,
                  and thoughtful rating systems designed to support creators rather
                  than pressure them. 
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  Why we’re doing this
                </h3>
                <p>
                  This platform is being built with creators, not just for them. If
                  you care deeply about craft, hospitality, and experimentation -
                  and want to build lasting relationships with your audience - we’d
                  love to have you help shape what this becomes.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  Looking ahead
                </h3>
                <p>
                  The long-term vision is simple: to build a living collection of dishes people genuinely love, 
                  and an enduring connection between the chef and the community that comes back for them.
                </p>
                <p>
                  We imagine this platform growing into something that feels less like a marketplace and more like a gala - cafés, pop-ups, and restaurants with seasonal menus shaped by our chefs’ experiments, refined through real experiences, and validated by the people who show up, taste, and return.
                  Every dish offered is one that has been tried, tested, rated, and loved
                </p>
                <p>That’s where we’re heading.</p>
                <p>What you’re seeing today is not the final form - it’s Day One. The foundation. The beginning of a process where chefs and guests build something together, one experience at a time.</p>

              </div>
            </section>
          
          </div>
          
        </div>

       
      </main>
    </div>
  );
}
