/* eslint-disable react/prop-types */
import { ArrowForward } from "@mui/icons-material";
import { Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { retrieve, store } from "../../utils/storage";
import { calculateTotalDuration, timeReduction } from "../../utils/time";
import TimeEntry from "../TimeEntry";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/configs";
import LoadingCircle from "../LoadingCircle";

const TimeDetails = ({ selected, pageKey }) => {
  const sectionKey = pageKey + "/data";
  const [data, setData] = useState([]);
  const [displayDuration, setDisplayDuration] = useState("00:00:00");
  const [loading, setLoading] = useState(false);

  const setupSection = async () => {
    const data = (await retrieve(sectionKey)) || [];
    setData(data);
    setDisplayDuration(calculateTotalDuration(data));
    setLoading(false);
  };

  useEffect(() => {
    setupSection();
  }, []);

  const onDataUpdate = (newData) => {
    store(sectionKey, newData);
    setDisplayDuration(calculateTotalDuration(newData));
    window.location.reload();
  };

  const handleAdd = (values) => {
    setLoading(true);
    setData((newData) => {
      const filteredList = timeReduction([...newData, values]);
      onDataUpdate(filteredList);
      return filteredList;
    });
    setLoading(false);
  };

  const handleDelete = (index) => {
    setLoading(true);
    setData((newData) => {
      const filteredList = newData.filter((e, i) => i !== index);
      onDataUpdate(filteredList);
      return filteredList;
    });
    setLoading(false);
  };

  return loading && selected ? (
    <LoadingCircle />
  ) : (
    <div
      style={{ width: "100%" }}
      role="tabpanel"
      hidden={!selected}>
      <Stack spacing={2}>
        <br />
        <div>
          <Grid
            container
            size={12}>
            <Grid size={7}>
              <Typography
                variant="h5"
                component={"center"}
                color="primary">
                Total Duration:: {displayDuration}
              </Typography>
            </Grid>
            <Grid size={5}>
              <Link to={ROUTES.davinci}>
                <center>
                  <Button
                    variant="contained"
                    color="info"
                    size="small">
                    Use Timestamps
                    <ArrowForward />
                  </Button>
                </center>
              </Link>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container>
            <Grid size={5}>
              <Typography
                variant="body"
                component={"center"}>
                Start Times
              </Typography>
            </Grid>
            <Grid size={5}>
              <Typography
                variant="body"
                component={"center"}>
                End Times
              </Typography>
            </Grid>
            <Grid size={2}>
              <Typography
                variant="body"
                component={"center"}
                color="secondary">
                Action
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            overflow: "hidden",
            overflowY: "auto",
            maxHeight: "55vh",
            height: "50vh"
          }}>
          <TimeEntry
            handleChange={handleAdd}
            disabled={false}
            data={[0, 0]}
          />
          {data.map((item, index) => (
            <TimeEntry
              handleChange={() => handleDelete(index)}
              disabled={true}
              key={index}
              index={index}
              data={item}
            />
          ))}
        </div>
      </Stack>
    </div>
  );
};
export default TimeDetails;
