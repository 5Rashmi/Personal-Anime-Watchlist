import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const Privacy = () => {
  const headingColor = useColorModeValue("teal.700", "teal.200");

  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading size="lg" color={headingColor}>
          Privacy Policy
        </Heading>
        <Text fontSize="md">
          Your privacy is important to us. This page outlines how we collect,
          use, and protect your information while using the Anime Watchlist app.
        </Text>
        <Heading size="md" mt={4} color={headingColor}>
          What We Collect
        </Heading>
        <Text>
          We store your account ID, anime entries, and preferences to
          personalize your experience. We do not collect or store sensitive
          personal information.
        </Text>
        <Heading size="md" mt={4} color={headingColor}>
          How We Use It
        </Heading>
        <Text>
          Your data is used to display your watchlist, enable customizations,
          and help you track your anime journey across devices.
        </Text>
        <Heading size="md" mt={4} color={headingColor}>
          Security
        </Heading>
        <Text>
          All data is transferred securely using HTTPS. We rely on trusted
          authentication services and take precautions to guard your entries.
        </Text>
        <Heading size="md" mt={4} color={headingColor}>
          Your Control
        </Heading>
        <Text>
          You can edit or delete your data at any time through the app. If you
          have questions or concerns, feel free to reach out.
        </Text>
        <Text fontSize="sm" color="gray.500" mt={6}>
          Last updated: {new Date().toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  );
};

export default Privacy;
