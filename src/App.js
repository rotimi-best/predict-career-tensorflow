import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Form from "./components/Form";
import Prediction from "./components/Prediction";
import { trainModel, skillToNumberArray } from "./modules/trainModel";

import { dataSet } from "./helpers/dataset";
import "./App.css";

export default function App() {
  const [noOfOptions, setNoOfOptions] = useState(0);
  const [answers, setAnswers] = useState([
    {
      i: "",
      tfOption: [],
      label: ""
    }
  ]);
  const [options, setOptions] = useState([
    {
      option: "",
      tfOption: [],
      label: ""
    }
  ]);

  useEffect(() => {
    if (App.invokedOnce) {
      return;
    }

    // trainModel();
    setNextQuestion();
    App.invokedOnce = true;
  });

  const setNextQuestion = _ => {
    console.log("Question", noOfOptions);

    let optionIndex = noOfOptions;
    const newOptions = [];

    for (let i = 0; i < 9; i++) {
      const option = dataSet[optionIndex].skill;
      const tfOption = skillToNumberArray(option);
      const label = dataSet[optionIndex].label;

      newOptions.push({ option, tfOption, label });

      optionIndex += 7;
    }
    console.log(newOptions);
    setNoOfOptions(noOfOptions + 1);
    setOptions(newOptions);
  };

  const handleFormSubmit = tfOption => {
    console.log(answers.length);
    !answers[0].i.length
      ? setAnswers([tfOption])
      : setAnswers([...answers, tfOption]);

    if (noOfOptions < 7) {
      setNextQuestion();
    }
  };

  const startOver = () => {
    setNoOfOptions(0);
    setAnswers([]);
    setOptions([
      {
        option: "",
        tfOption: []
      }
    ]);
    setNextQuestion();
  };

  return (
    <div className="App">
      <NavBar />
      {noOfOptions >= 7 ? (
        <Prediction answers={answers} startOver={startOver} />
      ) : (
        <Form options={options} handleFormSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

App.invokedOnce = false;
