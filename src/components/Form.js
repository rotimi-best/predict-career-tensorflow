import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

export default function Form(props) {
  const { question: { question, options, answer }, handleFormSubmit } = props;
  const [answerIndex, setAnswerIndex] = useState(answer);
  const [answered, setAnswered] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();

    setAnswered(true);
    setAnswerIndex(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!answered) return;

    const i = Number(answerIndex);
    setAnswered(false);
    setAnswerIndex('');

    handleFormSubmit(i)
  }

  return (
    <div style={{ display: 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
      <FormControl component="fieldset" style={{ margin: '2rem' }}>
        <Typography component="h4" variant="h3" gutterBottom>
          {question}
        </Typography>
        <RadioGroup
          aria-label="Question"
          name="question"
          style={{ margin: '2rem 0' }}
          value={answerIndex}
          onChange={handleChange}
        >
          {
            options.map((option, i) => (
              <FormControlLabel key={i} value={`${i}`} control={<Radio />} label={option} />
            ))
          }
        </RadioGroup>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </FormControl>
    </div>
  );
}
