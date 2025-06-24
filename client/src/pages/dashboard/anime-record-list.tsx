// import { useAnimeRecords } from "../../contexts/anime-record-context"

import axios from "axios";
import { useEffect, useState } from "react";
import { AnimeRecord } from "../../../../server/src/interface/animeRecordType";
import { useUser } from "@clerk/clerk-react";
import {
  Badge,
  Box,
  Center,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export const AnimeRecordList = () => {
  const [records, setRecords] = useState<AnimeRecord[]>([]);
  const { user } = useUser();
  const labelColor = useColorModeValue("teal.600", "teal.200");
  const userId = user?.id;
  const url = "https://personal-anime-watchlist-backend.onrender.com";

  useEffect(() => {
    if (userId) {
      fetchRecords();
    }
  }, [userId]);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(
        `${url}/anime-records/getAllByUserID/${userId}`
      );
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      await axios.delete(`${url}/anime-records/${id}`);
      setRecords((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  return (
    <Box p={6} minH="100vh" bg="gray.900">
      <Heading
        mb={6}
        textAlign="center"
        fontSize={["xl", "2xl"]}
        fontWeight="semibold"
        color={labelColor}
        letterSpacing="wide"
      >
        🌸 Your Watchlist
      </Heading>

      {records.length === 0 ? (
        <Center>
          <Text color="gray.400">No records found.</Text>
        </Center>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {records.map((record) => (
            <Box
              key={record._id}
              position="relative"
              maxW="xs"
              borderRadius="xl"
              overflow="hidden"
              bg="gray.800"
              boxShadow="dark-lg"
              zIndex={0}
              transition="all 0.3s"
              _hover={{
                boxShadow: "2xl",
                transform: "translateY(-6px)",
                zIndex: 1,
              }}
              display="flex"
              flexDirection="column"
            >
              <Image
                src={record.posterUrl || "/placeholder.jpg"}
                alt={record.name}
                objectFit="cover"
                height="240px"
                width="100%"
                borderTopRadius="xl"
              />

              <Box p={4} display="flex" flexDirection="column" gap={3}>
                <Heading size="md" noOfLines={1} color={labelColor}>
                  {record.name}
                </Heading>

                {record.description && (
                  <Box
                    fontSize="sm"
                    color="gray.300"
                    borderRadius="md"
                    p={2}
                    maxH="80px"
                    overflowY="auto"
                    bg="rgba(255,255,255,0.05)"
                    className="scrollbar-custom"
                  >
                    {record.description}
                  </Box>
                )}

                <VStack
                  align="start"
                  spacing={1}
                  fontSize="sm"
                  color="gray.300"
                  mt={1}
                >
                  <Text>
                    <b>Episodes:</b> {record.episodesWatched}/
                    {record.totalEpisodes ?? "-"}
                  </Text>
                  <Text>
                    <b>Status:</b> {record.watchStatus}
                  </Text>
                  <Text>
                    <b>Rating:</b> {record.rating}/10
                  </Text>
                  <Text>
                    <b>Year:</b> {record.year ?? "-"}
                  </Text>
                </VStack>

                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={2}
                  py={2}
                  mt={1}
                  overflowX="auto"
                >
                  {record.genre?.map((g, i) => (
                    <Badge
                      key={i}
                      px={2}
                      py={0.5}
                      borderRadius="full"
                      fontSize="xs"
                      colorScheme="purple"
                      variant="outline"
                      borderColor="gray.500"
                      color="gray.200"
                    >
                      {g}
                    </Badge>
                  ))}
                </Box>

                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Delete record"
                  onClick={() => deleteRecord(record._id)}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  position="absolute"
                  top={2}
                  right={2}
                  borderRadius="full"
                  zIndex={10}
                  _hover={{
                    bg: "red.600",
                    color: "white",
                    transform: "scale(1.1)",
                  }}
                />
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};
