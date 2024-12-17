import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";

export function SwipeableTemporaryDrawer({ isOpen, toggleDrawer }) {
  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
    >
      <div style={{ padding: 20 }}>
        <h1>Drawer is open!</h1>
        <Button
          variant="contained"
          onClick={() => toggleDrawer(false)}
          style={{ marginTop: 20 }}
        >
          Close Sidebar
        </Button>
      </div>
    </SwipeableDrawer>
  );
}
