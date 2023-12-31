import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import VegIcon from "../images/broccoli.png";
import NonVegIcon from "../images/chicken-leg.png";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url(${NonVegIcon})`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor:
      theme.palette.mode === "dark" ? "#003892" : " rgba( 255, 255, 255, 0.4 )",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(${VegIcon})`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function VeganToggle({ handleVeganChange }) {
  const [isNonVegetarian, setIsNonVegetarian] = useState(false);

  React.useEffect(() => {
    handleVeganChange(!isNonVegetarian);
  }, [isNonVegetarian, handleVeganChange]);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={isNonVegetarian}
            onChange={(event) => setIsNonVegetarian(event.target.checked)}
          />
        }
        label={isNonVegetarian ? "I am non-vegetarian" : "I am vegetarian"}
      />
    </FormGroup>
  );
}
