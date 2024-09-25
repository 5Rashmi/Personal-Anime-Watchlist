import {
  Button,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  Text,
  Image,
  Textarea,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ReactStars from "react-stars";
import {
  searchAnime,
  fetchAnimeRecommendations,
  fetchGenre,
  fetchAnimeDescription,
  fetchTotalEpisodes,
} from "../../utils/searchAnime";

export const AnimeRecordForm: React.FC = () => {
  const [genres, setGenre] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [episodeWatched, setEpisodeWatched] = useState<number>(0);
  const [totalEpisodes, setTotalEpisodes] = useState<number>(0);
  const [animeName, setAnimeName] = useState<string>("");
  const [posterUrl, setPosterUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

  const handleSearchAnime = async () => {
    setLoading(true);
    setError("");
    setRecommendations([]);
    try {
      const poster = await searchAnime(animeName);
      const desc = await fetchAnimeDescription(animeName);
      const epi = await fetchTotalEpisodes(animeName);
      const uniqueGenre = await fetchGenre(animeName);
      
      setPosterUrl(poster);
      setDescription(desc);
      setTotalEpisodes(epi);
      setGenre(uniqueGenre);

    } catch (err: any) {
      console.log('Error encountered', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log('Fetch completed');
    }
  };

  const handleAnimeNameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setAnimeName(value);

    if (value) {
      try {
        const suggestions = await fetchAnimeRecommendations(value);
        setRecommendations(suggestions);
      } catch (err) {
        console.error(err);
      }
    } else {
      setRecommendations([]);
    }
  };

  const handleRecommendationSelect = (recommendation: string) => {
    setAnimeName(recommendation);
    setRecommendations([]);
  };

  return (
    <div className="form-container">
      {" "}
      <form>
        <div
          className="form-field"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <label>Name: </label>
          <Input
            type="text"
            placeholder="Search for the anime name and click on the search button..."
            value={animeName}
            onChange={handleAnimeNameChange}
            className="input"
            width={800}
            mt={2}
            required
          />
          <Button onClick={handleSearchAnime} colorScheme="teal" mt={2}>
            Search
          </Button>
          {loading && <Spinner />}
          {error && <Text color="red.500">{error}</Text>}
        </div>
        {recommendations.length > 0 && (
          <List spacing={2} mt={2} ml={20} onClick={handleSearchAnime}>
            {recommendations.map((recommendation, index) => (
              <ListItem
                key={index}
                onClick={() => handleRecommendationSelect(recommendation)}
                cursor={"pointer"}
                _hover={{ color: "teal.500" }}
              >
                {recommendation}
              </ListItem>
            ))}
          </List>
        )}
        {posterUrl && (
          <div
            className="form-field"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Image
              src={posterUrl}
              alt="Anime Poster"
              boxSize="300px"
              objectFit="cover"
              mt={2}
              ml={4}
              align={"center"}
            />
            <Text mt={2} ml={4} width={"1100px"}>
              {description}
            </Text>
          </div>
        )}
        <div
          className="form-field"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <label>Genre: </label>
          {posterUrl && (
            <div className="form-field">
              <Text
                mt={2}
                ml={4}
                width={300}
              >
                
                {genres.join(', ')}
              </Text>
            </div>
          )}
        </div>

        <div
          className="form-field"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <label>Total Episodes: </label>
          {posterUrl && (
            <div className="form-field">
              <Input
                value={totalEpisodes}
                isReadOnly
                mt={2}
                ml={4}
                width={200}
              />
            </div>
          )}
        </div>
        <div
          className="form-field"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <label>Episodes Watched: </label>
          <NumberInput
            className="input"
            width={200}
            value={episodeWatched}
            onChange={(valueString, valueNumber) =>
              setEpisodeWatched(valueNumber)
            }
            min={0}
            max={totalEpisodes}
            isRequired={true}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <div
          className="form-field"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <label>Status: </label>
          <Select required className="input" width={300}>
            <option value={""}>Select a Status</option>
            <option value={"Watching"}>Watching</option>
            <option value={"On-Hold"}>On-Hold</option>
            <option value={"Plan to Watch"}>Plan to Watch</option>
            <option value={"Dropped"}>Dropped</option>
            <option value={"Completed"}>Completed</option>
          </Select>
        </div>
        <div className="form-field">
          <label>Date of Completion: </label>
          <Input
            placeholder="If completed then select the date"
            className="input"
            type="date"
            width={300}
          />
        </div>
        <div
          className="form-field"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <label>Rating: </label>
          <ReactStars
            count={5}
            value={rating}
            onChange={(newRating: number) => setRating(newRating)}
            size={30}
            color2={"#ffd700"}
          />
          <span style={{ marginLeft: "10px", fontSize: "24px" }}>{rating}</span>
        </div>
        <div className="form-field">
          <label>Notes/Review: </label>
          <Textarea className="input" width={300} />
        </div>
      </form>
    </div>
  );
};
