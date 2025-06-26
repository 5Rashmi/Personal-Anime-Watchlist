import axios from "axios";
import { useState } from "react";
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
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EditModal from "../../components/EditModal";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

type AnimeRecordListProps = {
  records: AnimeRecord[];
  refreshRecords: () => void;
  isLoading: boolean;
};

export const AnimeRecordList = ({
  records,
  refreshRecords,
  isLoading,
}: AnimeRecordListProps) => {
  const { user } = useUser();
  const userId = user?.id;

  const labelColor = useColorModeValue("teal.600", "teal.200");
  const noAuthTextColor = useColorModeValue("gray.700", "gray.400");
  const { colorMode } = useColorMode();
  const url = "https://personal-anime-watchlist-backend.onrender.com";
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedRecord, setSelectedRecord] = useState<AnimeRecord | null>(
    null
  );
  const [editForm, setEditForm] = useState({
    notes: "",
    episodesWatched: null as number | null,
    watchStatus: "",
    rating: null as number | null,
    totalEpisodes: null as number | null,
  });

  const handleEdit = (record: AnimeRecord) => {
    setSelectedRecord(record);
    setEditForm({
      notes: record.notes || "",
      episodesWatched: record.episodesWatched ?? null,
      watchStatus: record.watchStatus || "",
      rating: record.rating ?? null,
      totalEpisodes: record.totalEpisodes ?? null,
    });

    onOpen();
  };

  const handleUpdate = async () => {
    if (!selectedRecord) return;
    try {
      const updated = { ...selectedRecord, ...editForm };
      await axios.put(`${url}/anime-records/${selectedRecord._id}`, updated);
      refreshRecords();
      onClose();
      toast.success("Watchlist updated successfully");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update watchlist, please try again");
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      await axios.delete(`${url}/anime-records/${id}`);
      refreshRecords();
      toast.success("Watchlist deleted successfully.");
    } catch (err) {
      console.error("Error deleting record:", err);
      toast.error("Failed to delete Watchlist.");
    }
  };

  return (
    <Box p={6} minH="100vh" bg={colorMode}>
      {!userId ? (
        <Center>
          <Text color={noAuthTextColor}>
            Please sign in to view your watchlist.
          </Text>
        </Center>
      ) : (
        <>
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

          {records.length === 0 && !isLoading ? (
            <Center>
              <Text color={useColorModeValue("gray.700", "gray.400")}>
                No records found.
              </Text>
            </Center>
          ) : isLoading ? (
            <Center>
              <Loading />
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
                  bg={colorMode}
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
                        color={useColorModeValue("gray.700", "gray.300")}
                        borderRadius="md"
                        p={2}
                        maxH="100px"
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
                      color={useColorModeValue("gray.700", "gray.300")}
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
                        <b>Rating:</b> {record.rating}/5
                      </Text>
                      <Text>
                        <b>Year:</b> {record.year ?? "-"}
                      </Text>
                      <Text
                        maxH="40px"
                        overflowY="auto"
                        bg="rgba(255,255,255,0.05)"
                        className="scrollbar-custom"
                      >
                        <b>Notes:</b> {record.notes ?? "-"}
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
                          color={useColorModeValue("gray.600", "gray.200")}
                        >
                          {g}
                        </Badge>
                      ))}
                    </Box>

                    <IconButton
                      icon={<EditIcon />}
                      aria-label="Edit record"
                      onClick={() => handleEdit(record)}
                      size="sm"
                      bg="#1E3A8A"
                      color="white"
                      variant="solid"
                      position="absolute"
                      top={2}
                      right={12}
                      borderRadius="full"
                      zIndex={10}
                      _hover={{
                        bg: "#1D4ED8",
                        transform: "scale(1.1)",
                      }}
                    />

                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Delete record"
                      onClick={() => deleteRecord(record._id)}
                      size="sm"
                      bg="#7F1D1D"
                      color="white"
                      variant="solid"
                      position="absolute"
                      top={2}
                      right={2}
                      borderRadius="full"
                      zIndex={10}
                      _hover={{
                        bg: "#DC2626",
                        transform: "scale(1.1)",
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          )}

          <EditModal
            isOpen={isOpen}
            onClose={onClose}
            editForm={editForm}
            setEditForm={setEditForm}
            handleUpdate={handleUpdate}
          />
        </>
      )}
    </Box>
  );
};
