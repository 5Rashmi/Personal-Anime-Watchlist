import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const Terms = () => {
  const headingColor = useColorModeValue("teal.700", "teal.200");

  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading size="lg" color={headingColor}>
          Terms & Conditions
        </Heading>
        <Text fontSize="md">
          By using this site, you agree to the following terms. This agreement
          is between you and the Anime Watchlist app, built for personal and
          creative use.
        </Text>

        <Heading size="md" mt={4} color={headingColor}>
          Usage
        </Heading>
        <Text>
          This app is intended for non-commercial, personal use to help users
          manage and track their anime watchlists. Do not misuse the platform or
          attempt to interfere with its functionality.
        </Text>

        <Heading size="md" mt={4} color={headingColor}>
          User Content
        </Heading>
        <Text>
          Any content you submit (like anime entries, notes, or ratings) remains
          yours, but may be stored securely to enhance your experience.
        </Text>

        <Heading size="md" mt={4} color={headingColor}>
          Limitation of Liability
        </Heading>
        <Text>
          We are not liable for any losses or damages resulting from the use of
          this app. While we strive for a great experience, the app is provided
          “as is.”
        </Text>

        <Heading size="md" mt={4} color={headingColor}>
          Modifications
        </Heading>
        <Text>
          These terms may be updated from time to time. Continued use of the app
          means you agree to the latest version.
        </Text>

        <Text fontSize="sm" color="gray.500" mt={6}>
          Last updated: {new Date().toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  );
};

export default Terms;
