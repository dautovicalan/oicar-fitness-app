import React from 'react'
import { useState } from 'react';
import "../Styles/LoginFormStyle.css"
import {TextField} from '@mui/material';
import { Button } from '@mui/material';

const LoginForm = () => {

    const [errorMessages, setErrorMessages] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false);

    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();
      };

  return (
    <>
        
    </>
  )
}

export default LoginForm