import { useUser } from "@clerk/clerk-react";
import { AnimeRecordForm } from "./anime-record-form";
import { AnimeRecordList } from "./anime-record-list";

export const Dashboard = () => {
    const { user } = useUser();

    return <div className="dashboard-container">
        <h1> Welcome {user?.firstName}! </h1>
        <AnimeRecordForm />
        <AnimeRecordList />
    </div>;
}