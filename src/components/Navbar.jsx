import React from "react";
import { AppBar, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import People from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Link } from "react-router-dom";
import ApiIcon from '@mui/icons-material/Api';



const Navbar = () => {

  return (
    <AppBar position="static" style={{ background: '#1C1E97' }}>
      <Toolbar>
        <IconButton>
          <ApiIcon color="primary"/>
        </IconButton>
        <Typography
          fontFamily="cursive"
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
        </Typography>
        <Stack direction="row" spacing={2}>
          <Tooltip title="Home">
          <IconButton component={Link} to="/">
            <HomeIcon color="primary"/>
          </IconButton>
          </Tooltip>

          <Link to="/players">
          <Tooltip title="Players">
          <IconButton component={Link} to="/players">
            <People color="primary"/>
          </IconButton>
          </Tooltip>
          </Link>
          <Tooltip title="Teams">
          <IconButton component={Link} to="/teams">
            <SportsSoccerIcon color="primary"/>
          </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
