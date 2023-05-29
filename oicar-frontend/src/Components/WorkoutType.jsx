import React from "react";
import Box from "@mui/material/Box";
import "../Styles/WorkoutTypeStyle.css";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const WorkoutType = () => {
  const [myList, setMyList] = useState([]);

  const picList = [
    {
      id: 2,
      name: "back",
      url: "http://d205bpvrqc9yn1.cloudfront.net/0818.gif",
    },
    {
      id: 3,
      name: "cardio",
      url: "http://d205bpvrqc9yn1.cloudfront.net/1160.gif",
    },
    {
      id: 4,
      name: "chest",
      url: "http://d205bpvrqc9yn1.cloudfront.net/0025.gif",
    },
    {
      id: 5,
      name: "lower-arms",
      url: "http://d205bpvrqc9yn1.cloudfront.net/1421.gif",
    },
    {
      id: 6,
      name: "lower-legs",
      url: "http://d205bpvrqc9yn1.cloudfront.net/2289.gif",
    },
    {
      id: 7,
      name: "neck",
      url: "http://d205bpvrqc9yn1.cloudfront.net/1403.gif",
    },
    {
      id: 8,
      name: "shoulders",
      url: "http://d205bpvrqc9yn1.cloudfront.net/0997.gif",
    },
    {
      id: 9,
      name: "upper-arms",
      url: "http://d205bpvrqc9yn1.cloudfront.net/0047.gif",
    },
    {
      id: 10,
      name: "upper-legs",
      url: "http://d205bpvrqc9yn1.cloudfront.net/0026.gif",
    },
    {
      id: 11,
      name: "waist",
      url: "http://d205bpvrqc9yn1.cloudfront.net/0972.gif",
    },
  ];

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const selectedDate = query.get("state")
    ? JSON.parse(decodeURIComponent(query.get("state"))).selectedDate
    : null;

  useEffect(() => {
    fetch("http://localhost:5280/api/Exercise/GetBodyParts")
      .then((response) => response.json())
      .then((data) => {
        const modifiedList = data.map((item) => {
          if (item.name === item.name) {
            return {
              ...item,
              picture: "path/to/chest-picture.jpg", // Insert picture path for chest
            };
          }
          return item;
        });

        setMyList(modifiedList);
        console.log(myList);
      });
  }, []);

  const navigate = useNavigate();

  const handleClick = (item) => {
    const state = {
      id: item.id,
      date: selectedDate
    };
    const urlEncodedState = encodeURIComponent(JSON.stringify(state));
    navigate(`/addworkout?state=${urlEncodedState}`);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          m: 1,
          p: 1,
        }}
      >
        <div className="item-row">
          {myList.map((item) => {
            return (
              <div key={item.id} className="item">
                <Paper
                  className="item-box-type"
                  onClick={() => handleClick(item)}
                >
                  <h3 id="workout-name">{item.name}</h3>
                  {picList.map((pic) => {
                    return (
                      <div key={pic.id}>
                        {item.id === pic.id && (
                          <img className="picture-type" src={pic.url}></img>
                        )}
                      </div>
                    );
                  })}
                </Paper>
              </div>
            );
          })}
        </div>
      </Box>
    </div>
  );
};

export default WorkoutType;
