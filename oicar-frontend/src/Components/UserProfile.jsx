import React from "react";
import { Avatar, Container } from "@mui/material";
import { Box, Button } from "@material-ui/core";
import "../Styles/UserProfile.css";

const UserProfile = () => {
  const user = {
    id: 1,
    picture: "https://static.independent.co.uk/2022/08/11/16/Andrew%20Tate.jpg",
    name: "Test User",
    goal: "My goal",
    weight: 90,
    height: 190,
    newsletter: "Subscribed",
  };

  return (
    <div>
      <Container sx={{justifyContent:'center', alignItems: 'center', display: 'flex'}}>
        <h1>Profile</h1>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Avatar
            alt="Test user"
            sx={{
              width: 250,
              height: 250,
              boxShadow: "0px 8px 10px rgba(0,0,0,0.3)",
            }}
            src={user.picture}
          />
        </Box>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          width: "30%",
        }}
        className="info-container"
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h2>Name: </h2>
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h2>{user.name}</h2>
        </Container>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          width: "30%",
        }}
        className="info-container"
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h2>Goal: </h2>
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h2>{user.goal}</h2>
        </Container>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          width: "30%",
        }}
        className="info-container"
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h2>Weight: </h2>
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h2>{user.weight} kg</h2>
        </Container>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          width: "30%",
        }}
        className="info-container"
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h2>Height: </h2>
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h2>{user.height} cm</h2>
        </Container>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          width: "30%",
        }}
        className="info-container"
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h2>Newsletter: </h2>
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h2>{user.newsletter}</h2>
        </Container>
      </Container>
      <Container sx={{justifyContent:'center', alignItems: 'center', display: 'flex', marginTop: '3vh'}}>
      <Button variant="contained" style={{backgroundColor: 'darkblue', color: 'white'}}>Edit Profile</Button>      </Container>
    </div>
  );
};

export default UserProfile;
