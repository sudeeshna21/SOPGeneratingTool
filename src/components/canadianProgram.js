import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { mutliStepContext } from "../StepContext";

const CanadianProgram = () => {
  const { setCurrentStep, userData, setUserData } =
    useContext(mutliStepContext);
  return (
    <div className="ui-back">
      <Typography className="ui-heading">Admission Details</Typography>
      <div className="ui-fields">
        <div className="ui-row">
          <TextField
            name="admitIn"
            label="Got Admit in"
            className="ui-textfield mr-8 mb-8"
            value={userData?.admitIn || ''}
            required
            onChange={(event) =>
              setUserData({ ...userData, admitIn: event.target.value })
            }
          />
          <TextField
            name="program"
            label="Program of study"
            className="ui-textfield mb-8"
            value={userData?.program || ''}
            required
            onChange={(event) =>
              setUserData({ ...userData, program: event.target.value })
            }
          />
        </div>
        <div className="ui-row">
          <TextField
            name="applyingFrom"
            label="country you are applying from"
            className="ui-textfield mr-8"
            value={userData?.applyingFrom || ''}
            required
            onChange={(event) =>
              setUserData({ ...userData, applyingFrom: event.target.value })
            }
          />
          <TextField
            name="futureGoals"
            label="Your future goals"
            className="ui-textfield"
            value={userData?.futureGoals || ''}
            required
            onChange={(event) =>
              setUserData({ ...userData, futureGoals: event.target.value })
            }
          />
        </div>
      </div>
      <div className="ui-button-container">
        <Button
          startIcon={<ArrowBackIcon />}
          className="ui-button-prev"
          variant="contained"
          onClick={() => setCurrentStep(2)}
        >
          Prev
        </Button>
        <Button
          endIcon={<ArrowForwardIcon />}
          className="ui-button-next"
          variant="contained"
          onClick={() => setCurrentStep(4)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CanadianProgram;
