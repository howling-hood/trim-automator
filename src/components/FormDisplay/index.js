/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { retrieve } from "../../utils/storage";
import { Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from "@mui/material";
import LoadingCircle from "../LoadingCircle";

const FormDisplay = ({ setIsProcessing }) => {
  const [selectedTab, setSelectedTab] = useState("");
  const [times, setTimes] = useState([]);
  const [processes, setProcesses] = useState({
    cut: true,
    remove: true,
    queue: true,
    render: true
  });
  const [loading, setLoading] = useState(true);

  const setupSection = async () => {
    const selection = await retrieve("TimestampPage/selected");
    setSelectedTab(selection);
    setTimes(await retrieve(selection + "/data"));
    setLoading(false);
  };

  useEffect(() => {
    setupSection();
  }, []);

  const handleSubmit = async () => {
    setIsProcessing(true);
    window.processor.initiate(times, processes);
  };

  return loading ? (
    <LoadingCircle />
  ) : (
    <Stack spacing={2}>
      <Typography
        variant="h6"
        color="info">
        Set the process to run on for the `{selectedTab}` Timestamps
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={processes["cut"]}
              onChange={(e) => setProcesses({ ...processes, ["cut"]: e.target.checked })}
            />
          }
          label="Blade Cut timecodes"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={processes["remove"]}
              onChange={(e) => setProcesses({ ...processes, ["remove"]: e.target.checked })}
            />
          }
          label="Remove Unwanted clips"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={processes["queue"]}
              onChange={(e) => setProcesses({ ...processes, ["queue"]: e.target.checked })}
            />
          }
          label="Add to queue"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={processes["render"]}
              onChange={(e) => setProcesses({ ...processes, ["render"]: e.target.checked })}
            />
          }
          label="Start Render Process"
        />
      </FormGroup>
      <br />
      <Button
        variant="contained"
        onClick={handleSubmit}>
        Begin Process
      </Button>
    </Stack>
  );
};

export default FormDisplay;
