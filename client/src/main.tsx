import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { HashRouter as Router } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});
export default theme;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </ClerkProvider>
    </Router>
  </StrictMode>
);
