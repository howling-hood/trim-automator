/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Cancel } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import { getSecsFromHMS, timeReduction } from "../../utils/time";

const TimestampModal = ({ isOpen, setOpen, onSubmit }) => {
  const [timestamps, setTimestampList] = useState("");
  const [errorText, setErrorText] = useState(null);

  const handleSubmit = () => {
    if (Boolean(timestamps.trim() === "")) {
      setErrorText("details needed");
      return;
    }
    let times = [];
    let entry = timestamps.split("\n");
    let validTimeStrings = entry
      .filter((item) => item.includes(":") && item.includes(":"))
      .map((item) => item.split("-"));
    for (let time of validTimeStrings) {
      let start = time[0].split(":");
      if (start.length === 2) {
        start = ["00", ...start];
      }
      let end = time[1].split(":");
      if (end.length === 2) {
        end = ["00", ...end];
      }
      times.push([getSecsFromHMS(...start), getSecsFromHMS(...end)]);
    }
    onSubmit(timeReduction(times));
    setOpen(false);
    setErrorText(null);
    setTimestampList("");
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle sx={{ display: "flex" }}>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1 }}>
          Convert Jira Timestamps
        </Typography>
        <IconButton
          color="error"
          onClick={() => {
            setOpen(false);
          }}>
          <Cancel />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack>
          <TextField
            multiline
            autoFocus
            required
            rows={4}
            fullWidth
            label="Paste in Jira timestamp"
            variant="filled"
            value={timestamps}
            onChange={(e) => {
              setErrorText(null);
              setTimestampList(e.target.value);
            }}
            error={Boolean(errorText)}
            helperText={errorText}
          />
          <br />
          <Button
            size="small"
            variant="contained"
            onClick={handleSubmit}>
            Convert
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default TimestampModal;
