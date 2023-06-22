import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./pages/protectedRoute";
import TopToken from "./pages/Toptoken";
import SponsorToken from "./pages/Sponsortoken";
import Messages from "./pages/Message";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route isAuth={true} path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Token" element={<TopToken />} />
        <Route path="/SponsorToken" element={<SponsorToken />} />
        <Route path="/Messages" element={<Messages />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
