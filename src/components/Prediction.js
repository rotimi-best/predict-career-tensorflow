import React, { useEffect } from 'react';
import * as tfjs from "@tensorflow/tfjs";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { dataSet } from "../helpers/dataset";
import { LOWERCASE_ALPH, LABELS } from "../helpers/constants";

export default function Prediction(props) {
  const { result, resetQuestions } = props;

  const skillToNumberArray = skill => {
    // Stringed to numbers and then sort asc
    const skillsInNumbers = skill
      .split('')
      .filter(s => s.trim().length)
      .map(s =>  LOWERCASE_ALPH.indexOf(s.toLowerCase()) + 1)
      .sort((a, b) => a - b);

    // Convert to range 0 - 1
    const min = skillsInNumbers[0];
    const max = skillsInNumbers[skillsInNumbers.length - 1];
    
    const result = skillsInNumbers
      .map(s => (s - min) / (max - min))
      .reduce((acc, val) => acc + val);

    return result;
  };

  useEffect(() => {
    const skills = [];
    const labels = [];
    // console.log('Result', result);
    // console.log('\n\nInitial dataSet', dataSet);

    for (const d of dataSet) {
      const data = skillToNumberArray(d.skill);
      skills.push(data);
      const label = LABELS.indexOf(d.label);
      labels.push(label);
    }

    const xs = tfjs.tensor1d(skills);

    const labelTensor = tfjs.tensor1d(labels, 'int32');
    
    const ys = tfjs.oneHot(labelTensor, 9);
    labelTensor.dispose();

    xs.print();
    ys.print();

    const model = tfjs.sequential();
    const hidden = tfjs.layers.dense({
      units: 16,
      activation: 'sigmoid',
      inputDim: 1
    });

    const output = tfjs.layers.dense({
      units: 9,
      activation: 'softmax'
    });

    model.add(hidden);
    model.add(output);

    const lr = 0.2;
    const optimizer = tfjs.train.sgd(lr);

    model.compile({
      optimizer,
      loss: 'categoricalCrossentropy'
    });

    const options = {
      epochs: 10,
      shuffle: true,
      validationSplit: 0.1
    };

    model.fit(xs, ys, options).then(res => console.log(res.history.loss));
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
