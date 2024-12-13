import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-600">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">
              Apitong Basketball League
            </span>
          </Link>
          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-white hover:text-blue-200 font-semibold"
            >
              STANDINGS
            </Link>
            <Link
              to="/"
              className="text-white hover:text-blue-200 font-semibold"
            >
              SCHEDULE
            </Link>
            <Link
              to="/admin/login"
              className="text-white hover:text-blue-200 font-semibold"
            >
              ADMIN
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
