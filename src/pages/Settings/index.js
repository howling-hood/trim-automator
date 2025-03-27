import { Button, FormGroup, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { store } from "../../utils/storage";
import { DAVINCI_LABELS, SETTINGS } from "../../utils/configs";

const SettingsPage = () => {
  const [settings, setSettings] = useState(SETTINGS);
  const [threshold, setThreshold] = useState(SETTINGS.threshold);
  const [davinci, setDavinci] = useState(SETTINGS.davinci);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = () => {
    store("Settings", settings);
  };

  const handleShortcut = (keyToChange) => {
    // TO DO
    // ask the user for a keyboard shortcut input here and store the value in the below state set call
    setDavinci((dav) => ({ ...dav, [keyToChange]: "" }));
  };

  return (
    <Stack spacing={2}>
      <Typography
        variant="h5"
        color="info">
        Settings
      </Typography>
      <TextField
        disabled={processing}
        label="Difference threshold in secs"
        variant="filled"
        value={threshold}
        onChange={(e) => {
          const thres = Math.abs(parseInt(e.target.value) || 0);
          setThreshold(thres);
        }}
      />
      {Object.entries(davinci).map((davinciItem) => (
        <TextField
          key={davinciItem[0]}
          disabled={processing}
          label={DAVINCI_LABELS[davinciItem[0]]}
          variant="filled"
          value={davinciItem[1]}
          onClick={() => {
            handleShortcut(davinciItem[0]);
          }}
        />
      ))}
      <Button
        disabled={processing}
        variant="contained"
        fullWidth
        onClick={handleSubmit}>
        Update Settings
      </Button>
    </Stack>
  );
};
export default SettingsPage;
