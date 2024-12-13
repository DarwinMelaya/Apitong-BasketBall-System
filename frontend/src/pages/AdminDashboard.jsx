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
import Layout from "../components/Layout";

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
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
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

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
          <div className="bg-[#1f1f1f] px-6 py-4 rounded-t-xl flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="space-x-4">
          <button
            onClick={() => setIsTeamModalOpen(true)}
            className="bg-[#1f1f1f] text-white py-2 px-4 rounded-lg hover:bg-gray-800"
          >
            Add New Team
          </button>
          <button
            onClick={() => setIsGameModalOpen(true)}
            className="bg-[#ff0000] text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Schedule Game
          </button>
        </div>
      </div>

      {/* Team Modal */}
      <Modal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        title="Add New Team"
      >
        <form
          onSubmit={(e) => {
            handleCreateTeam(e);
            setIsTeamModalOpen(false);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-700 mb-2">Team Name</label>
            <input
              type="text"
              value={newTeam.name}
              onChange={(e) => setNewTeam({ name: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ff0000] focus:border-[#ff0000] outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff0000] text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Add Team
          </button>
        </form>
      </Modal>

      {/* Game Modal */}
      <Modal
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
        title="Schedule Game"
      >
        <form
          onSubmit={(e) => {
            handleCreateGame(e);
            setIsGameModalOpen(false);
          }}
          className="space-y-4"
        >
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
              onChange={(e) => setNewGame({ ...newGame, date: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Time</label>
            <select
              value={newGame.time}
              onChange={(e) => {
                const selectedTime = e.target.value;
                const [hours, minutes] = selectedTime.split(":");
                const formattedTime = moment(
                  `${hours}:${minutes}`,
                  "HH:mm"
                ).format("HH:mm");
                setNewGame({ ...newGame, time: formattedTime });
              }}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Time</option>
              {Array.from({ length: 24 * 4 }).map((_, index) => {
                const minutes = index * 15;
                const time = moment().startOf("day").add(minutes, "minutes");
                return (
                  <option key={index} value={time.format("HH:mm")}>
                    {time.format("h:mm A")}
                  </option>
                );
              })}
            </select>
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
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#1f1f1f] px-6 py-4">
              <h2 className="text-xl font-bold text-white">Teams List</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {teams.map((team) => (
                  <div
                    key={team._id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <h3 className="font-bold text-lg">{team.name}</h3>
                      <p className="text-sm text-gray-600">
                        {team.wins}W - {team.losses}L
                      </p>
                    </div>
                    <div className="text-lg font-bold text-[#ff0000]">
                      {(team.winningPercentage * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-[#1f1f1f] px-6 py-4">
                <h2 className="text-xl font-bold text-white">
                  Game Management
                </h2>
              </div>
              <div className="p-6">
                <Schedule
                  games={games}
                  isAdmin={true}
                  onUpdateScore={handleUpdateScore}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
