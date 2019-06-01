import * as tfjs from "@tensorflow/tfjs";

import { dataSet } from "../helpers/dataset";
import { LOWERCASE_ALPH, LABELS } from "../helpers/constants";

export function skillToNumberArray(skill) {
  // Stringed to numbers and then sort asc
  const skillsInNumbers = skill
    .split('')
    // .filter(s => s.trim().length)
    .map(s =>  LOWERCASE_ALPH.indexOf(s.toLowerCase()) + 1)
    .sort((a, b) => a - b);

  // Convert to range 0 - 1
  // const min = skillsInNumbers[0];
  // const max = skillsInNumbers[skillsInNumbers.length - 1];

  // const result = skillsInNumbers
  //   .map(s => (s - min) / (max - min))
  //   .reduce((acc, val) => acc + val);
  // console.log("Skill to number", skill, result / max);
  
  // return result / max;

  const total = skillsInNumbers.reduce((acc, val) => acc + val);
  const toZeroToOne = skillsInNumbers.map(v => v / total).slice(0, 7);
  // const toZeroToOneLength = toZeroToOne.length;
  // const noOfZeroToAdd = 23 - toZeroToOneLength;

  // if (toZeroToOneLength < 23) {
  //   for (let i = 0; i < noOfZeroToAdd; i++) {
  //     toZeroToOne.push(0);
  //   }
  // }
  // return toZeroToOne.reduce((acc, val) => acc + val);
  return toZeroToOne;
};

export async function trainModel() {
  const skills = [];
  const labels = [];

  for (const d of dataSet) {
    const data = skillToNumberArray(d.skill);
    skills.push(data);

    const label = LABELS.indexOf(d.label);
    console.log("Lable indexof", label, d.label, "Skill length",d.skill, data.length);
    labels.push(label);
  }

  const xs = tfjs.tensor2d(skills);
  console.log(xs.shape);

  const labelTensor = tfjs.tensor1d(labels, 'int32');
  
  const ys = tfjs.oneHot(labelTensor, 9);
  console.log(ys.shape);
  labelTensor.dispose();

  xs.print();
  ys.print();

  const model = tfjs.sequential();
  const hidden = tfjs.layers.dense({
    units: 21,
    activation: 'sigmoid',
    inputDim: 7
  });

  const output = tfjs.layers.dense({
    units: 9,
    activation: 'softmax'
  });

  model.add(hidden);
  model.add(output);

  const lr = 0.5;
  const optimizer = tfjs.train.sgd(lr);

  model.compile({
    optimizer,
    loss: 'categoricalCrossentropy'
  });

  const options = {
    epochs: 20,
    shuffle: true,
    validationSplit: 0.1,
    callbacks: {
      // onTrainBegin: () => console.log('Training began'),
      // onTrainEnd: () => console.log('Training complete'),
      onBatchEnd: tfjs.nextFrame,
      // onEpochEnd: (num, logs) => console.log('Num', num, 'Loss', logs.loss)
    }
  };

  const res = await model.fit(xs, ys, options);
  console.log("LOSS: ",res.history.loss);

  // return model;
  await model.save('localstorage://my-model');
};


