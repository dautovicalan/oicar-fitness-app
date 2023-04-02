import React from 'react'
import '../Styles/LandingPageStyle.css'
import GoogleIcon from '@mui/icons-material/Google';

const LandingPage = () => {
  return (
    <div>
        <div className="page">
      <div className="content">
        <img src="https://cdn.discordapp.com/attachments/902664614507065375/1092037281923211374/logo-fitpal.png" alt="An example image" className="image" />
      </div>
      <div className="header">
        <button className="button">Continue with Google<GoogleIcon id="google-icon"/></button>
        <button className="button">Sign Up with Google<GoogleIcon id="google-icon"/></button>
      </div>
    </div>
    </div>
    
  )
}

export default LandingPage