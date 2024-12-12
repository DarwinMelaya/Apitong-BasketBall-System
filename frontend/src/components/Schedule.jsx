import moment from "moment";

function Schedule({ games }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Home Team
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Away Team
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Venue
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {games.map((game) => (
            <tr key={game._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {moment(game.date).format("MMM DD, YYYY")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{game.time}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {game.homeTeam.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {game.awayTeam.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{game.venue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;
