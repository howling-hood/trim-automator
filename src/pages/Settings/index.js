import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { retrieve, store } from "../../utils/storage";
import { DAVINCI_LABELS, ROUTES, SETTINGS } from "../../utils/configs";
import ShortcutInput from "../../components/ShortcutInput";
import LoadingCircle from "../../components/LoadingCircle";

const SettingsPage = () => {
  const [threshold, setThreshold] = useState(0);
  const [davinci, setDavinci] = useState({});
  const [listen, setListener] = useState("");
  const [loading, setLoading] = useState(true);

  const setupPage = async () => {
    const settings = (await retrieve(ROUTES.settings)) || SETTINGS;
    setThreshold(settings.threshold);
    setDavinci(settings.davinci);
    setLoading(false);
  };

  useEffect(() => {
    setupPage();
  }, []);

  const handleSubmit = () => {
    const dv = Object.values(davinci);
    if (dv.length !== Object.keys(DAVINCI_LABELS).length || dv.filter((davinciItem) => davinciItem === "").length) {
      alert("Please fill in all shortcuts");
      return;
    }
    store(ROUTES.settings, {
      threshold,
      davinci
    });
  };

  return loading ? (
    <LoadingCircle />
  ) : (
    <Stack spacing={2}>
      <Typography
        variant="h5"
        color="info">
        Settings
      </Typography>
      <TextField
        label="Difference threshold in secs"
        variant="filled"
        value={threshold}
        onChange={(e) => {
          const thres = Math.abs(parseInt(e.target.value) || 0);
          setThreshold(thres);
        }}
      />
      {Object.entries(DAVINCI_LABELS).map(([id, label]) => (
        <TextField
          key={id}
          label={label}
          variant="filled"
          value={davinci[id]}
          onClick={() => {
            setListener(id);
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
