import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Basketball League
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-blue-200">
              Standings
            </Link>
            <Link to="/admin/login" className="hover:text-blue-200">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
