import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function NavBar(props) {
  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton style={{"marginLeft": -12, marginRight: 20}} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" style={{"flexGrow": 1}}>
            Career Predictor
          </Typography>
          <Button color="inherit">Welcome</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
