import "@/styles/globals.css";
import MortgageProvider from "@/context/MortgageContext";
import { Toaster } from "@/components/ui/sonner";

export default function App({ Component, pageProps }) {
  return (
    <MortgageProvider>
      <Component {...pageProps} />
      <Toaster />
    </MortgageProvider>
  );
}
