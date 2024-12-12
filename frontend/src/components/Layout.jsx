import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="bg-[#1f1f1f] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-white tracking-tight">
                BASKETBALL LEAGUE
              </span>
            </Link>
            <div className="flex items-center space-x-8">
              {isAdmin ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                  className="text-white hover:text-red-400 font-semibold"
                >
                  LOGOUT
                </button>
              ) : (
                <Link
                  to="/admin/login"
                  className="text-white hover:text-[#ff0000] font-semibold"
                >
                  ADMIN LOGIN
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      <footer className="bg-[#1f1f1f] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              © {new Date().getFullYear()} Basketball League. All rights
              reserved.
            </div>
            <div className="flex space-x-8 font-semibold">
              <Link to="/" className="hover:text-[#ff0000]">
                TERMS
              </Link>
              <Link to="/" className="hover:text-[#ff0000]">
                PRIVACY
              </Link>
              <Link to="/" className="hover:text-[#ff0000]">
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
