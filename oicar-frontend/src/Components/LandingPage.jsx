import React from 'react'
import '../Styles/LandingPageStyle.css'
import GoogleIcon from '@mui/icons-material/Google';
import Navbar from './Navbar';
import Footer from './Footer';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

const LandingPage = () => {

  const {user, setUser} = useContext(UserContext);


  return (
    <>
        <div className="page">
      <div className="content">
        <img src="https://cdn.discordapp.com/attachments/902664614507065375/1092037281923211374/logo-fitpal.png" alt="FitPal" className="image" />
      </div>
      <div className="header">
        <div>{user}</div>
        {/* <button onClick={() => setUser("Karlo")}>Click</button> */}
        {/* <button className="button">Continue with Google<GoogleIcon id="google-icon"/></button>
        <button className="button">Sign Up with Google<GoogleIcon id="google-icon"/></button> */}
      </div>
    </div>
    </>
  )
}

export default LandingPage