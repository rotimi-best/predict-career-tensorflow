import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Form from "./components/Form";
import Prediction from "./components/Prediction";
import { skillToNumberArray } from "./modules/trainModel";

import { dataSet } from "./helpers/dataset";
import "./App.css";

export default function App() {
  const [noOfOptions, setNoOfOptions] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [options, setOptions] = useState([
    {
      option: "",
      tfOption: [],
      label: ""
    }
  ]);

  useEffect(() => {
    if (App.invokedOnce) {
      if (noOfOptions === 0) {
        setNextQuestion();
      }
      return;
    }

    // trainModel();
    setNextQuestion();
    App.invokedOnce = true;
  });

  const setNextQuestion = reset => {
    console.log("All answers", answers);

    let optionIndex = reset ? 0 : noOfOptions;
    const newOptions = [];

    for (let i = 0; i < 9; i++) {
      const option = dataSet[optionIndex].skill;
      const tfOption = skillToNumberArray(option);
      const label = dataSet[optionIndex].label;

      newOptions.push({ option, tfOption, label });

      optionIndex += 7;
    }

    setNoOfOptions(noOfOptions + 1);
    console.log("Next Question", noOfOptions);
    setOptions(newOptions);
  };

  const handleFormSubmit = tfOption => {
    console.log("Current question", noOfOptions);

    if (noOfOptions < 7) {
      setAnswers([...answers, tfOption]);
      setNextQuestion();
    } else {
      setAnswers([...answers, tfOption]);
    }
  };

  const startOver = () => {
    setNoOfOptions(0);
    setAnswers([]);
    setOptions([]);
  };

  return (
    <div className="App">
      <NavBar />
      {answers.length < 7 ? (
        <Form options={options} handleFormSubmit={handleFormSubmit} />
      ) : (
        <Prediction answers={answers} startOver={startOver} />
      )}
    </div>
  );
}

App.invokedOnce = false;
