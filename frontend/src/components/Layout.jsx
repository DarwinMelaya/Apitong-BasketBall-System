import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-white">
                Basketball League
              </span>
            </Link>
            {isAdmin ? (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
                className="text-white hover:text-red-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/admin/login"
                className="text-white hover:text-blue-200"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              © {new Date().getFullYear()} Basketball League. All rights
              reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="hover:text-white">
                Terms
              </Link>
              <Link to="/" className="hover:text-white">
                Privacy
              </Link>
              <Link to="/" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
