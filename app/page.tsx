import LoginForm from "./components/loginForm";
import Navigation from "./components/navigation";
import Image from "next/image";


export default async function Home() { 
 
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-8 py-12 bg-white dark:bg-black">
        <Navigation />

        <div className="min-h-screen flex items-center justify-between">
          <div className="w-1/2 relative h-[600px] overflow-hidden rounded-xl">
           <Image
               src="/chef_front_page.jpg"
               alt="Decoration"
               fill
               className="object-cover object-center"
             />
          </div>
          <div className="w-100"><LoginForm/></div>
        </div>
      </main>
    </div>
  );
}



