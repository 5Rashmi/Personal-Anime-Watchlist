import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import logo from "../img/logo.png";
import {
  Button,
  Flex,
  useColorMode,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { AnimeRecordsProvider } from "./contexts/anime-record-context";
import "./App.css";
import ToastMsg from "./components/ToastMsg";
import Footer from "./pages/footer";
import Privacy from "./pages/footer/Privacy";
import About from "./pages/footer/About";
import Terms from "./pages/footer/Terms";
import License from "./pages/footer/License";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <ToastMsg />
      <header>
        <Flex
          justify={"space-between"}
          alignItems={"center"}
          px={4}
          bg={useColorModeValue("teal.600", "teal.800")}
          color={useColorModeValue("white", "gray.100")}
          boxShadow="sm"
          borderRadius="0 0 10px 10px"
        >
          <Image src={logo} alt="Logo" boxSize="120px" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2em",
            }}
          >
            <Auth />
            {/* <Button onClick={() => navigate('/auth')}>Sign In / Sign Up</Button> */}
            <Button onClick={toggleColorMode} variant={"outline"}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </div>
        </Flex>
      </header>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <AnimeRecordsProvider>
                <Dashboard />
              </AnimeRecordsProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/license" element={<License />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
