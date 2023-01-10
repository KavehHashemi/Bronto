import Dialog from "@mui/material/Dialog";
import Header from "@mui/material/DialogTitle";
import Content from "@mui/material/DialogContent";
import Actions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { DeleteEventDialogProps } from "../Types";

const DeleteEventDialog = ({
  open,
  openHandler,
  eventTitle,
  confirmDelete,
}: DeleteEventDialogProps) => {
  const decide = async (ok: boolean) => {
    openHandler({
      deleteEventDialog: false,
      eventDialog: ok ? false : true,
      resourceDialog: false,
      deleteResourceDialog: false
    });
    if (ok) confirmDelete();
  };
  return (
    <Dialog fullWidth open={open.deleteEventDialog} onClose={() => decide(false)}>
      <Header>{`Delete Event`}</Header>
      <Content>
        <div>{`Are you sure you want to delete ${eventTitle}?`}</div>
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

export default DeleteEventDialog;
