// src/pages/About.tsx

import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const About = () => {
  const headingColor = useColorModeValue("teal.700", "teal.200");

  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading size="lg" color={headingColor}>
          About This App
        </Heading>
        <Text fontSize="md">
          This project was built with 💖 by ColdCoffee to help anime lovers
          organize, track, and personalize their anime-watching journey.
        </Text>

        <Text>
          Whether you're watching your first anime or managing a massive
          watchlist, this app lets you create detailed records, update progress,
          add personal notes, and explore your anime history visually—all in one
          elegant dashboard.
        </Text>

        <Heading size="md" mt={4} color={headingColor}>
          Features
        </Heading>
        <Text>
          • Add and edit anime records with cover art, notes, and ratings •
          Track episodes watched and overall status • View entries beautifully
          categorized and styled • Secure login with personalized storage •
          Fully responsive and inspired by anime aesthetics ✨
        </Text>

        <Heading size="md" mt={4} color={headingColor}>
          Why I Built It
        </Heading>
        <Text>
          This app began as a portfolio project driven by creativity, curiosity,
          and the joy of blending code with imagination. It reflects a passion
          for clean UI design, storytelling, and building something that anime
          fans can enjoy.
        </Text>

        <Text fontSize="sm" color="gray.500" mt={6}>
          Version 1.0 • Last updated: {new Date().toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  );
};

export default About;
