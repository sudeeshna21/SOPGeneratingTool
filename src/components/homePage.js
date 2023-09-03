import React, {useContext} from "react";

import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { mutliStepContext } from '../StepContext';
import '../App.css';

const HomePage = () => {

  const { setStartPage } = useContext(mutliStepContext);

  const navigateToDetails = () =>{
    setStartPage(false);
  }

  return (
    <div>
      <img src='/assets/images/homepage.png'/>
      <div className="hp-button-video">
          <Button
            endIcon={<ArrowForwardIcon />}
            className="hp-button"
            variant="contained"
            onClick={navigateToDetails}
          >
            Start
          </Button>
        </div>
    </div>
  );
};

export default HomePage;
