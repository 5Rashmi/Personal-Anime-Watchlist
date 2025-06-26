import { useColorMode } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMsg = () => {
  const { colorMode } = useColorMode();
  return (
    <ToastContainer
      theme={colorMode === "light" ? "light" : "dark"}
      aria-label={undefined}
      autoClose={5000}
      closeOnClick={true}
    />
  );
};

export default ToastMsg;
