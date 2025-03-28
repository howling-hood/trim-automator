import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { store } from "../../utils/storage";
import { DAVINCI_LABELS, ROUTES, SETTINGS } from "../../utils/configs";
import ShortcutInput from "../../components/ShortcutInput";

const SettingsPage = () => {
  const [threshold, setThreshold] = useState(SETTINGS.threshold);
  const [davinci, setDavinci] = useState(SETTINGS.davinci);
  const [processing, setProcessing] = useState(false);
  const [listen, setListener] = useState("");

  const handleSubmit = () => {
    const dv = Object.values(davinci);
    if (dv.length !== Object.keys(DAVINCI_LABELS).length || dv.filter((davinciItem) => davinciItem === "").length) {
      alert("Please fill in all shortcuts");
      return;
    }
    const settings = {
      threshold,
      davinci
    };
    store(ROUTES.settings, settings);
    // send to the backend to save the config locally
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
            setListener(davinciItem[0]);
          }}
        />
      ))}
      <Typography
        color="info"
        variant="caption">
        Do not use shortcuts with Enter or fn key in them.
        <br /> mostly try to setup the above shortcuts with the space,shift,ctrl, alt + alphanumeric keys
      </Typography>
      <Button
        disabled={processing}
        variant="contained"
        fullWidth
        onClick={handleSubmit}>
        Update Settings
      </Button>
      <ShortcutInput
        isOpen={listen !== ""}
        onSubmit={(key) => {
          setDavinci((dav) => ({ ...dav, [listen]: key }));
          setListener("");
        }}
      />
    </Stack>
  );
};
export default SettingsPage;
