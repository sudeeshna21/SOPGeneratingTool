import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Autocomplete } from "@mui/material";

import { mutliStepContext } from "../StepContext";
import config from "../config";
import "../App.css";

const UserInfo = () => {
  const { setCurrentStep, userData, setUserData } =
    useContext(mutliStepContext);

  const educationOptions = [
    "Grade 12",
    "Diploma",
    "Bachelors Degree",
    "Masters Degree",
    "PHD",
  ];

  return (
    <div className="ui-back">
      <form name="userInfoForm" noValidate>
        <Typography className="ui-heading">User Information</Typography>
        <div className="ui-fields">
          <div className="ui-row">
            <TextField
              name="email"
              label="Email"
              className="ui-textfield mr-8 mb-5"
              value={userData?.email || ''}
              onChange={(event) =>
                setUserData({ ...userData, email: event.target.value })
              }
              required
            />
            <TextField
              name="fullName"
              label="FullName"
              className="ui-textfield mb-5"
              value={userData?.fullName || ''}
              onChange={(event) =>
                setUserData({ ...userData, fullName: event.target.value })
              }
              required
            />
          </div>
          <div className="ui-row">
            <TextField
              name="age"
              label="Age"
              className="ui-textfield mr-8 mb-5"
              value={userData?.age || ''}
              onChange={(event) =>
                setUserData({ ...userData, age: event.target.value })
              }
              required
            />
            <Autocomplete
              freeSolo
              getOptionLabel={(option) => (option ? option : "")}
              value={userData?.education}
              onChange={(event, newValue) => {
                setUserData({ ...userData, education: newValue });
              }}
              options={educationOptions}
              renderInput={(params) => (
                <TextField
                  name="education"
                  className="ui-textfield mb-5"
                  {...params}
                  label="Highest Level of education"
                  variant="outlined"
                  required
                />
              )}
            />
          </div>
          <div className="ui-row">
            <TextField
              name="institute"
              label="Institute"
              className="ui-textfield mr-8"
              value={userData?.institute || ''}
              required
              onChange={(event) =>
                setUserData({ ...userData, institute: event.target.value })
              }
            />
            <TextField
              name="field"
              label="Field of study"
              className="ui-textfield"
              value={userData?.field || ''}
              required
              onChange={(event) =>
                setUserData({ ...userData, field: event.target.value })
              }
            />
          </div>
        </div>
        <div className="ui-button-container">
          <Button
            startIcon={<ArrowBackIcon />}
            className="ui-button-prev"
            variant="contained"
            disabled
          >
            Prev
          </Button>
          <Button
            endIcon={<ArrowForwardIcon />}
            className="ui-button-next"
            onClick={() => setCurrentStep(2)}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
