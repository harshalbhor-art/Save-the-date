import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"Harshal & Snehal | Wedding Invitation",description:"Together with our families, we invite you to celebrate our wedding. Explore our invitation in English, Hindi or Marathi and send your RSVP.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><head><link rel="stylesheet" href="/fonts/wedding-fonts.css" /><link rel="stylesheet" href="/fonts/kannada.css" /></head><body>{children}</body></html>}
