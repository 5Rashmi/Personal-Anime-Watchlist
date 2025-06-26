import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const License = () => {
  const headingColor = useColorModeValue("teal.700", "teal.200");

  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading size="lg" color={headingColor}>
          MIT License
        </Heading>
        <Text>Copyright © {new Date().getFullYear()} ColdCoffee</Text>

        <Text>
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          “Software”), to deal in the Software without restriction, including
          without limitation the rights to use, copy, modify, merge, publish,
          distribute, sublicense, and/or sell copies of the Software, and to
          permit persons to whom the Software is furnished to do so, subject to
          the following conditions:
        </Text>

        <Text>
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        </Text>

        <Text>
          THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
          IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
          CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </Text>
      </VStack>
    </Box>
  );
};

export default License;
