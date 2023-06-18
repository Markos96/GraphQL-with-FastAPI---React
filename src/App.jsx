import Navbar from "./components/Navbar";
import PlayerComponent from "./components/PlayerComponent";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/config";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IndexComponent from "./components/IndexComponent";
import TeamComponent from "./components/TeamComponent";
import { CssBaseline } from "@mui/material";
import FormPlayers from "./components/FormPlayers";

function App(props) {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <nav>
          <Navbar />
        </nav>
        <Routes>
          <Route path="/players" element={<PlayerComponent />}></Route>
          <Route path="/" element={<IndexComponent />}></Route>
          <Route path="/teams" element={<TeamComponent />}></Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
