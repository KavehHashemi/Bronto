import { DeleteDialogProps } from "../Types";
import Dialog from "@mui/material/Dialog";
import Header from "@mui/material/DialogTitle";
import Content from "@mui/material/DialogContent";
import Actions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const DeleteDialog = ({
  type,
  open,
  openHandler,
  confirmDelete,
}: DeleteDialogProps) => {
  const decide = (ok: boolean) => {
    openHandler({
      deleteDialog: false,
      eventDialog: type === "event" ? (ok ? false : true) : false,
      resourceDialog: type === "resource" ? true : false,
    });
    if (ok) confirmDelete();
  };

  return (
    <Dialog fullWidth open={open.deleteDialog} onClose={() => decide(false)}>
      <Header>{`Delete ${type}`}</Header>
      <Content>
        <div>{`Are you sure you want to delete this ${type}?`}</div>
      </Content>
      <Actions>
        <Button variant="text" color="inherit" onClick={() => decide(false)}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={() => decide(true)}>
          Delete
        </Button>
      </Actions>
    </Dialog>
  );
};

export default DeleteDialog;
