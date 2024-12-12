import { useState, useEffect } from "react";
import { getStandings, getGames } from "../services/api";
import Table from "../components/Table";
import Schedule from "../components/Schedule";

function UserView() {
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsData, gamesData] = await Promise.all([
          getStandings(),
          getGames(),
        ]);
        setTeams(teamsData);
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Team Standings</h2>
        <Table teams={teams} />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Upcoming Games</h2>
        <Schedule games={games} />
      </div>
    </div>
  );
}

export default UserView;
