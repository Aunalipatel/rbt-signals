import React from "react";
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
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Books() {
  const [orderbook, SetOrderbook] = useState([]);
  const [tradebook, SetTradebook] = useState([]);
  const [iifl_access_token, SetIifl_access_token] = useState("");

  // const fetchOrderbook = async () => {
  //   let access = "";

  //   try {
  //     const res = await axios.post(
  //       "https://ttblaze.iifl.com/interactive/user/session",
  //       {
  //         secretKey: "Qjob833$lj",
  //         appKey: "b9e2f7a1f71dc6e04ae218",
  //         source: "WebAPI",
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     access = res.data.result.token;
  //     console.log("Access token was fetched!");
  //   } catch (e) {
  //     console.log(e);
  //     console.log("Access token was not fetched due to error");
  //   }

  //   try {
  //     // console.log("mxmxm", iifl_access_token);

  //     const res = await axios.get(
  //       "https://ttblaze.iifl.com//interactive/orders",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization: access,
  //         },
  //       }
  //     );
  //     console.log("response", res.data);
  //     SetOrderbook(res.data.result);
  //     console.log("orderbook", orderbook);
  //     toast.success("Order Book was fetched!", {
  //       position: "top-right",
  //       autoClose: 1000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     // alert("Order Book was not updated due to error");
  //     toast.error("Order Book was not updated due to error", {
  //       position: "top-right",
  //       autoClose: 10000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };

  const fetchTradebook = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_NGROK_URL}/gettradebookblaze`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", res.data);
      SetTradebook(res.data);
      console.log("Tradebook", tradebook);
      toast.success("Trade Book was fetched!", {
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
      toast.error("Trade Book was not updated due to error", {
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

  const fetchOrderbook = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_NGROK_URL}/getorderbookblaze`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", res.data);
      SetOrderbook(res.data);
      console.log("orderbook", orderbook);
      toast.success("Order Book was fetched!", {
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
      toast.error("Order Book was not updated due to error", {
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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Box m={5}>
          <Button variant="contained" color="success" onClick={fetchOrderbook}>
            Fetch Order book
          </Button>
          <p>Directly fetched from Blaze Web </p>
        </Box>
        <Box>
          <tbody>
            <tr>
              <th style={{ width: "3%" }}>Index </th>
              <th style={{ width: "7%" }}>Account </th>
              <th style={{ width: "7%" }}>Instrument </th>
              <th style={{ width: "4%" }}>Side</th>
              <th style={{ width: "4%" }}>Qty</th>
              {/* <th style={{ width: "7%" }}>Filled</th> */}
              <th style={{ width: "4%" }}>Pending Qty</th>
              <th style={{ width: "7%" }}>Order Price</th>
              <th style={{ width: "7%" }}>Product</th>
              <th style={{ width: "7%" }}>Order Type</th>
              <th style={{ width: "7%" }}>Order Status</th>
              <th style={{ width: "20%" }}>Reject Reason</th>
              <th style={{ width: "7%" }}>Validity</th>
            </tr>
            {orderbook.map((s, index) => (
              <tr style={{ outline: "thin solid" }} key={index}>
                <td>{index + 1}</td>
                <td>{s.ClientID}</td>
                <td> {s.TradingSymbol}</td>
                <td> {s.OrderSide}</td>
                <td> {s.OrderQuantity}</td>
                <td> {s.LeavesQuantity}</td>
                <td> {s.OrderAverageTradedPrice}</td>
                <td> {s.ProductType}</td>
                <td> {s.OrderType}</td>
                <td> {s.OrderStatus}</td>
                <td> {s.CancelRejectReason}</td>
                <td> {s.TimeInForce}</td>
              </tr>
            ))}
          </tbody>
        </Box>
        <Box m={5}>
          <Button variant="contained" color="success" onClick={fetchTradebook}>
            Fetch Trade book
          </Button>
          <p>Directly fetched from Blaze Web </p>
        </Box>
        <Box>
          <tbody>
            <tr>
              <th style={{ width: "3%" }}>Index </th>
              <th style={{ width: "7%" }}>Account </th>
              <th style={{ width: "12%" }}>Instrument </th>
              <th style={{ width: "4%" }}>Side</th>
              <th style={{ width: "4%" }}>Qty/Filled</th>
              <th style={{ width: "7%" }}>Cumulative Qty</th>
              <th style={{ width: "7%" }}>Order Price</th>
              <th style={{ width: "5%" }}>Product</th>
              <th style={{ width: "7%" }}>Order Type</th>
              <th style={{ width: "7%" }}>Order Status</th>
              <th style={{ width: "5%" }}>Validity</th>

              {/* <th style={{ width: "5%" }}>TargetPrice</th> */}
            </tr>
            {tradebook.map((s, index) => (
              <tr key={index} style={{ height: "8vh" }}>
                <td>{index + 1}</td>
                <td>{s.ClientID}</td>
                <td> {s.TradingSymbol}</td>
                <td> {s.OrderSide}</td>
                <td>
                  {s.OrderQuantity}/{s.LastTradedQuantity}
                </td>
                <td> {s.CumulativeQuantity}</td>
                <td> {s.OrderAverageTradedPrice}</td>
                <td> {s.ProductType}</td>
                <td> {s.OrderType}</td>
                <td> {s.OrderStatus}</td>
                <td> {s.TimeInForce}</td>
              </tr>
            ))}
          </tbody>
        </Box>
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default Books;

// const fetchiiflaccess = async () => {
//   try {
//     const res = await axios.post(
//       "https://ttblaze.iifl.com/interactive/user/session",
//       {
//         secretKey: "Qjob833$lj",
//         appKey: "b9e2f7a1f71dc6e04ae218",
//         source: "WebAPI",
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     SetIifl_access_token(res.data.result.token);
//     // localStorage.setItem("iifl_access", iifl_access_token);
//     // const d = new Date();
//     // let day = d.getDay();
//     // console.log(day);
//     // localStorage.setItem("lastfetched", day);
//     console.log("Access token was fetched!");
//   } catch (e) {
//     console.log(e);
//     console.log("Access token was not fetched due to error");
//   }
// };
