import { useEffect, useState } from "react";
import { GlobleProvider } from "@/components/common/modalContext";
import "@/styles/scss/globals.scss";
import "tailwindcss/tailwind.css"; 
import type { AppProps } from "next/app";
interface componentType {
  transition: string;
  visibility: "visible" | "hidden";
  opacity: number;
}
const App = ({ Component, pageProps }: AppProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []); 
  
  const componentStyle: componentType = {
    transition: "visibility 0s linear 0.25s, opacity 0.25s linear",
    visibility: mounted ? "visible" : "hidden",
    opacity: mounted ? 1 : 0,
  };

  return (
    <GlobleProvider>
      <div style={componentStyle}>
        <Component {...pageProps} />
      </div>
    </GlobleProvider>
  );
};
export default App;
