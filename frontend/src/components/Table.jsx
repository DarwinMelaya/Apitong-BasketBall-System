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
      <table className="w-full">
        <thead className="border-b-2 border-[#ff0000]">
          <tr>
            <th className="py-3 text-left font-bold uppercase tracking-wide">
              Team
            </th>
            <th className="text-center font-bold uppercase tracking-wide">W</th>
            <th className="text-center font-bold uppercase tracking-wide">L</th>
            <th className="text-center font-bold uppercase tracking-wide">
              PCT
            </th>
            {isAdmin && (
              <th className="text-center font-bold uppercase tracking-wide">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team._id} className="border-b hover:bg-gray-50">
              <td className="py-3 font-medium">{team.name}</td>
              <td className="text-center">
                {editingTeam?._id === team._id ? (
                  <input
                    type="number"
                    value={wins}
                    onChange={(e) => setWins(parseInt(e.target.value))}
                    className="w-16 text-center border rounded"
                  />
                ) : (
                  team.wins
                )}
              </td>
              <td className="text-center">
                {editingTeam?._id === team._id ? (
                  <input
                    type="number"
                    value={losses}
                    onChange={(e) => setLosses(parseInt(e.target.value))}
                    className="w-16 text-center border rounded"
                  />
                ) : (
                  team.losses
                )}
              </td>
              <td className="text-center">
                {(team.winningPercentage * 100).toFixed(1)}%
              </td>
              {isAdmin && (
                <td className="text-center">
                  {editingTeam?._id === team._id ? (
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-800"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(team)}
                      className="text-blue-600 hover:text-blue-800"
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
