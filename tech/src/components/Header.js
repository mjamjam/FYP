import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../redux/actions";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  const { currentUser: user } = useSelector((state) => ({ ...state.user }));
  console.log("user", user);
  const dispatch = useDispatch();

  const handleAuth = () => {
    dispatch(logoutInitiate());
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/addPatient") {
      setActiveTab("AddPatient");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    } else if (location.pathname === "/login") {
      setActiveTab("Signin");
    }
  }, [location]);
  return (
    <div className="header">
      <Link to="/">
        <p className="logo">Technicians</p>
      </Link>
      <div className="header-right">
        <Link to="/">
          <p
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>

        {/* <a href = "https://fyp2middefensevisualizer.web.app/">
          <p>
            EDF Visualizer
          </p>
        </a> */}

        {/* <a href="http://localhost:8501/" target = "_blank">
          <p>generate inference</p>
        </a> */}

      <Link to="/about">
      <p
            className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => setActiveTab("About")}
          >
            About
          </p>
      </Link>
      {user ?(
          <a href="https://fyp2middefensevisualizer.web.app/">
          <p style={{ cursor: "pointer" }}>
        EDF Visualizer
        </p>
        </a>
        ) : (
          <></>
        )}
      {user ?(
          <a href="">
          <p style={{ cursor: "pointer" }}>
        Generate Inference
        </p>
        </a>
        ) : (
          <></>
        )}
        {user ? (
        

          <p style={{ cursor: "pointer" }} onClick={handleAuth}>
            Sign Out
          </p>
         
        ) : (
          <Link to="/login">
            <p
              className={`${activeTab === "Signin" ? "active" : ""}`}
              onClick={() => setActiveTab("Signin")}
            >
              Sign In
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
