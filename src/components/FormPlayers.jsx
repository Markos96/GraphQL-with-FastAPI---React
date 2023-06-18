import React, { useEffect, useState } from "react";
import { Container, TextField, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {} from "./PlayerComponent";
import swal from "sweetalert";
import axios from "axios";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const FormPlayers = (props) => {
  const navigate = useNavigate();

  const { show } = props;

  const playerDefault = {
    name: "",
    age: "",
    number: "",
    team: "",
  };

  const [name, setName] = useState("");
  const [player, setPlayer] = useState(playerDefault);
  const [age, setAge] = useState("");
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [nameError, setNameError] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [teamSelected, setTeamSelected] = useState();
  const [teams, setTeams] = useState([]);


  const handleChangeName = (e) => {
    const nameInput = e.target.value;

    setName(nameInput);

    if (nameInput === "") {
      validateField(e.target.id);
    } else {
      validateName(nameInput);
    }
  };

  const handleChangeAge = (e) => {
    const ageInput = e.target.value;

    setAge(ageInput);

    if (ageInput === "") {
      validateField(e.target.id);
    } else {
      validateAge(ageInput);
    }
  };

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeams();
    setShowInput(false);
  }, []);

  const handleChangeNumber = (e) => {
    const numberInput = e.target.value;

    setNumber(numberInput);

    if (numberInput === "") {
      validateField(e.target.id);
    } else {
      validateNumber(numberInput);
    }
  };

  const createPlayer = (player) => {
    swal({
      title: "Created",
      text: "Player created successfully",
      icon: "success",
      buttons: "OK",
    }).then((response) => {
      if (response) {
        console.log(props);
        props.onSavePlayer(player);
        navigate("/players", { state: { player } });
      }
    });
  };

  const cleanForm = () => {
    setName("");
    setAge("");
    setNumber("");
    setTeamSelected("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameValue = e.target.name.value;
    const numberValue = e.target.number.value;
    const ageValue = e.target.age.value;

    if (
      ageValue !== "" &&
      nameValue !== "" &&
      numberValue !== "" &&
      validateAge(ageValue) &&
      validateName(nameValue) &&
      validateNumber(numberValue)
    ) {
      player.name = nameValue;
      player.age = ageValue;
      player.number = numberValue;
      player.team = teamSelected;
      setPlayer(player);
      createPlayer(player);
      cleanForm();
      disabledInput();
    }
  };

  const validateName = (name) => {
    const regexName = /^[A-Za-z]+$/;

    regexName.test(name)
      ? setNameError("")
      : setNameError("El nombre solo puede contener letras");

    return regexName.test(name);
  };

  const validateAge = (age) => {
    const regexAge = /^([8-9]|[1-9][0-9])$/;

    regexAge.test(age)
      ? setAgeError("")
      : setAgeError("El campo solo puede tener numeros");

    return regexAge.test(age);
  };

  const validateNumber = (number) => {
    const regexNumber = /^([1-9]|[1-9][0-9]?)$/;

    regexNumber.test(number)
      ? setNumberError("")
      : setNumberError("El campo solo puede tener numeros");

    return regexNumber.test(number);
  };

  const validateField = (field) => {
    const fieldEmpty = /^[^]+$/;

    if (field === "name") {
      fieldEmpty.test(field)
        ? setNameError(`The field ${field.toUpperCase()} cannot be empty`)
        : setNameError("");
    } else if (field === "age") {
      fieldEmpty.test(field)
        ? setAgeError(`The field ${field.toUpperCase()} cannot be empty`)
        : setAgeError("");
    } else if (field === "number") {
      fieldEmpty.test(field)
        ? setNumberError(`The field ${field.toUpperCase()} cannot be empty`)
        : setNumberError("");
    }
  };

  const showsInputs = () => {
    setShowInput(true);
  };

  const disabledInput = () => {
    setShowInput(false);
  };

  const handleChangeTeam = (event) => {
    setTeamSelected(event.target.value);
  };

  return (
    <>
      <Container
        maxWidth="xs"
        component="form"
        sx={{ mt: 10, mb: 5 }}
        onSubmit={handleSubmit}
      >
        {showInput === true ? (
          <>
            <TextField
              id="name"
              label="Name"
              type="text"
              variant="outlined"
              fullWidth
              error={nameError}
              helperText={nameError}
              value={name}
              name="name"
              onChange={handleChangeName}
            />

            <TextField
              id="age"
              label="Age"
              type="text"
              variant="outlined"
              fullWidth
              error={ageError}
              helperText={ageError}
              value={age}
              sx={{ mt: 2 }}
              onChange={handleChangeAge}
            />

            <TextField
              id="number"
              label="Number"
              type="text"
              variant="outlined"
              fullWidth
              error={numberError}
              helperText={numberError}
              value={number}
              sx={{ mt: 2 }}
              onChange={handleChangeNumber}
            />

            <TextField
              id="outlined-select-currency"
              select
              label="Team"
              helperText="Please select your team"
              onChange={handleChangeTeam}
              sx={{ mt: 2, width: "100%" }}
            >
              
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 10, ml: 12 }}
              color="secondary"
              startIcon={<CheckCircleOutlineIcon />}
            >
              Add Player
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={showsInputs}
            sx={{ mt: 10, ml: 12 }}
            color="secondary"
            startIcon={<PersonAddIcon />}
          >
            New Player
          </Button>
        )}
      </Container>
    </>
  );
};

export default FormPlayers;
