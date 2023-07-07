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
import { GoDotFill } from "react-icons/go";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function HomeScreen() {
  const [info, SetInfo] = useState([]);
  const [tradelist, SetTradelist] = useState([]);
  const [lastrefreshed, SetLastrefreshed] = useState("");
  const [open, setOpen] = useState(false);
  const [openlive, setOpenlive] = useState(false);
  const [openpause, setOpenpause] = useState(false);

  const strategies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [checkedresume, setCheckedresume] = useState([
    false, //1
    false, //2
    false, //3
    false, //4
    false, //5
    false, //6
    false, //7
    false, //8
    false, //9
    false, //10
    false, //11
    false, //12
  ]);

  const [checkedpause, setCheckedpause] = useState([
    false, //1
    false, //2
    false, //3
    false, //4
    false, //5
    false, //6
    false, //7
    false, //8
    false, //9
    false, //10
    false, //11
    false, //12
  ]);

  const handleCheckresume = (n) => {
    const updatedCheckedresume = checkedresume.map((item, index) =>
      index === n ? !item : item
    );

    setCheckedresume(updatedCheckedresume);
    console.log(n);
  };

  const handleCheckpause = (n) => {
    const updatedCheckedpause = checkedpause.map((item, index) =>
      index === n ? !item : item
    );

    setCheckedpause(updatedCheckedpause);
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

  let navigate = useNavigate();
  const toBooks = () => {
    let path = "/books";
    navigate(path);
  };

  //

  useEffect(() => {
    const interval = setInterval(() => {
      fetchInfo();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  //

  const resumelivetrading = async () => {
    let payload = { msg: checkedresume };
    let headers = { "Content-Type": "application/json" };
    console.log(payload);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_NGROK_URL}/resumelivetrading`,
        // "http://localhost:5000/resumelivetrading",
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
      toast.error("Live trading not resumed - error", {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const pauselivetrading = async () => {
    let payload = { msg: checkedpause };
    let headers = { "Content-Type": "application/json" };
    console.log(payload);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_NGROK_URL}/pauselivetrading`,
        payload,
        headers
      );
      console.log("response", res.data);
      handleClosepause();
      toast.error("Live Trading has been PAUSED for the selected strategies", {
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
      // alert("error");
      toast.error("live trading not been paused - error", {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const fetchInfo = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_NGROK_URL}`);
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
      // alert("info was not updated due to error");
      toast.error("info was not updated due to error", {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const fetchTradelist = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_NGROK_URL}/gettradelist`
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
      // alert("tradelist was not updated due to error");
      toast.error("tradelist was not updated due to error", {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const killswitch = async () => {
    try {
      handleClose();

      const res = await axios.get(
        `${process.env.REACT_APP_NGROK_URL}/killswitch`
      );
      console.log("response from killswitch", res.data);

      toast.success(
        "Kill switch activated, pls verify that all trades have been exited",
        {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } catch (e) {
      console.log(e);
      toast.error("Kill switch was not activated", {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Box m={5}>
          <Button
            variant="contained"
            onClick={fetchInfo}
            style={{ marginRight: "25vw" }}
          >
            Refresh
          </Button>
          <Button variant="contained" onClick={toBooks}>
            View Books
          </Button>
          <p style={{ marginRight: "35vw" }}>
            Last Refreshed at {lastrefreshed}
          </p>
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
                          checked={checkedresume[index]}
                          onChange={() => handleCheckresume(index)}
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
                Select strategies for which live trading needs to be paused
                (signals will continue to be generated)
              </DialogContentText>
              {strategies.map(({ st }, index) => {
                return (
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedpause[index]}
                          onChange={() => handleCheckpause(index)}
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
              <Button onClick={handleClosepause}>Don't Proceed</Button>
              <Button onClick={pauselivetrading} autoFocus>
                Proceed
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        <Box>
          <tbody>
            <tr style={{ height: "10vh" }}>
              <th style={{ width: "8%" }}> Strategy</th>
              <th style={{ width: "8%" }}> Instrument</th>
              <th style={{ width: "8%" }}> Signal</th>
              <th style={{ width: "8%" }}> Ticker</th>
              <th style={{ width: "8%" }}> Direction</th>
              <th style={{ width: "8%" }}> Lots user1</th>
              <th style={{ width: "8%" }}> Lots user2</th>
              <th style={{ width: "15%" }}> EntryDateTime</th>
              <th style={{ width: "8%" }}> EntryPrice</th>
              <th style={{ width: "8%" }}> StopLoss</th>
              <th style={{ width: "8%" }}> TargetPrice</th>
            </tr>
            {info.map((s, index) => (
              <tr style={{ height: "7vh" }} key={index}>
                <td>{s.Strategy}</td>
                <td> {s.Instrument}</td>
                <td> {s.Signal}</td>
                <td> {s.Ticker}</td>
                <td> {s.Signal === "No Signal" ? "-" : s.Direction}</td>
                <td>
                  {s.Live_Trade1 === false ? (
                    <GoDotFill style={{ color: "red" }} />
                  ) : s.Live_Trade1 === true ? (
                    <GoDotFill style={{ color: "lightgreen" }} />
                  ) : (
                    ""
                  )}
                  {s.Lots1}
                </td>

                <td>
                  {s.Live_Trade2 === false ? (
                    <GoDotFill style={{ color: "red" }} />
                  ) : s.Live_Trade2 === true ? (
                    <GoDotFill style={{ color: "lightgreen" }} />
                  ) : (
                    ""
                  )}
                  {s.Lots2}
                </td>
                <td>{s.Signal === "No Signal" ? "-" : s.EntryDateTime}</td>
                <td>{s.Signal === "No Signal" ? "-" : s.EntryPrice}</td>
                <td>
                  {s.Signal === "No Signal"
                    ? "-"
                    : s.StopLoss === 0
                    ? "-"
                    : s.StopLoss}
                </td>
                <td>
                  {s.Signal === "No Signal"
                    ? "-"
                    : s.TargetPrice === 0
                    ? "-"
                    : s.TargetPrice}
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </Box>
        {/* 
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
        ))} */}

        <br />
        <br />

        <Button variant="contained" color="success" onClick={fetchTradelist}>
          Fetch Signal List
        </Button>
        {/* Fetch Tradelist  */}

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

export default HomeScreen;
