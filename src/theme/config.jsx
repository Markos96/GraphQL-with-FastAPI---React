import { createTheme } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";
import green from "@mui/material/colors/green";
import { blueGrey } from "@mui/material/colors";

const theme = createTheme({
    palette:{
        background: {
            default: '#e0e0e0'
        }
    },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: grey[500],
          border: '2px solid'
        },
      },
    },
    MuiTableContainer: {
        styleOverrides: {
            root: {
                width: '50%',
                marginLeft: '25%',
            }
        }
    },
    MuiIconButton: {
        styleOverrides: {
            colorPrimary: {
                color: green[800]
            }
        }
    },
    MuiTableBody: {
        styleOverrides: {
            root: {
                border: '2px solid',
            }
        }
    }
},
});

export default theme;
