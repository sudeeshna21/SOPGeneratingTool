import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { mutliStepContext } from "../StepContext";
import { Autocomplete } from "@mui/material";
import OpenAI from "openai";
import axios from "axios";
import { config } from "../config";

const FinancialInfo = () => {
  const { setCurrentStep, userData, setUserData, setFinalData, setSubmitted } =
    useContext(mutliStepContext);

  const feeOptions = ["Yes", "No"];

  const saveToSheets = (userData) => {
    axios
      .post("https://sheetdb.io/api/v1/z3g626jried23", userData)
      .then((res) => console.log("success"))
      .catch((err) => console.log(err));
  };

  const generateSOPUsingOpenAI = (userData) => {
    const openai = new OpenAI({
      apiKey: config.openAI.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    openai.completions
      .create({
        model: "text-davinci-003",
        prompt: `Generate SOP (it is statement of purpose not Standard Operating Procedure:) in text format for candidate whose details are 
        full name ${userData?.fullName}
        age ${userData?.age}
        email ${userData?.email}
        highest level of education is ${userData?.education}
        institute ${userData?.institute}
        field of study ${userData?.field}
        previous work experience 
        job title ${userData?.jobTitle}
        job company ${userData?.companyName}
        start date ${userData?.from}
        enddate ${userData?.to}
        description working as a ${userData?.description}
        admission details
        got admit in ${userData?.admitIn}
        field of study ${userData?.program}
        applying from ${userData?.applyingFrom}
        my future goal is ${userData?.futureGoals}
        english scores
        listening- ${userData?.listening}
        writing -${userData?.writing}
        speaking -${userData?.speaking}
        reading - ${userData?.reading}
        financial information
        paid first year tution fee? -${userData?.feePaid}
        amount paid ${userData?.amount}
        done gic?  -- ${userData?.gic}
        amount paid for gic --${userData?.gicFee},`,
        max_tokens: 512,
      })
      .then((chatComp) => {
        const fileData = chatComp.choices[0].text;
        sendBrevoEmail(userData, fileData);
      });
  };

  async function sendBrevoEmail(userData, fileData) {
    try {
      const payload = {
        sender: {
          email: config.brevo.sender.senderEmail,
          name: config.brevo.sender.senderName,
        },
        subject: `Statement of Purpose for ${userData?.fullName}`,
        templateId: config.brevo.template,
        params: {
          email: userData?.email,
          fullName: userData?.fullName,
          age: userData?.age,
          education: userData?.education,
          institute: userData?.institute,
          field: userData?.field,
          jobTitle: userData?.jobTitle,
          companyName: userData?.companyName,
          from: userData?.from,
          to: userData?.to,
          description: userData?.description,
          admitIn: userData?.admitIn,
          program: userData?.program,
          applyingFrom: userData?.applyingFrom,
          futureGoals: userData?.futureGoals,
          listening: userData?.listening,
          writing: userData?.writing,
          speaking: userData?.speaking,
          reading: userData?.reading,
          feePaid: userData?.feePaid,
          amount: userData?.amount,
          gic: userData?.gic,
          gicFee: userData?.gicFee,
          fileData: fileData,
        },
        messageVersions: [
          {
            to: [
              {
                email: userData?.email,
              },
            ],
          },
        ],
      };

      const axiosConfig = {
        method: "post",
        url: `${config.brevo.url}/smtp/email`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": config.brevo.apiKey,
        },
        data: JSON.stringify(payload),
      };

      await axios(axiosConfig);
    } catch (error) {
      console.error("Unable to send email");
      console.error(error);
    }
  }

  const submitData = () => {
    const dataLength = Object.keys(userData)?.length

    // setting the final data
    if (dataLength > 0) {
       // setting the form field to empty and moving back to the first page
      setSubmitted(true);
      setFinalData(userData);
      // save data to sheets
      saveToSheets(userData);

      // generate the SOP application using open AI api
      generateSOPUsingOpenAI(userData);
    }if (dataLength === 0) {
      alert('Please fill the details before submitting')
    }
  };

  return (
    <div className="ui-back">
      <Typography className="ui-heading">Financial Information</Typography>
      <div className="ui-fields">
        <div className="ui-row">
          <Autocomplete
            freeSolo
            getOptionLabel={(option) => (option ? option : "")}
            value={userData?.feePaid || ""}
            required
            onChange={(event, newValue) => {
              setUserData({ ...userData, feePaid: newValue });
            }}
            options={feeOptions}
            renderInput={(params) => (
              <TextField
                name="feePaid"
                className="ui-textfield mr-8 mb-8"
                {...params}
                label="Did you pay your first year tuition?"
                variant="outlined"
              />
            )}
          />
          <TextField
            name="amount"
            label="How much tuition fee did you pay?"
            className="ui-textfield"
            value={userData?.amount || ""}
            required
            onChange={(event) =>
              setUserData({ ...userData, amount: event.target.value })
            }
          />
        </div>
        <div className="ui-row">
          <Autocomplete
            freeSolo
            getOptionLabel={(option) => (option ? option : "")}
            value={userData?.gic || ""}
            required
            onChange={(event, newValue) => {
              setUserData({ ...userData, gic: newValue });
            }}
            options={feeOptions}
            renderInput={(params) => (
              <TextField
                name="gic"
                className="ui-textfield mr-8"
                {...params}
                label="Did you do a GIC?"
                variant="outlined"
              />
            )}
          />
          <TextField
            name="gicFee"
            label="How much did you pay towards GIC?"
            className="ui-textfield"
            value={userData?.gicFee || ""}
            required
            onChange={(event) =>
              setUserData({ ...userData, gicFee: event.target.value })
            }
          />
        </div>
      </div>
      <div className="ui-button-container">
        <Button
          startIcon={<ArrowBackIcon />}
          className="ui-button-prev"
          variant="contained"
          onClick={() => setCurrentStep(4)}
        >
          Prev
        </Button>
        <Button
          endIcon={<ArrowForwardIcon />}
          className="ui-button-next"
          variant="contained"
          onClick={() => submitData()}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FinancialInfo;
