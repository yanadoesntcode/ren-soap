import "./globals.css";
import { Outfit } from "next/font/google";
import { CartProvider } from "@/src/context/CartContext";

const outfit = Outfit({
  subsets: ['latin'],
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