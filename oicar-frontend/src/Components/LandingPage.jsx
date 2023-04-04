import React from 'react'
import '../Styles/LandingPageStyle.css'
import GoogleIcon from '@mui/icons-material/Google';
import Navbar from './Navbar';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <>
      <Navbar/>
        <div className="page">
      <div className="content">
        <img src="https://cdn.discordapp.com/attachments/902664614507065375/1092037281923211374/logo-fitpal.png" alt="FitPal" className="image" />
      </div>
      <div className="header">
        {/* <button className="button">Continue with Google<GoogleIcon id="google-icon"/></button>
        <button className="button">Sign Up with Google<GoogleIcon id="google-icon"/></button> */}
      </div>
    </div>
      <Footer/>
    </>
  )
}

export default LandingPage