import React, { useEffect, useState } from "react";
import * as tfjs from "@tensorflow/tfjs";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import { skillToNumberArray, trainModel } from "../modules/trainModel";

// import { dataSet } from "../helpers/dataset";
import { LABELS } from "../helpers/constants";

export default function Prediction(props) {
  const { answers, startOver } = props;
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    async function getTrainedModel() {
      // await trainModel();
      const model = await tfjs.loadLayersModel("localstorage://my-model");
      // const choosen = dataSet[29];
      // console.log("DATASET LENGTH: ", dataSet.length);
      // console.log("Choosen", choosen);

      // const choosenToNumber = skillToNumberArray(choosen.skill);
      // const xs = tfjs.tensor([choosenToNumber]);

      // const result = model.predict(xs);
      // const index = result.argMax(1).dataSync()[0];
      // // index.print()
      // console.log(
      //   "Initial label: ",
      //   choosen.label,
      //   "\nPredicted: ",
      //   LABELS[index]
      // );
      const predictions = [];

      for (let answer of answers) {
        const xs = tfjs.tensor([answer.tfOption]);

        const result = model.predict(xs);
        const index = result.argMax(1).dataSync()[0];
        const prediction = LABELS[index];
        if (!predictions.includes(prediction)) {
          predictions.push(prediction);
        }

        console.log(
          "Initial label: ",
          answer.label,
          "\nPredicted: ",
          LABELS[index]
        );
      }

      setPredictions(predictions);
    }

    getTrainedModel();
  }, [answers]);

  return (
    <div
    // style={{
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "center"
    // }}
    >
      <div>
        <h3>Here are the carrer fields that fits you.</h3>
        {predictions.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <Button variant="contained" color="primary" onClick={() => startOver()}>
        Try Again
      </Button>
    </div>
  );
}

Prediction.invokedOnce = false;
