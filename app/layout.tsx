import type { Metadata } from 'next'
import './globals.css'

import { siteConfig } from '@/config/site';
import { ClerkProvider } from '@clerk/nextjs'
import getFavorites from "@/actions/getFavorites"
import { blurImage } from "@/lib/imageBuffer";

import Provider from '@/providers/provider';
import Navbar from "@/components/navbar/navbar";
import Sidebar from '@/components/sidebar/sidebar';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png"
    }
  ]
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const favorites = await getFavorites();
  // const bluryImage = await blurImage();
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* <Provider 
            favorites={favorites} 
            bluryImage={bluryImage} 
          /> */}
          <div className="relative grid grid-cols-4 bg-white h-full max-w-[2000px] mx-auto gap-6">
            <main className="2xl:col-span-3 col-span-4">
              {/* <Navbar /> */}
              {children}
            </main>
            <aside 
                className="hidden 2xl:block fixed left-0 top-0 h-full w-[430px] 
                pt-3 shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px]"
              >
              {/* <Sidebar favorites={favorites} />  */}
            </aside>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
