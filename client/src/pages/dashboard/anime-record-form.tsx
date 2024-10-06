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
  CardFooter,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";
import { useAnimeRecords } from "../../contexts/anime-record-context";

export const AnimeRecordForm = () => {
  const labelColor = useColorModeValue("teal.600", "teal.200");
  const bgColor = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("lg", "dark-lg");
  const listBgColor = useColorModeValue("gray.100", "gray.700");
  const listItemHoverColor = useColorModeValue("teal.100", "teal.600");

  const [name, setName] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<any>(null);

  const [poster, setPoster] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [genre, setGenre] = useState<string[]>([]);
  const [year, setYear] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("");
  const [totalEpisodes, setTotalEpisodes] = useState<number>(0);
  const [episodesWatched, setEpisodesWatched] = useState<number>(0);
  const [watchStatus, setWatchStatus] = useState<string>("");
  const [completionDate, setCompletionDate] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const { addRecord } = useAnimeRecords();

  const { user } = useUser();

  const handleSearchAnime = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Error fetching data from Jikan API ", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!selectedAnime || inputFocused) {
        handleSearchAnime(name);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [name, selectedAnime, inputFocused]);

  const handleSelectedAnime = (anime: any) => {
    setSelectedAnime(anime);
    setName(anime.title);
    setPoster(anime.images.jpg.large_image_url);
    setDescription(anime.synopsis);
    setGenre(anime.genres.map((g: any) => g.name));
    setYear(anime.year);
    setStatus(anime.status);
    setTotalEpisodes(anime.episodes);
    setEpisodesWatched(0);
    setWatchStatus('');
    setSearchResults([]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRecord = {
      userId: user?.id ?? "",
      name: name,
      description: description,
      genre: genre,
      year: year,
      status: status,
      totalEpisodes: totalEpisodes,
      episodesWatched: episodesWatched,
      watchStatus: watchStatus,
      rating: rating,
      notes: notes
    };

    addRecord(newRecord);
    setName("");
    setPoster("");
    setDescription("");
    setGenre([]);
    setYear(0);
    setStatus("");
    setTotalEpisodes(0);
    setEpisodesWatched(0);
    setWatchStatus('');
    setCompletionDate('');
    setRating(0);
    setNotes('');
  };

  return (
    <Card className="form-container" width="auto" justify={"center"} boxShadow={cardShadow} margin={7}>
      <form onSubmit={handleSubmit}>
      <CardBody bg={bgColor} padding={8} borderRadius="lg">
          <VStack spacing={4} align="stretch">
            <HStack>
            <FormLabel fontWeight="bold" color={labelColor} mb={0}>
                Name
              </FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Search for anime by name and select from the list below..."
                width="60%"
                required
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
              />
            </HStack>

            {searchResults.length > 0 && (
              <Box bg={listBgColor} borderRadius="md" padding={4} maxHeight="200px" overflowY="auto">
                <List>
                  {searchResults.map((anime) => (
                    <ListItem
                      key={anime.mal_id}
                      cursor="pointer"
                      padding={2}
                      _hover={{ bg: listItemHoverColor }}
                      onClick={() => handleSelectedAnime(anime)}
                    >
                      {anime.title}
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {selectedAnime && (
              <>
                <HStack spacing={4} align="center">
                  <Image src={poster} alt={selectedAnime.title} boxSize="300px" objectFit="cover" />
                  <Box>
                    <Text fontWeight="bold" color={labelColor}>
                      {selectedAnime.title}
                    </Text>
                    <Text>{description}</Text>
                  </Box>
                </HStack>

                <Box>
                  <FormLabel fontWeight="bold" color={labelColor}>
                    Genre
                  </FormLabel>
                  <Text>{genre.join(", ")}</Text>
                </Box>

                <HStack spacing={8} justify="center">
                  <Box>
                    <FormLabel fontWeight="bold" color={labelColor}>
                      Year:
                    </FormLabel>
                    <Text>{year !== null ? year : "NaN"}</Text>
                  </Box>
                  <Box>
                    <FormLabel fontWeight="bold" color={labelColor}>
                      Status:
                    </FormLabel>
                    <Text>{status}</Text>
                  </Box>
                  <Box>
                    <FormLabel fontWeight="bold" color={labelColor}>
                      Total Episodes:
                    </FormLabel>
                    <Text>{totalEpisodes}</Text>
                  </Box>
                </HStack>

          <HStack>
            <Box>
              <FormLabel fontWeight="bold" color={labelColor}>
                Episodes Watched
              </FormLabel>
              <NumberInput width="50%" min={0}
              onChange={(valueString) => setEpisodesWatched(parseInt(valueString))}
              value={episodesWatched} isRequired>
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
              <Select required width="120%" value={watchStatus}
              onChange={(e) => setWatchStatus(e.target.value)}>
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
              <Input type="date" width="110%" value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)} />
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
                    <span style={{ marginLeft: "10px", fontSize: "24px" }}>{rating}</span>
                  </HStack>
                </Box>

                <Box>
                  <FormLabel fontWeight="bold" color={labelColor}>
                    Notes/Review
                  </FormLabel>
                  <Textarea width="100%" value={notes} onChange={((e) => setNotes(e.target.value))}/>
                </Box>
              </>
            )}
          </VStack>
          </CardBody>
      <CardFooter display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Button type="submit" className="button" colorScheme="teal">
          Create Watchlist
        </Button>
      </CardFooter>
        </form>
    </Card>
  );
};
