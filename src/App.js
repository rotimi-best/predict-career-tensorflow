import React, { useState, useEffect } from 'react';
import NavBar from "./components/NavBar";
import Form from "./components/Form";
import Prediction from "./components/Prediction";
import { QUESTIONS } from "./helpers/constants";
import { trainModel } from "./modules/trainModel";

import './App.css';

export default function App() {
  const [questions, setAnswerToQuestion] = useState([...QUESTIONS]);
  const [nextQuestion, setNextQuestion] = useState(0);

  useEffect(() => {
    if (App.invokedOnce) {
      return;
    }

    trainModel();
    App.invokedOnce = true;
  });

  const handleFormSubmit = (indexOfAnswer) => {
    const updatedQuestion = questions.map((q, index) => {
      if (index === nextQuestion) {
        q.answer = indexOfAnswer;
      }

      return q;
    });

    setNextQuestion(nextQuestion + 1);

    setAnswerToQuestion([
      ...updatedQuestion
    ]);
  };

  const resetQuestions = _ => {
    setNextQuestion(0);
    const updatedQuestion = questions.map(q => {
      q.answer = 0;
      return q;
    });

    setAnswerToQuestion([
      ...updatedQuestion
    ]);
  }

  return (
    <div className="App">
      <NavBar />
      {
        nextQuestion !== questions.length
        ? <Prediction 
            result={questions}
            resetQuestions={resetQuestions}  
          />
        : <Form 
            question={questions[nextQuestion]}
            handleFormSubmit={handleFormSubmit}
          />
      }
      
    </div>
  );
}

App.invokedOnce = false
