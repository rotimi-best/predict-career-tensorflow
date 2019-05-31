import React, { useEffect } from 'react';
import * as tfjs from "@tensorflow/tfjs";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { dataSet } from "../helpers/dataset";
import { LOWERCASE_ALPH, LABELS } from "../helpers/constants";

export default function Prediction(props) {
  const { result, resetQuestions } = props;

  useEffect(() => {
    async function getTrainedModel() {
      const model = await tfjs.loadLayersModel('localstorage://my-model');
      console.log("Trained Model", model);
    }

    getTrainedModel();
  }, []);

  return (
    <div style={{ display: 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
      <div>
        <Typography component="h4" variant="h3" gutterBottom>
          Success
        </Typography>
      </div>
      <Button variant="contained" color="primary" onClick={() => resetQuestions()}>Try Again</Button>
    </div>
  );
}

Prediction.invokedOnce = false;
