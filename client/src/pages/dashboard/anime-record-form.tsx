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
} from "@chakra-ui/react";
import { useState } from "react";
import ReactStars from "react-stars";

export const AnimeRecordForm = () => {
  
  const [rating, setRating] = useState<number>(0);

  return (
    <div className="form-container">
      <form>
        <div
          className="form-field"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <label>Name: </label>
          <Input
            type="text"
            placeholder="Search for the anime name and click on the search button..."
            className="input"
            width={800}
            mt={2}
            required
          />
          <Button colorScheme="teal" mt={2}>
            Search
          </Button>
        </div>
        <div>
            <Image
              alt="Anime Poster"
              boxSize="300px"
              objectFit="cover"
              mt={2}
              ml={4}
              align={"center"}
            />
            <Text mt={2} ml={4} width={"1000px"}>
              Description
            </Text>
        </div>
        
        <div
          className="form-field"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <label>Genre: </label>
              <Text width={700}>
                Genre
              </Text>
        </div>

        <div
            className="form-field"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <label>Year: </label>
                <Text maxW={10}>Year</Text>
          </div>
          
          <div
            className="form-field"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label>Status: </label>
                <Text maxW={40}>Status</Text>
          </div>

        <div
          className="form-field"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <label>Total Episodes: </label>
              <Input
                width={200}
                readOnly />
        </div>
        <div
          className="form-field"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <label>Episodes Watched: </label>
          <NumberInput
            className="input"
            width={200}
            min={0}
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
          <label>Watch Status: </label>
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
