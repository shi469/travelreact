import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Destinations from "../pages/Destinations";
import DestinationDetails from "../pages/DestinationDetails";
import AddDestination from "../pages/AddDestination";
import EditDestination from "../pages/EditDestination";
import Register from "../pages/Register";
import Login from "../components/Login";
import Logout from "../components/Logout";
import ProtectedRoute from "./ProtectedRoute";
import Favorites from "../pages/Favorites";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/destinations"
        element={<Destinations />}
      />

      <Route
        path="/destinations/:id"
        element={<DestinationDetails />}
      />

      <Route
        path="/add-destination"
        element={
          <ProtectedRoute>
            <AddDestination />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-destination/:id"
        element={
          <ProtectedRoute>
            <EditDestination />
          </ProtectedRoute>
        }
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/logout"
        element={<Logout />}
      />

      {/* ✅ Fixed */}
      <Route
        path="/favorites"
        element={<Favorites />}
      />
      <Route
        path="/destinations/:id"
        element={<DestinationDetails />}
      />

      {/* ✅ Add this */}
      <Route
        path="/destinations/:id/view"
        element={<DestinationDetails />}
      />
    </Routes>
  );
}

export default AppRoutes;