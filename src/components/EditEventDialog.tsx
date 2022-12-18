import React from "react";
import Dialog from "@mui/material/Dialog";
import Header from "@mui/material/DialogTitle";
import Content from "@mui/material/DialogContent";
import Actions from "@mui/material/DialogActions";
import { editDialofProps } from "../Types";

const EditEventDialog = ({ open, openHandler, event }: editDialofProps) => {
  return (
    <Dialog open={open} onClose={() => openHandler("event", false)}>
      <Header>Event</Header>
      <Content>Content</Content>
      <Actions>Actions</Actions>
    </Dialog>
  );
};

export default EditEventDialog;
