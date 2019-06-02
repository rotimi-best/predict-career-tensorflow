import React, { useEffect } from "react";
import * as tfjs from "@tensorflow/tfjs";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { skillToNumberArray, trainModel } from "../modules/trainModel";

import { dataSet } from "../helpers/dataset";
import { LOWERCASE_ALPH, LABELS } from "../helpers/constants";

export default function Prediction(props) {
  const { answers, startOver } = props;

  useEffect(() => {
    async function getTrainedModel() {
      // await trainModel()
      const model = await tfjs.loadLayersModel("localstorage://my-model");
      // const choosen = dataSet[51];
      // console.log("DATASET LENGTH: ", dataSet.length);
      // console.log("Choosen", choosen);

      // const choosenToNumber = skillToNumberArray(choosen.skill);
      console.log("answers", answers);

      for (let answer of answers) {
        const xs = tfjs.tensor([answer.tfOption]);

        const result = model.predict(xs);
        const index = result.argMax(1).dataSync()[0];
        // index.print()
        console.log(
          "Initial label: ",
          answer.label,
          "\nPredicted: ",
          LABELS[index]
        );
      }
    }

    getTrainedModel();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div>
        <Typography component="h4" variant="h3" gutterBottom>
          Success
        </Typography>
      </div>
      <Button variant="contained" color="primary" onClick={() => startOver()}>
        Try Again
      </Button>
    </div>
  );
}

Prediction.invokedOnce = false;
