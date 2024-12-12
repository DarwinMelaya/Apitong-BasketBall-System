import moment from "moment";
import { useState } from "react";

function Schedule({ games, isAdmin, onUpdateScore, showScores = false }) {
  const [editingGame, setEditingGame] = useState(null);
  const [scores, setScores] = useState({ homeScore: 0, awayScore: 0 });

  const handleSaveScore = async (gameId) => {
    await onUpdateScore(gameId, scores);
    setEditingGame(null);
    setScores({ homeScore: 0, awayScore: 0 });
  };

  return (
    <div className="space-y-4">
      {games.map((game) => (
        <div
          key={game._id}
          className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
            game.status === "completed" ? "bg-gray-50" : ""
          }`}
        >
          <div className="text-sm text-gray-600 mb-2">
            {moment(game.date).format("dddd, MMMM D, YYYY")} • {game.time}
          </div>
          <div className="grid grid-cols-3 items-center">
            <div className="text-right font-semibold">
              {game.homeTeam.name}
              {(showScores || game.status === "completed") && (
                <span className="ml-2 text-lg">{game.homeScore}</span>
              )}
            </div>
            <div className="text-center text-sm text-gray-500">
              {game.status === "completed" ? "FINAL" : "VS"}
            </div>
            <div className="text-left font-semibold">
              {game.awayTeam.name}
              {(showScores || game.status === "completed") && (
                <span className="ml-2 text-lg">{game.awayScore}</span>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-600 mt-2 text-center">
            {game.venue}
          </div>
          {isAdmin && game.status !== "completed" && (
            <div className="mt-4">
              {editingGame === game._id ? (
                <div className="space-y-2">
                  <div className="flex justify-center space-x-4">
                    <input
                      type="number"
                      value={scores.homeScore}
                      onChange={(e) =>
                        setScores({
                          ...scores,
                          homeScore: parseInt(e.target.value),
                        })
                      }
                      className="w-20 p-1 border rounded text-center"
                      placeholder="Home"
                    />
                    <input
                      type="number"
                      value={scores.awayScore}
                      onChange={(e) =>
                        setScores({
                          ...scores,
                          awayScore: parseInt(e.target.value),
                        })
                      }
                      className="w-20 p-1 border rounded text-center"
                      placeholder="Away"
                    />
                  </div>
                  <button
                    onClick={() => handleSaveScore(game._id)}
                    className="w-full bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                  >
                    Save Score
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditingGame(game._id)}
                  className="w-full bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                >
                  Update Score
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Schedule;
