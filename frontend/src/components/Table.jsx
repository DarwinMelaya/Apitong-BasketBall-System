import React, { useState } from "react";

function Table({ teams, onUpdateTeam, isAdmin = false }) {
  const [editingTeam, setEditingTeam] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const handleEdit = (team) => {
    setEditingTeam(team);
    setWins(team.wins);
    setLosses(team.losses);
  };

  const handleSave = async () => {
    if (editingTeam) {
      await onUpdateTeam(editingTeam._id, wins, losses);
      setEditingTeam(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Team
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Wins
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Losses
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Win %
            </th>
            {isAdmin && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {teams.map((team) => (
            <tr key={team._id}>
              <td className="px-6 py-4 whitespace-nowrap">{team.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingTeam?._id === team._id ? (
                  <input
                    type="number"
                    value={wins}
                    onChange={(e) => setWins(parseInt(e.target.value))}
                    className="w-20 p-1 border rounded"
                  />
                ) : (
                  team.wins
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingTeam?._id === team._id ? (
                  <input
                    type="number"
                    value={losses}
                    onChange={(e) => setLosses(parseInt(e.target.value))}
                    className="w-20 p-1 border rounded"
                  />
                ) : (
                  team.losses
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {(team.winningPercentage * 100).toFixed(1)}%
              </td>
              {isAdmin && (
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingTeam?._id === team._id ? (
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-900"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(team)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
