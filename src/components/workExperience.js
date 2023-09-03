import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  DateTimePicker,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { mutliStepContext } from "../StepContext";

const WorkExperience = () => {
  const { setCurrentStep, userData, setUserData } =
    useContext(mutliStepContext);

  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="ui-back">
      <Typography className="ui-work-heading">Work Experience</Typography>
      <div className="ui-fields">
        <div className="ui-row">
          <TextField
            name="jobTitle"
            label="Job Title"
            className="ui-textfield mr-8 mb-5"
            value={userData?.jobTitle || ''}
            required
            onChange={(event) =>
              setUserData({ ...userData, jobTitle: event.target.value })
            }
          />
          <TextField
            name="companyName"
            label="Company Name"
            className="ui-textfield mb-5"
            value={userData?.companyName || ''}
            required
            onChange={(event) =>
              setUserData({ ...userData, companyName: event.target.value })
            }
          />
        </div>
        <div className="ui-row">
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                name="from"
                label="From"
                className="ui-textfield mr-8 mb-5"
                minDate={new Date("1800-01-01")}
                value={userData?.from}
                onChange={(newValue) =>
                  setUserData({ ...userData, from: newValue })
                }
                renderInput={(params) => (
                  <TextField {...params} className="ui-textfield mr-16" />
                )}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                name="to"
                label="To"
                className="ui-textfield mb-5"
                minDate={new Date("1800-01-01")}
                value={userData?.to}
                onChange={(newValue) =>
                  setUserData({ ...userData, to: newValue })
                }
                renderInput={(params) => <TextField {...params}/>}
              />
            </LocalizationProvider>
          </div>
        </div>
        <TextField
          name="description"
          label="Description"
          className="ui-desc"
          multiline
          minRows={5}
          maxRows={12}
          value={userData?.description || ''}
          required
          onChange={(event) =>
            setUserData({ ...userData, description: event.target.value })
          }
        />
      </div>
      <div className="ui-button-container">
        <Button
          startIcon={<ArrowBackIcon />}
          className="ui-button-prev"
          variant="contained"
          onClick={() => setCurrentStep(1)}
        >
          Prev
        </Button>
        <Button
          endIcon={<ArrowForwardIcon />}
          className="ui-button-next"
          variant="contained"
          onClick={() => setCurrentStep(3)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default WorkExperience;
