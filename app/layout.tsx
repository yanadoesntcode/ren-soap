import "./globals.css";
import localFont from "next/font/local";
import { CartProvider } from "@/src/context/CartContext";

const outfit = localFont({
  src: '../font/Outfit-VariableFont_wght.ttf',
  variable: '--font-outfit',
  display: 'swap',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}