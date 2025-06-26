import { Box, Text, Stack, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      py={6}
      mt={10}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify="space-between"
        align="center"
        maxW="6xl"
        mx="auto"
        px={4}
      >
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} ColdCoffee. All rights reserved.
        </Text>
        <Stack direction="row" spacing={6}>
          <Link to="/">Home</Link>
          <Link to="https://github.com/5Rashmi">GitHub</Link>
          <Link to="/about">About</Link>
          <Link to="/license">License</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
