import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserView from "./pages/UserView";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<UserView />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
