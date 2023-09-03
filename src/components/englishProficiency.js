import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { mutliStepContext } from "../StepContext";

const EnglishProficiency = () => {
  const { setCurrentStep, userData, setUserData } =
    useContext(mutliStepContext);

  return (
    <div className="ui-back">
      <Typography className="ui-heading">English Proficiency</Typography>
      <div className="ui-fields">
        <div className="ui-row">
          <TextField
            name="listening"
            label="English Scores - Listening"
            className="ui-textfield mr-8 mb-8"
            value={userData?.listening || ''}
            required
            onChange={(event) =>
              setUserData({ ...userData, listening: event.target.value })
            }
          />
          <TextField
            name="reading"
            label="English Scores - Reading"
            className="ui-textfield"
            value={userData?.reading || ''}
            required
            onChange={(event) =>
              setUserData({ ...userData, reading: event.target.value })
            }
          />
        </div>
        <div className="ui-row">
          <TextField
            name="speaking"
            label="English Scores - Speaking"
            className="ui-textfield mr-8"
            value={userData?.speaking || ''}
            required
            onChange={(event) =>
              setUserData({ ...userData, speaking: event.target.value })
            }
          />
          <TextField
            name="writing"
            label="English Scores - Writing"
            className="ui-textfield"
            color="secondary"
            value={userData?.writing || ''}
            required
            onChange={(event) =>
              setUserData({ ...userData, writing: event.target.value })
            }
          />
        </div>
      </div>
      <div className="ui-button-container">
        <Button
          startIcon={<ArrowBackIcon />}
          className="ui-button-prev"
          variant="contained"
          onClick={() => setCurrentStep(3)}
        >
          Prev
        </Button>
        <Button
          endIcon={<ArrowForwardIcon />}
          className="ui-button-next"
          variant="contained"
          onClick={() => setCurrentStep(5)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EnglishProficiency;
