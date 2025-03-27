/* eslint-disable react/prop-types */
import { Grid2 as Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getHMSfromSecs, getSecsFromHMS } from "../../utils/time";

const TimeInput = ({ disabled, handleChange, value: timecode = 0 }) => {
  const timeInSeconds = getHMSfromSecs(timecode);
  const [hours, setHours] = useState(timeInSeconds[0]);
  const [minutes, setMinutes] = useState(timeInSeconds[1]);
  const [seconds, setSeconds] = useState(timeInSeconds[2]);

  useEffect(() => {
    if (disabled) return;
    try {
      handleChange(getSecsFromHMS(hours, minutes, seconds));
    } catch (e) {
      console.error(e);
    }
  }, [hours, minutes, seconds]);

  const commonProperties = {
    type: "number",
    size: "small",
    variant: "filled",
    min: 0,
    max: 59,
    style: {
      width: "80%",
      paddingTop: "5px",
      textAlign: "center"
    },
    disabled
  };

  const handleInput = (input, callback) => {
    const { value } = input.target;
    if (!input.target.checkValidity()) return;
    callback(value);
  };

  return (
    <center>
      <Grid
        container
        spacing={0}>
        <Grid size={4}>
          <Typography
            variant="caption"
            component={"p"}
            sx={{
              fontSize: 10
            }}>
            Hours
          </Typography>
          <input
            value={hours}
            onChange={(e) => {
              handleInput(e, setHours, 1);
            }}
            {...commonProperties}
            max={10}
          />
        </Grid>
        <Grid size={4}>
          <Typography
            variant="caption"
            component={"p"}
            sx={{
              fontSize: 10
            }}>
            Mins
          </Typography>
          <input
            value={minutes}
            onChange={(e) => {
              handleInput(e, setMinutes, 2);
            }}
            {...commonProperties}
          />
        </Grid>
        <Grid size={4}>
          <Typography
            variant="caption"
            component={"p"}
            sx={{
              fontSize: 10
            }}>
            Secs
          </Typography>
          <input
            value={seconds}
            onChange={(e) => {
              handleInput(e, setSeconds, null);
            }}
            {...commonProperties}
          />
        </Grid>
      </Grid>
    </center>
  );
};
export default TimeInput;
