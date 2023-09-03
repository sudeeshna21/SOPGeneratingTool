import { StyledEngineProvider } from "@mui/material/styles";
import CustomizedSteppers from './colorConnector';
import { mutliStepContext } from './StepContext';
import { useContext } from 'react';
import ThankYou from './components/thankYou';
import HomePage from './components/homePage';
import { React } from 'react';

import "./App.css";
import "./index.css";


function App() {
  const {submitted, startPage} = useContext(mutliStepContext);

  let DisplayComponent = <HomePage/>;

    if (!submitted && startPage){
      DisplayComponent = <HomePage/>
    }else if (!submitted && !startPage){
      DisplayComponent = <CustomizedSteppers/>
    }else if (submitted && !startPage){
      DisplayComponent = <ThankYou/>
    }


  return (
    <StyledEngineProvider injectFirst>
      <div className="app-back">
        {DisplayComponent}
      </div>
    </StyledEngineProvider>
  );
}

export default App;
