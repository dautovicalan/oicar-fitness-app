import React from "react";
import "../Styles/LandingPageStyle.css";
import GoogleIcon from "@mui/icons-material/Google";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { ReactComponent as YourSvg } from "../Assets/undraw_fitness_stats_sht6.svg";
import { ReactComponent as YourSvg_2 } from "../Assets/undraw_fitness_tracker_3033.svg";
import { ReactComponent as YourSvg_3 } from "../Assets/undraw_healthy_lifestyle_re_ifwg.svg";
import { ReactComponent as YourSvg_4 } from "../Assets/undraw_personal_training_0dqn.svg";
import { ReactComponent as YourSvg_5 } from "../Assets/undraw_private_data_re_4eab.svg";

const LandingPage = () => {
  return (
    <>
      <div className="page">
        <div className="content">
          <div className="svgs">
            <YourSvg />
          </div>
          <div className="svgs">
            <YourSvg_2 />
          </div>
          <div className="svgs">
            <YourSvg_3 />
          </div>
        </div>
        <div className="content">
          <div>
            <YourSvg_4 className="svgs" />
          </div>
          <div>
            <YourSvg_5 className="svgs"/>
          </div>
        </div>
        <div className="header">
          {/* <button onClick={() => setUser("Karlo")}>Click</button> */}
          {/* <button className="button">Continue with Google<GoogleIcon id="google-icon"/></button>
        <button className="button">Sign Up with Google<GoogleIcon id="google-icon"/></button> */}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
