/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { retrieve } from "../../utils/storage";
import { Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from "@mui/material";

const checklist = [
  "Do the shortcuts in Davinci Resolve and this app match?",
  "Is Davinci Resolve open and maximised?",
  "Is the Correct timeline loaded in?",
  "Did you select Davinci Resolve before coming to this app?",
  "If this process was stopped did you undo all the changes?"
];

const FormDisplay = ({ setIsProcessing }) => {
  const selectedTab = retrieve("TimestampPage/selected");
  const times = retrieve(selectedTab + "/data");
  const [total, setTotal] = useState(0);
  const [id, setId] = useState("");

  const handleSubmit = () => {
    // send backend the times and set processing to true
    setIsProcessing(true);
  };

  return (
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
