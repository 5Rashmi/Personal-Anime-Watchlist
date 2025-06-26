import { Box, Text, Link, Stack, useColorModeValue } from "@chakra-ui/react";

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
          <Link href="/">Home</Link>
          <Link href="https://github.com/5Rashmi" isExternal>
            GitHub
          </Link>
          <Link href="/about">About</Link>
          <Link href="/license">License</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
