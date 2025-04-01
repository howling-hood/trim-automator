/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { retrieve } from "../../utils/storage";
import { Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from "@mui/material";
import { beginProcess } from "../../utils/processing";
import LoadingCircle from "../LoadingCircle";

const checklist = [
  "Do the shortcuts in Davinci Resolve and this app match?",
  "Is Davinci Resolve open and maximised?",
  "Is the Correct timeline loaded in?",
  "Did you select Davinci Resolve before coming to this app?",
  "If this process was stopped did you undo all the changes?"
];

const FormDisplay = ({ setIsProcessing }) => {
  const [selectedTab, setSelectedTab] = useState("");
  const [times, setTimes] = useState([]);
  const [total, setTotal] = useState(0);
  const [id, setId] = useState("");
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

  const handleSubmit = () => {
    // send backend the times and set processing to true
    beginProcess(times, id);
    setIsProcessing(true);
  };

  return loading ? (
    <LoadingCircle />
  ) : (
    <Stack spacing={2}>
      <Typography
        variant="h6"
        color="info">
        Checklist before using the `{selectedTab}` Timestamps
      </Typography>
      <FormGroup>
        {checklist.map((item) => (
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setTotal((t) => (e.target.checked ? ++t : --t));
                }}
              />
            }
            key={item}
            label={item}
          />
        ))}
      </FormGroup>
      <br />
      <TextField
        label="Jira ticket id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <br />
      <Button
        disabled={total !== checklist.length}
        variant="contained"
        onClick={handleSubmit}>
        Begin Process
      </Button>
    </Stack>
  );
};

export default FormDisplay;
