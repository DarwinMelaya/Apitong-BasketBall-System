import { useState, useEffect } from "react";
import { getStandings, getGames, getGameHistory } from "../services/api";
import Table from "../components/Table";
import Schedule from "../components/Schedule";
import Layout from "../components/Layout";

function UserView() {
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsData, gamesData, historyData] = await Promise.all([
          getStandings(),
          getGames(),
          getGameHistory(),
        ]);
        setTeams(teamsData);
        setGames(gamesData);
        setCompletedGames(historyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-900 px-6 py-4">
            <h2 className="text-xl font-bold text-white">UPCOMING GAMES</h2>
          </div>
          <div className="p-6">
            <Schedule
              games={games.filter((game) => game.status === "scheduled")}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-900 px-6 py-4">
            <h2 className="text-xl font-bold text-white">GAME HISTORY</h2>
          </div>
          <div className="p-6">
            <Schedule games={completedGames} showScores={true} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
          <div className="bg-blue-900 px-6 py-4">
            <h2 className="text-xl font-bold text-white">STANDINGS</h2>
          </div>
          <div className="p-6">
            <Table teams={teams} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserView;
