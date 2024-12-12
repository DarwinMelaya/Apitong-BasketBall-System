import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  createTeam,
  updateTeam,
  createGame,
  getStandings,
  getGames,
  updateGameScore,
} from "../services/api";
import Table from "../components/Table";
import Schedule from "../components/Schedule";

function AdminDashboard() {
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [newTeam, setNewTeam] = useState({ name: "" });
  const [newGame, setNewGame] = useState({
    homeTeam: "",
    awayTeam: "",
    date: "",
    time: "",
    venue: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchData();
  }, [navigate]);

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

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await createTeam(newTeam);
      setNewTeam({ name: "" });
      fetchData();
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  const handleUpdateTeam = async (teamId, wins, losses) => {
    try {
      await updateTeam(teamId, { wins, losses });
      fetchData();
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  const handleCreateGame = async (e) => {
    e.preventDefault();
    if (newGame.homeTeam === newGame.awayTeam) {
      alert("Home team and away team cannot be the same");
      return;
    }
    try {
      const formattedGame = {
        ...newGame,
        date: moment(newGame.date).format("YYYY-MM-DD"),
      };
      await createGame(formattedGame);
      setNewGame({
        homeTeam: "",
        awayTeam: "",
        date: "",
        time: "",
        venue: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const handleUpdateScore = async (gameId, scores) => {
    try {
      await updateGameScore(gameId, scores);
      fetchData();
    } catch (error) {
      console.error("Error updating game score:", error);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Team</h2>
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Team Name</label>
              <input
                type="text"
                value={newTeam.name}
                onChange={(e) => setNewTeam({ name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Add Team
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Schedule Game</h2>
          <form onSubmit={handleCreateGame} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Home Team</label>
              <select
                value={newGame.homeTeam}
                onChange={(e) =>
                  setNewGame({ ...newGame, homeTeam: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Home Team</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Away Team</label>
              <select
                value={newGame.awayTeam}
                onChange={(e) =>
                  setNewGame({ ...newGame, awayTeam: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Away Team</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={newGame.date}
                onChange={(e) =>
                  setNewGame({ ...newGame, date: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Time</label>
              <input
                type="time"
                value={newGame.time}
                onChange={(e) =>
                  setNewGame({ ...newGame, time: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Venue</label>
              <input
                type="text"
                value={newGame.venue}
                onChange={(e) =>
                  setNewGame({ ...newGame, venue: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Schedule Game
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Team Standings</h2>
          <Table teams={teams} onUpdateTeam={handleUpdateTeam} isAdmin={true} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Games</h2>
          <Schedule
            games={games}
            isAdmin={true}
            onUpdateScore={handleUpdateScore}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
