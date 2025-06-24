import { useUser } from "@clerk/clerk-react";
import { AnimeRecordForm } from "./anime-record-form";
import { AnimeRecordList } from "./anime-record-list";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

export const Dashboard = () => {
  const { user } = useUser();
  const labelColor = useColorModeValue("teal.600", "teal.200");

  return (
    <div className="dashboard-container">
      <Flex align="center" ml={5} mt={2}>
        <Text fontSize="lg" fontWeight="semibold" color={labelColor}>
          👋 Welcome, {user?.firstName}!
        </Text>
      </Flex>

      <AnimeRecordForm />
      <AnimeRecordList />
    </div>
  );
};
