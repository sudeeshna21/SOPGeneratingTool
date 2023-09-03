import React, {useState, createContext} from 'react';
import App from './App';

export const mutliStepContext = createContext()

const StepContext = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [startPage, setStartPage] = useState(true);
    const [userData, setUserData] = useState([]);
    const [finalData, setFinalData] = useState([]);

  return (
    <div>
        <mutliStepContext.Provider value={{currentStep, setCurrentStep, userData, setUserData, finalData, setFinalData, submitted, setSubmitted, startPage, setStartPage}}>
            <App />
        </mutliStepContext.Provider>
    </div>
  )
}

export default StepContext;