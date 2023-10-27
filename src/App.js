import React, { lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { themeChange } from "theme-change";
import initializeApp from "./app/init";
import useAuth from "./hooks/useAuth";

// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const Documentation = lazy(() => import("./pages/Documentation"));

// Initializing different libraries
initializeApp();

function App() {
  const { user } = useAuth();
  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route
            element={
              !user ? <Outlet /> : <Navigate to="/app/dashboard" replace />
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/documentation" element={<Documentation />} />
          </Route>

          {/* Private routes */}
          <Route element={user ? <Outlet /> : <Navigate to="/login" replace />}>
            <Route path="/app/*" element={<Layout />} />
          </Route>

          {/* Wrong path */}
          <Route
            path="*"
            element={
              <Navigate to={user ? "/app/dashboard" : "/login"} replace />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
