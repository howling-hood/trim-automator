/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import { Check, Close, Delete } from "@mui/icons-material";
import { Divider, Fab, Grid2 as Grid, Snackbar, Typography } from "@mui/material";

import TimeInput from "../TimeInput";

const TimeEntry = ({ disabled, handleChange, data }) => {
  const [startTime, setStartTime] = useState(data[0]);
  const [endTime, setEndTime] = useState(data[1]);
  const [errorText, setError] = useState("");

  const handleSubmit = () => {
    if (endTime === 0) {
      setError("End input needed");
      return;
    }
    if (startTime === endTime) {
      setError("Both times cant be same");
      return;
    }

    if (endTime < startTime) {
      setError("Start time ahead of end time");
      return;
    }

    handleChange([startTime, endTime]);
  };

  return (
    <Grid
      sx={{
        justifyContent: "center",
        alignItems: "center",
        maxHeight: 100,
        overflowX: "hidden",
        overflowY: "hidden",
        borderRadius: "5px"
      }}
      container>
      <Grid size={4}>
        <TimeInput
          disabled={disabled}
          handleChange={setStartTime}
          value={startTime}
        />
      </Grid>
      <Grid size={1}>
        <Divider
          variant="inset"
          orientation="vertical"
          flexItem
        />
      </Grid>
      <Grid size={4}>
        <TimeInput
          disabled={disabled}
          handleChange={setEndTime}
          value={endTime}
        />
      </Grid>
      <Grid size={2}>
        <center>
          <Fab
            onClick={disabled ? handleChange : handleSubmit}
            color={disabled ? "error" : "success"}
            size="small"
            variant="contained">
            {disabled ? <Delete /> : <Check />}
          </Fab>
        </center>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={errorText !== ""}
        autoHideDuration={2000}
        message={errorText}
        action={
          <Close
            onClick={() => {
              setError("");
            }}
          />
        }
      />
    </Grid>
  );
};
export default TimeEntry;
