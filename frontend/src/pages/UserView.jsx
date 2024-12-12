import { useState, useEffect } from "react";
import { getStandings, getGames, getGameHistory } from "../services/api";
import Table from "../components/Table";
import Schedule from "../components/Schedule";

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-gray-200">
              UPCOMING GAMES
            </h2>
            <Schedule
              games={games.filter((game) => game.status === "scheduled")}
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-gray-200">
              GAME HISTORY
            </h2>
            <Schedule games={completedGames} showScores={true} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b-2 border-gray-200">
              TEAM STANDINGS
            </h2>
            <Table teams={teams} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserView;
