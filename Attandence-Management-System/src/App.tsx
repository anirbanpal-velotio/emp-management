import React, { useEffect } from "react";
import "./App.css";
import SigninForm from "./Components/SigninForm";
import UserDashboard from "./Components/UserDashboard";
import EmployeeRecords from "./Components/EmployeeRecords";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { reduxState } from "./redux/reducers";
import { USER_STATE } from "./models/user.model";
import { setLoggedIn } from "./redux/actions/auth";

function App() {
  const dispatch = useDispatch();
  const authState = useSelector((state: reduxState) => state.auth);
  const autoAthenticate = () => {
    const userData = localStorage.getItem("userDeatils");
    if (userData) {
      const user = JSON.parse(userData) as USER_STATE;
      dispatch(setLoggedIn(user));
    }
  };

  useEffect(() => {
    autoAthenticate();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        {authState.user && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              authState.user ? (
                <Navigate to="/userdashboard" replace />
              ) : (
                <SigninForm />
              )
            }
          />

          <Route
            path="/employeerecords"
            element={
              <ProtectedRoute>
                <EmployeeRecords />
              </ProtectedRoute>
            }
          />

          <Route
            path="/userdashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
