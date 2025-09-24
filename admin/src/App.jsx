import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import useAdminStore from "./store/adminStore";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Shoes from "./pages/Shoes";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {
  const { isAuthenticated, setAuthenticated } = useAdminStore();

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAuthenticated(true);
    }
  }, [setAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/shoes" element={<Shoes />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
