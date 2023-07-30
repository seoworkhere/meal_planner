// src/App.js
import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import HomeStepper from "./Components/HomeStepper";
import Header from "./Components/header";
import backgroundImage from "./images/background1.jpg";
import "./App.css";
import ResultsTable from "./Components/ResultsTable";

function App() {
  const [tableData, setTableData] = useState({});
  const [hideHomeStepper, setHideHomeStepper] = useState(false);
  const [hideResultsTable, setHideResultsTable] = useState(true);

  const handleResposeFetched = (resp) => {
    setHideHomeStepper(true);
    setHideResultsTable(false);
    setTableData(resp);
  };

  useEffect(() => {
    // console.log("Response in App.js is", tableData);
  }, [tableData]);

  return (
    <>
      <Header />
      <div //parent division of content
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "600px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          hidden={hideHomeStepper}
          sx={{
            minWidth: 275,
            borderRadius: "20px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
          }}
          style={{
            maxWidth: "60%",
            maxHeight: "80%",
            overflow: "auto",
            background: "rgba( 255, 255, 255, 0.7 )",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 13.5px )",
            webkitBackdropFilter: "blur( 13.5px ),",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            ></Typography>
            <div style={{}}>
              <div className="container">
                <div className="row mx-5 mt-5">
                  <HomeStepper handleResposeFetched={handleResposeFetched} />
                </div>
              </div>
            </div>
          </CardContent>
          {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
        </Card>
        <div
          style={{
            position: "relative",
            display: "flex",
            maxWidth: "80%",
            maxHeight: "95%",
            overflow: "auto",
            background: "rgba( 255, 255, 255, 0.7 )",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 13.5px )",
            webkitBackdropFilter: "blur( 13.5px ),",
          }}
          hidden={hideResultsTable}
        >
          <ResultsTable
            data={tableData.meal_plan}
            ingr_list={tableData.ingredients_list}
          />
        </div>
      </div>
    </>
  );
}

export default App;
