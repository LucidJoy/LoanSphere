import "@/styles/globals.css";
import MortgageProvider from "@/context/MortgageContext";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <MortgageProvider>
      <Component {...pageProps} />
    </MortgageProvider>
  );
}
