import React from "react";
import { Routes, Route } from "react-router-dom";
import DeviceScreen from "../screens/DeviceScreen";
import LoginScreen from "../screens/LoginScreen";
import ProtectedRoute from "./ProtectedRoute";

export default () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DeviceScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
