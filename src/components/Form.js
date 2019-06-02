import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";

export default function Form(props) {
  const { options, handleFormSubmit } = props;
  const [answer, setAnswer] = useState({
    i: "",
    tfOption: [],
    label: ""
  });

  const handleChange = e => {
    e.preventDefault();
    const i = e.target.value;
    const tfOption = options[e.target.value].tfOption;
    const label = options[e.target.value].label;

    setAnswer({
      i,
      tfOption,
      label
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!answer.tfOption.length) return;

    setAnswer({
      i: "",
      tfOption: [],
      label: ""
    });
    console.log(answer);
    handleFormSubmit(answer);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <FormControl component="fieldset" style={{ margin: "2rem" }}>
        <Typography component="h4" variant="h3" gutterBottom>
          Which of these options best describes you?
        </Typography>
        <RadioGroup
          aria-label="Question"
          name="question"
          style={{ margin: "2rem 0" }}
          value={answer.i}
          onChange={handleChange}
        >
          {options.map((val, i) => (
            <FormControlLabel
              key={i}
              value={`${i}`}
              control={<Radio />}
              label={val.option}
            />
          ))}
        </RadioGroup>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </FormControl>
    </div>
  );
}
