import {
  Box,
  Button,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { EditModalProps } from "../types/editModalType";
import ReactStars from "react-stars";

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  editForm,
  setEditForm,
  handleUpdate,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader>Edit Record</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" gap={4}>
          <Textarea
            placeholder="Notes"
            value={editForm.notes}
            onChange={(e) =>
              setEditForm({ ...editForm, notes: e.target.value })
            }
          />
          <HStack>
            <Input
              type="number"
              placeholder="Episodes Watched"
              value={editForm.episodesWatched ?? ""}
              min={0}
              max={editForm.totalEpisodes ?? undefined}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                const max = editForm.totalEpisodes;

                if (!e.target.value) {
                  setEditForm({ ...editForm, episodesWatched: null });
                } else if (isNaN(val)) {
                  return;
                } else if (typeof max === "number" && val > max) {
                  setEditForm({ ...editForm, episodesWatched: max });
                } else {
                  setEditForm({ ...editForm, episodesWatched: val });
                }
              }}
            />
            <text style={{ paddingRight: "12em" }}>
              /{editForm.totalEpisodes}
            </text>
          </HStack>
          <Select
            placeholder="Select Watch Status"
            value={editForm.watchStatus}
            onChange={(e) =>
              setEditForm({ ...editForm, watchStatus: e.target.value })
            }
          >
            <option
              style={{
                backgroundColor: useColorModeValue("white", "#2D3748"),
                color: useColorModeValue("black", "white"),
              }}
              value="Watching"
            >
              Watching
            </option>
            <option
              style={{
                backgroundColor: useColorModeValue("white", "#2D3748"),
                color: useColorModeValue("black", "white"),
              }}
              value="On Hold"
            >
              On Hold
            </option>
            <option
              style={{
                backgroundColor: useColorModeValue("white", "#2D3748"),
                color: useColorModeValue("black", "white"),
              }}
              value="Plan to Watch"
            >
              Plan to Watch
            </option>
            <option
              style={{
                backgroundColor: useColorModeValue("white", "#2D3748"),
                color: useColorModeValue("black", "white"),
              }}
              value="Dropped"
            >
              Dropped
            </option>
            <option
              style={{
                backgroundColor: useColorModeValue("white", "#2D3748"),
                color: useColorModeValue("black", "white"),
              }}
              value="Completed"
            >
              Completed
            </option>
          </Select>
          <Box>
            <FormLabel fontWeight="bold">Rating</FormLabel>
            <HStack>
              <ReactStars
                count={5}
                value={editForm.rating || 0}
                onChange={(newRating: number) =>
                  setEditForm({ ...editForm, rating: newRating })
                }
                size={30}
                half={true}
                color2={"#D91656"}
              />
              <span style={{ marginLeft: "10px", fontSize: "24px" }}>
                {editForm.rating || 0}
              </span>
            </HStack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
