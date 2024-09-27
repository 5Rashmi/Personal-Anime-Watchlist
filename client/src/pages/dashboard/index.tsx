import { useUser } from "@clerk/clerk-react";
import { AnimeRecordForm } from "./anime-record-form";
import { AnimeRecordList } from "./anime-record-list";
import {Text} from "@chakra-ui/react";

export const Dashboard = () => {
    const { user } = useUser();

    return <div className="dashboard-container">
        <Text style={{marginLeft: '20px', fontWeight: 'bold'}}> Welcome {user?.firstName}! </Text>
        <AnimeRecordForm />
        <AnimeRecordList />
    </div>;
}