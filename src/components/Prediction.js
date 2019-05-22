import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function Prediction(props) {
  const { result, resetQuestions } = props;
  
  console.log('Result', result);

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
