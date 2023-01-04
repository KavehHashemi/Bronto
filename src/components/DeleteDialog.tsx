import { useState, useEffect } from "react";
import { DeleteDialogProps } from "../Types";
import Dialog from "@mui/material/Dialog";
import Header from "@mui/material/DialogTitle";
import Content from "@mui/material/DialogContent";
import Actions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const DeleteDialog = ({
  open,
  openHandler,
  confirmDelete,
}: DeleteDialogProps) => {
  const decide = (ok: boolean) => {
    openHandler("deleteDialog", false);
    if (ok) confirmDelete();
  };

  return (
    <Dialog fullWidth open={open.deleteDialog} onClose={() => decide(false)}>
      <Header>Delete Event</Header>
      <Content>
        <div>{`Are you sure you want to delete this event? ${open.deleteDialog}`}</div>
      </Content>
      <Actions>
        <Button variant="text" color="inherit" onClick={() => decide(false)}>
          cancel
        </Button>
        <Button variant="contained" color="error" onClick={() => decide(true)}>
          Delete
        </Button>
      </Actions>
    </Dialog>
  );
};

export default DeleteDialog;
