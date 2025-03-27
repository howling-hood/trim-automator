import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import { Settings, Info, Home } from "@mui/icons-material";
import { ROUTES } from "../../utils/configs";

const pageAssociations = [
  {
    path: "/",
    title: "Timestamps",
    info: "Put in the timestamps and let us do the magic of merging close timestamps"
  },
  {
    path: "/davinci",
    title: "Davinci Page",
    info: "Automates a bunch of things based on the data given"
  },
  {
    path: "/settings",
    title: "Settings",
    info: "Configure values to help smoothen things"
  }
];

export default function Header() {
  const { pathname } = useLocation();
  const currentPageIndex = pageAssociations.findIndex((p) => p.path === pathname);
  const page = pageAssociations[currentPageIndex];
  const isSettings = pathname === "/settings";

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 7 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Tooltip title={page.info}>
            <IconButton color="inherit">
              <Info />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}>
            {page.title}
          </Typography>
          <Link
            to={isSettings ? ROUTES.timestamps : ROUTES.settings}
            style={{ color: "white", textDecoration: "none" }}>
            <Tooltip title={isSettings ? "Home" : "Settings"}>
              <IconButton color="inherit">{isSettings ? <Home /> : <Settings />}</IconButton>
            </Tooltip>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
