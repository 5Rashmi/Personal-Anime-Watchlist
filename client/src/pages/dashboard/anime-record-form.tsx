import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Image,
  Textarea,
  Card,
  CardBody,
  FormLabel,
  useColorModeValue,
  Box,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import ReactStars from "react-stars";

export const AnimeRecordForm = () => {
  const [rating, setRating] = useState<number>(0);

  const labelColor = useColorModeValue("teal.600", "teal.200");
  const bgColor = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("lg", "dark-lg");

  return (
    <Card width="auto" justify={"center"} boxShadow={cardShadow} margin={7}>
      <CardBody bg={bgColor} padding={8} borderRadius="lg">
        <form>
          <VStack spacing={4} align="stretch">
            <HStack>
              <FormLabel fontWeight="bold" color={labelColor}>
                Name
              </FormLabel>
              <Input
                type="text"
                placeholder="Search for the anime name and click on the search button..."
                width="60%"
                required
              />
              <Button colorScheme="teal">
                <Search2Icon />
              </Button>
            </HStack>

            <HStack spacing={4} align="center">
              <Image alt="Anime Poster" boxSize="300px" objectFit="cover" />
              <Text fontWeight="bold" color={labelColor}>
                Description
              </Text>
            </HStack>

            <Box>
              <FormLabel fontWeight="bold" color={labelColor}>
                Genre
              </FormLabel>
              <Text>Genre</Text>
            </Box>

            <HStack spacing={8} justify="center">
              <Box>
                <HStack spacing={2} alignItems="center">
                  <FormLabel
                    fontWeight="bold"
                    color={labelColor}
                    marginBottom={0}
                  >
                    Year:
                  </FormLabel>
                  <Text>Year</Text>
                </HStack>
              </Box>
              <Box>
                <HStack spacing={2} alignItems="center">
                  <FormLabel
                    fontWeight="bold"
                    color={labelColor}
                    marginBottom={0}
                  >
                    Status:
                  </FormLabel>
                  <Text>Status</Text>
                </HStack>
              </Box>
              <Box>
                <HStack spacing={2} alignItems="center">
                  <FormLabel
                    fontWeight="bold"
                    color={labelColor}
                    marginBottom={0}
                  >
                    Total Episodes:
                  </FormLabel>
                  <Text>0</Text>
                </HStack>
              </Box>
            </HStack>

            <HStack>
            <Box>
              <FormLabel fontWeight="bold" color={labelColor}>
                Episodes Watched
              </FormLabel>
              <NumberInput width="50%" min={0} isRequired>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>

            <Box pl={10}>
              <FormLabel fontWeight="bold" color={labelColor}>
                Watch Status
              </FormLabel>
              <Select required width="120%">
                <option value="">Select a Status</option>
                <option value="Watching">Watching</option>
                <option value="On-Hold">On-Hold</option>
                <option value="Plan to Watch">Plan to Watch</option>
                <option value="Dropped">Dropped</option>
                <option value="Completed">Completed</option>
              </Select>
            </Box>

            <Box pl={40}>
              <FormLabel fontWeight="bold" color={labelColor}>
                Date of Completion
              </FormLabel>
              <Input type="date" width="110%" />
            </Box>
            </HStack>

            <Box>
              <FormLabel fontWeight="bold" color={labelColor}>
                Rating
              </FormLabel>
              <HStack>
              <ReactStars
                count={5}
                value={rating}
                onChange={(newRating: number) => setRating(newRating)}
                size={30}
                color2={"#D91656"}
              />
              <span style={{ marginLeft: "10px", fontSize: "24px" }}>
                {rating}
              </span>
              </HStack>
            </Box>

            <Box>
              <FormLabel fontWeight="bold" color={labelColor}>
                Notes/Review
              </FormLabel>
              <Textarea width="100%" />
            </Box>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
};
