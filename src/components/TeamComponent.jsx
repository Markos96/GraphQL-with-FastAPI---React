import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, LinearProgress, Typography } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Box from "@mui/material/Box/Box";
import swal from "sweetalert";
import FormTeams from "./FormTeams";

const TeamComponent = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState([]);

  const fetchTeams = async () => {
    try {
      const response = await axios.post("http://localhost:8000/graphql", {
        query: `
                    query{
                        teams{
                            id
                            name
                            nickname
                            stadium
                        }
                    }
                
                `,
      });

      const teams = response.data.data.teams;

      setTeams(teams);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (data) => {
    const { name, nickname, stadium, league } = data;

    try {
      const response = await axios.post("http://localhost:8000/graphql", {
        query: `
          mutation {
            createTeam(teamInput: {
              name: "${name}",
              nickname: "${nickname}",
              stadium: "${stadium}",
              id_league: 1
            }) {
              name
              nickname
              stadium
              id_league
            }
          }`,
      });

      console.log("Response data" + response.data);

      const { data } = response.data;

      console.log(data);

      fetchTeams();
    } catch (error) {
      // Manejar errores
      console.error(error);
    }
  };

  const showAlertDelete = (teamID) => {
    swal({
      title: "Delete",
      text: "Are you sure to delete the team ? ",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((response) => {
      if (response) {
        swal({
          text: "Team deleted successfully",
          icon: "success",
        });
        deleteTeam(teamID);
      }
    });
  };

  async function deleteTeam(teamID) {
    try {
      const response = await axios.post("http://localhost:8000/graphql", {
        query: `
            mutation {
              deleteTeam(teamID: ${teamID})
            }
          `,
      });

      console.log(response.data);

      setTeams(teams);
      setLoading(false);

      fetchTeams();
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    fetchTeams();
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <FormTeams onSaveTeam={handleSave} />
      {teams && teams.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ background: "#9c27b0" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Nickname</TableCell>
                <TableCell align="center">Stadium</TableCell>
                <TableCell align="center">ID League</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover="true"
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.nickname}</TableCell>
                  <TableCell align="center">{row.stadium}</TableCell>
                  <TableCell align="center">{row.id_league}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(e) => showAlertDelete(row.id)}>
                      <Delete color="warning" />
                    </IconButton>
                    <IconButton>
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
          <Typography
            variant="h5"
            textAlign="center"
            fontFamily="cursive"
            sx={{ mt: 20}}
          >
            No teams available
          </Typography>
        </Box>
      )}
    </>
  );
};

export default TeamComponent;
