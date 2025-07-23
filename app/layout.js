
import "./globals.css";
import { Montserrat, Noto_Serif } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Side from "./components/Side";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
})

export const metadata = {
  title: "Ron Marquez | Programmer",
  description: "My Personal Portfolio ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${notoSerif.variable} antialiased text-black `}>
      <div className="bg-[#01070f] md:flex custom-scrollbar">
        <div className=" sm:block md:w-1/5 overflow-hidden">
          <Side/>       
        </div>
        <div className="md:w-4/5 md:h-screen md:overflow-y-scroll custom-scrollbar">
          {/* 
          <div className="flex items-center justify-center">
            test this side
          </div> */}
          <ToastContainer/>
           {children}
        </div>
      </div>
      </body>
    </html>
  );
}
