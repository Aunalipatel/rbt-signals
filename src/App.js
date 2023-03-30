import "./App.css";
import { Button, Container, Box, Paper } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [info, SetInfo] = useState([]);
  const [lastrefreshed, SetLastrefreshed] = useState("");

  //

  useEffect(() => {
    const interval = setInterval(() => {
      fetchInfo();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  //

  const fetchInfo = async () => {
    try {
      const res = await axios.get("http://13.233.40.50:5000");
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
        theme: "colored",
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

  return (
    <div className="App">
      <Box m={5}>
        <Button variant="contained" onClick={fetchInfo}>
          Refresh
        </Button>
        <p>Last refreshed at {lastrefreshed}</p>
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
              {s.Instrument} , <b>{s.Signal} </b>
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
                  EntryDateTime : {s.EntryDateTime} , EntryPrice: {s.EntryPrice}{" "}
                  , StopLoss: {s.StopLoss} , Target Price:
                  {s.TargetPrice}
                </p>
                {/* {s.Signal === "Exit" ? (
                  <div>
                    <p>
                      ExitDateTime : {s.ExitDateTime} , ExitPrice: {s.ExitPrice}{" "}
                      , ExitCondition : {s.ExitCondition}
                    </p>
                  </div>
                ) : (
                  <p></p>
                )} */}
              </div>
            )}
          </Box>
        </Paper>
      ))}
      <ToastContainer />
    </div>
  );
}

export default App;
