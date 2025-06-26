import { useUser } from "@clerk/clerk-react";
import { AnimeRecordForm } from "./anime-record-form";
import { AnimeRecordList } from "./anime-record-list";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { AnimeRecord } from "../../../../server/src/interface/animeRecordType";

export const Dashboard = () => {
  const { user } = useUser();
  const labelColor = useColorModeValue("teal.600", "teal.200");
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState<AnimeRecord[]>([]);
  const url = "https://personal-anime-watchlist-backend.onrender.com";

  const fetchRecords = async () => {
    if (!user?.id) return;
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${url}/anime-records/getAllByUserID/${user.id}`
      );
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchRecords();
    }
  }, [user?.id]);

  return (
    <div className="dashboard-container">
      <Flex align="center" ml={5} mt={2}>
        <Text fontSize="lg" fontWeight="semibold" color={labelColor}>
          👋 Welcome, {user?.firstName}!
        </Text>
      </Flex>

      <AnimeRecordForm refreshRecords={fetchRecords} />

      <AnimeRecordList
        records={records}
        refreshRecords={fetchRecords}
        isLoading={isLoading}
      />
    </div>
  );
};
