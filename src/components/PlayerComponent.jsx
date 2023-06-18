import React, { useEffect, useState} from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid/Grid";
import { IconButton, LinearProgress, Typography } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Box from "@mui/material/Box/Box";
import swal from "sweetalert";
import FormPlayers from "./FormPlayers";

const PlayerComponent = () => {

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);

  const handleSave = async (data) => {
    const { name, number, age, team } = data;

    try {
      const response = await axios.post("http://localhost:8000/graphql", {
        query: `
          mutation {
            createPlayer(playerInput: {
              name: "${name}",
              number: ${number},
              age: ${age},
              id_team: ${team}
            }) {
              name
              number
              age
              id_team
            }
          }`,
      });

      console.log("Response data" + response.data);

      const { data } = response.data;

      console.log(data);

      fetchPlayers();
    } catch (error) {
      // Manejar errores
      console.error(error);
    }
  };

  
  async function fetchPlayers() {
    try {
      const response = await axios.post("http://localhost:8000/graphql", {
        query: `
            query {
              players {
                id
                name
                number
                age
                id_team
              }
            }
          `,
      });

      console.log(response.data.data.players);

      const players = response.data.data.players;

      setPlayers(players);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  }

  const mostrarAlerta = (playerID) => {
    swal({
      title: "Eliminar",
      text: "Estas seguro de eliminar este jugador",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((response) => {
      if (response) {
        swal({
          text: "El jugador fue eliminado exitosamente",
          icon: "success",
        });
        deletePlayers(playerID);
      }
    });
  };

  async function deletePlayers(id) {
    try {
      const response = await axios.post("http://localhost:8000/graphql", {
        query: `
            mutation {
              deletePlayer(playerID: ${id})
            }
          `,
      });

      console.log(response.data);

      const players = response.data.data.players;

      setPlayers(players);
      setLoading(false);

      fetchPlayers();
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, []);
  

  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  const modify = (row) => {
    setShowInput(true);
  }
 
  return (
    <>
    
      <Grid>
        <Box sx={{ml: 10}}>
         <FormPlayers onSavePlayer={handleSave} show={showInput}/>
         </Box>       

         {players && players.length > 0 ? (
        <TableContainer component={Paper}
        >
          <Table>
            <TableHead
            sx={{background: "#9c27b0"}}
            >
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Number</TableCell>
                <TableCell align="center">ID Team</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>         
                {players.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover="true"
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.age}</TableCell>
                    <TableCell align="center">{row.number}</TableCell>
                    <TableCell align="center">{row.id_team}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={(e) => mostrarAlerta(row.id)}>
                        <Delete color="warning" />
                      </IconButton>
                      <IconButton onClick={(e) => modify(row)}>
                        <Edit color="info" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}      
            </TableBody>
          </Table>
        </TableContainer>
        ) : (
          <Box>
           <Typography variant="h5"
           textAlign="center"
           fontFamily="cursive"
           sx={{mt: 20, ml: 2}}>
             No teams available
           </Typography>
          </Box> 
         )}
      </Grid>
    </>
  );
};


export default PlayerComponent;
