import "./App.css";
import {
  Button,
  Container,
  Box,
  Paper,
  ThemeProvider,
  CssBaseline,
  createTheme,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [info, SetInfo] = useState([]);
  const [tradelist, SetTradelist] = useState([]);
  const [lastrefreshed, SetLastrefreshed] = useState("");
  const [open, setOpen] = useState(false);
  const [openlive, setOpenlive] = useState(false);
  const [openpause, setOpenpause] = useState(false);

  const strategies = [1, 2, 3.1, 3.2, 4, 5, 6, 7, 8, 9, 10];

  const [checked, setChecked] = useState([
    false, //1
    false,
    false, //3.1
    false, //3.2
    false, //4
    false, //5
    false,
    false,
    false,
    false, //9
    false, //10
  ]);

  const handleCheck = (n) => {
    const updatedChecked = checked.map((item, index) =>
      index === n ? !item : item
    );

    setChecked(updatedChecked);
    console.log(n);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenlive = () => {
    setOpenlive(true);
  };

  const handleCloselive = () => {
    setOpenlive(false);
  };

  const handleClickOpenpause = () => {
    setOpenpause(true);
  };

  const handleClosepause = () => {
    setOpenpause(false);
  };

  //

  useEffect(() => {
    const interval = setInterval(() => {
      fetchInfo();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  //

  const resumelivetrading = async () => {
    let payload = { msg: checked };
    let headers = { "Content-Type": "application/json" };
    console.log(payload);
    try {
      const res = await axios.post(
        // "https://6d7c5d3b8ab4.ngrok.app/resumelivetrading",
        "http://localhost:5000/resumelivetrading",
        payload,
        headers
      );
      console.log("response", res.data);
      handleCloselive();
      toast.success("Live Trading has resumed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      console.log(e);
      alert("error");
    }
  };

  const pauselivetrading = async () => {
    try {
      const res = await axios.post(
        // "https://6d7c5d3b8ab4.ngrok.app/resumelivetrading",
        "http://localhost:5000/pauselivetrading"
      );
      console.log("response", res.data);
      handleClosepause();
      toast.error("Live Trading has been PAUSED", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      console.log(e);
      alert("error");
    }
  };

  const fetchInfo = async () => {
    try {
      const res = await axios.get("https://6d7c5d3b8ab4.ngrok.app");
      console.log("response", res.data);
      SetInfo(res.data);
      toast.success("Refreshed!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const date = new Date();
      const showTime =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      SetLastrefreshed(String(showTime));
    } catch (e) {
      console.log(e);
      alert("info was not updated due to error");
    }
  };

  const fetchTradelist = async () => {
    try {
      const res = await axios.get(
        "https://6d7c5d3b8ab4.ngrok.app/gettradelist"
      );
      console.log("response", res.data);
      SetTradelist(res.data);
      console.log(tradelist);
      toast.success("Tradelist was fetched!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      console.log(e);
      alert("tradelist was not updated due to error");
    }
  };

  const killswitch = async () => {
    try {
      handleClose();

      // const res = await axios.post("https://6d7c5d3b8ab4.ngrok.app");
      // console.log("response from killswitch", res.data);

      toast.error("All Trades Exited", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (e) {
      console.log(e);
      alert("Kill switch not activated due to error");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Box m={5}>
          <Button variant="contained" onClick={fetchInfo}>
            Refresh
          </Button>
          <p>Last Refreshed at {lastrefreshed}</p>
        </Box>
        <Box m={5}>
          <Button variant="contained" color="error" onClick={handleClickOpen}>
            KILL SWITCH
          </Button>
          <br />
          <br />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Activate the KILL SWITCH?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                All positions in the account will be exited. Are you sure you
                want to proceed?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Don't Proceed</Button>
              <Button onClick={killswitch} autoFocus>
                Proceed
              </Button>
            </DialogActions>
          </Dialog>

          <Button
            variant="contained"
            color="success"
            onClick={handleClickOpenlive}
          >
            RESUME
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleClickOpenpause}
            style={{ marginLeft: "5vw" }}
          >
            PAUSE
          </Button>

          <Dialog
            open={openlive}
            onClose={handleCloselive}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Setting strategies to Live "}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please select all Strategies that were manually squared off
              </DialogContentText>

              {strategies.map(({ st }, index) => {
                return (
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked[index]}
                          onChange={() => handleCheck(index)}
                        />
                      }
                      label={"Strategy  " + String(strategies[index])}
                    />
                    <br />
                  </div>
                );
              })}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloselive}>Don't Proceed</Button>
              <Button onClick={resumelivetrading} autoFocus>
                Proceed
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openpause}
            onClose={handleClosepause}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to PAUSE Live Trading? "}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Signals will continue to be generated but no trades will be
                taken from Client account
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosepause}>Don't Proceed</Button>
              <Button onClick={pauselivetrading} autoFocus>
                Proceed
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        {info.map((s) => (
          <Paper variant="outlined" elevation={2}>
            <Box
              sx={{
                p: 0,
                bgcolor: "background.default",
                display: "grid",
                gridTemplateColumns: { md: "1fr" },
                gap: 0,
              }}
            >
              <h4> Strategy: {s.Strategy}</h4>
              <p>
                {s.Instrument} , <b>{s.Signal} </b> , {s.Ticker}
              </p>
              {s.Signal === "No Signal" ? (
                <p></p>
              ) : (
                <div>
                  <p>
                    {" "}
                    <b>{s.Direction}</b> Direction, {s.Lots} Lots
                  </p>
                  <p>
                    EntryDateTime : {s.EntryDateTime} , EntryPrice:{" "}
                    {s.EntryPrice} , StopLoss: {s.StopLoss} , Target Price:
                    {s.TargetPrice}
                  </p>
                </div>
              )}
            </Box>
          </Paper>
        ))}

        <Button variant="contained" color="success" onClick={fetchTradelist}>
          Fetch Tradelist
        </Button>

        <br />
        <br />

        <Box m={1}>
          <tbody>
            <tr>
              <th style={{ width: "5%" }}>Index </th>
              <th style={{ width: "5%" }}>Strategy</th>
              <th style={{ width: "5%" }}>Instrument</th>
              <th style={{ width: "5%" }}>Direction</th>
              <th style={{ width: "5%" }}>EntryDateTime</th>
              <th style={{ width: "5%" }}>EntryPrice</th>
              <th style={{ width: "5%" }}>ExitCondition</th>
              <th style={{ width: "5%" }}>ExitDateTime</th>
              <th style={{ width: "5%" }}>ExitPrice</th>
              <th style={{ width: "5%" }}>Lots</th>
              <th style={{ width: "5%" }}>StopLoss</th>
              <th style={{ width: "5%" }}>TargetPrice</th>
            </tr>
            {tradelist.map((s, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{s.Strategy}</td>
                <td> {s.Instrument}</td>
                <td>{s.Direction}</td>
                <td> {s.EntryDateTime}</td>
                <td> {s.EntryPrice}</td>
                <td> {s.ExitCondition}</td>
                <td> {s.ExitDateTime}</td>
                <td> {s.ExitPrice}</td>
                <td> {s.Lots}</td>
                <td> {s.StopLoss === 0 ? "-" : s.StopLoss}</td>
                <td> {s.TargetPrice === 0 ? "-" : s.TargetPrice}</td>
              </tr>
            ))}
          </tbody>
        </Box>

        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
