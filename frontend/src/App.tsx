import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import AuthRedirect from "./utils/AuthRedirect";

function App() {
  const [username, setUsername] = useState<string>(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  const isAuthenticated = Boolean(username);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/chat" : "/login"} replace />
          }
        />

        <Route element={<AuthRedirect isAuthenticated={isAuthenticated} />}>
          <Route
            path="/login"
            element={<LoginPage setUsername={setUsername} />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/chat"
            element={<ChatPage username={username} setUsername={setUsername} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
