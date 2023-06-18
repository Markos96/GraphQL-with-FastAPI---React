import React, { useEffect, useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {} from "./TeamComponent";
import swal from "sweetalert";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const FormTeams = (props) => {

  const navigate = useNavigate();

  const teamDefault = {
    name: "",
    nickname: "",
    stadium: "",
    id_league: ""
  };

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [stadium, setStadium] = useState("");
  const [nameError, setNameError] = useState("");
  const [stadiumError, setStadiumError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [showInput, setShowInput] = useState(false);

  const [team, setTeam] = useState(teamDefault);

  const handleChangeName = (e) => {
    const nameInput = e.target.value;

    setName(nameInput);

    if (nameInput === "") {
      validateField(e.target.id);
    } else {
      validateName(nameInput);
    }
  };

  const handleChangeNickname = (e) => {
    const nicknameInput = e.target.value;

    setNickname(nicknameInput);

    if (nicknameInput === "") {
      validateField(e.target.id);
    } else {
      validateNickname(nicknameInput);
    }
  };

  const handleChangeStadium = (e) => {
    const stadiumInput = e.target.value;

    setStadium(stadiumInput);

    if (stadiumInput === "") {
      validateField(e.target.id);
    } else {
      validateStadium(stadiumInput);
    }
  };

  const createTeam = (team) => {
    swal({
      title: "Created",
      text: "Team created successfully",
      icon: "success",
      buttons: "OK",
    }).then((response) => {
      if (response) {
        props.onSaveTeam(team);
        navigate("/teams", { state: { team } });
      }
    });
  };

  const cleanForm = () => {
    setName("");
    setNickname("");
    setStadium("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameValue = e.target.name.value;
    const nicknameValue = e.target.nickname.value;
    const stadiumValue = e.target.stadium.value;

    if (
      nameValue !== "" &&
      nicknameValue !== "" &&
      stadiumValue !== "" &&
      validateName(nameValue) &&
      validateNickname(nicknameValue) &&
      validateStadium(stadiumValue)
    ) {
      team.name = nameValue;
      team.nickname = nicknameValue;
      team.stadium = stadiumValue;
      team.id_league = 1;
      setTeam(team);
      createTeam(team);
      cleanForm();
      disabledInput();
    }
  };

  const validateNickname = (nickname) => {
    const regexName = /^[A-Za-z ]+$/;

    regexName.test(nickname)
      ? setNicknameError("")
      : setNicknameError("El nombre solo puede contener letras");

    return regexName.test(nickname);
  };

  const validateName = (name) => {
    const regexName = /^[a-zA-Z0-9 ]+$/;

    regexName.test(name)
      ? setNameError("")
      : setNameError("El campo tiene caracteres especiales");

    return regexName.test(name);
  };

  const validateStadium = (stadium) => {
    const regexStadium = /^[a-zA-Z0-9 ]+$/;

    regexStadium.test(stadium)
      ? setStadiumError("")
      : setStadiumError("El campo solo puede tener letras");

    return regexStadium.test(stadium);
  };

  const validateField = (field) => {
    const fieldEmpty = /^[^]+$/;

    if (field === "name") {
      fieldEmpty.test(field)
        ? setNameError(`El campo ${field.toUpperCase()} no puede quedar vacio`)
        : setNameError("");
    } else if (field === "nickame") {
      fieldEmpty.test(field)
        ? setNicknameError(
            `El campo ${field.toUpperCase()} no puede quedar vacio`
          )
        : setNicknameError("");
    } else if (field === "stadium") {
      fieldEmpty.test(field)
        ? setStadiumError(
            `El campo ${field.toUpperCase()} no puede quedar vacio`
          )
        : setStadiumError("");
    }
  };

  const showsInputs = () => {
    setShowInput(true);
  };

  useEffect(() => {
    setShowInput(false);
  }, []);

  const disabledInput = () => {
    setShowInput(false);
  };

  return (
    <>
      <Container
        maxWidth="xs"
        component="form"
        sx={{ mt: 10, mb: 5 }}
        onSubmit={(e) => handleSubmit(e)}
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
              onChange={handleChangeName}
            />

            <TextField
              id="nickname"
              label="Nickname"
              type="text"
              variant="outlined"
              fullWidth
              error={nicknameError}
              helperText={nicknameError}
              value={nickname}
              sx={{ mt: 2 }}
              onChange={handleChangeNickname}
            />

            <TextField
              id="stadium"
              label="Stadium"
              type="text"
              variant="outlined"
              fullWidth
              error={stadiumError}
              helperText={stadiumError}
              value={stadium}
              sx={{ mt: 2 }}
              onChange={handleChangeStadium}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, ml: 17 }}
              color="secondary"
              startIcon={<AddCircleOutline />}
            >
              Add Team
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={showsInputs}
            sx={{ mt: 10, ml: 17 }}
            color="secondary"
            startIcon={<PersonAddIcon />}
          >
            New Team
          </Button>
        )}
      </Container>
    </>
  );
};

export default FormTeams;
