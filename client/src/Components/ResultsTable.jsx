import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress } from "@mui/material";
import { ClassNames } from "@emotion/react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#D27519",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    cursor: "pointer", // Add cursor pointer to the body cells
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#E6F4F1",
  },
  "&:hover": {
    backgroundColor: "#FFF59D", // Change the background color on hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ data, ingr_list }) {
  const [selectedCell, setSelectedCell] = React.useState(null);

  const handleCellClick = (value) => {
    setSelectedCell(value);
  };

  const handleClosePopup = () => {
    setSelectedCell(null);
  };

  if (!data) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <strong>Day</strong>
              </StyledTableCell>
              <StyledTableCell>
                <strong>Breakfast</strong>
              </StyledTableCell>
              <StyledTableCell>
                <strong>Morning Snacks</strong>
              </StyledTableCell>
              <StyledTableCell>
                <strong>Lunch</strong>
              </StyledTableCell>
              <StyledTableCell>
                <strong>Afternoon Snacks</strong>
              </StyledTableCell>
              <StyledTableCell>
                <strong>Dinner</strong>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data).map(([day, meals]) => (
              <StyledTableRow key={day}>
                <StyledTableCell component="th" scope="row">
                  <strong>{day}</strong>
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => handleCellClick(meals.breakfast)}
                >
                  {meals.breakfast}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => handleCellClick(meals.morning_snacks)}
                >
                  {meals.morning_snacks}
                </StyledTableCell>
                <StyledTableCell onClick={() => handleCellClick(meals.lunch)}>
                  {meals.lunch}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => handleCellClick(meals.afternoon_snacks)}
                >
                  {meals.afternoon_snacks}
                </StyledTableCell>
                <StyledTableCell onClick={() => handleCellClick(meals.dinner)}>
                  {meals.dinner}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedCell && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "25px",
            borderRadius: "4px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 9999,
          }}
        >
          <h4>{selectedCell}</h4>
          <strong>Suggested Recipe : </strong>
          <div className="mt-3 text-center">
            <CircularProgress />
          </div>
          <strong className="mt-3 mb-2">Ingredients : </strong>
          <p>{ingr_list[selectedCell]}</p>
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={handleClosePopup}
          >
            &#x2715;
          </button>
        </div>
      )}
    </>
  );
}
