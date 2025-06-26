import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import logo from "../img/logo.png";
import { Button, Flex, useColorMode, Image } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { AnimeRecordsProvider } from "./contexts/anime-record-context";
import "./App.css";
import ToastMsg from "./components/ToastMsg";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <ToastMsg />
      <header>
        <Flex justify={"space-between"} alignItems={"center"} px={4}>
          <Image src={logo} alt="Logo" boxSize="120px" />
          <div style={{ display: "flex", alignItems: "center", gap: "2em" }}>
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
        </Routes>
      </div>
    </>
  );
}

export default App;
