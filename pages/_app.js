import "@/styles/globals.css";
import MortgageProvider from "@/context/MortgageContext";

export default function App({ Component, pageProps }) {
  return (
    <MortgageProvider>
      <Component {...pageProps} />
    </MortgageProvider>
  );
}
