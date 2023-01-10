import { DeleteResourceDialogProps } from "../Types";
import Dialog from "@mui/material/Dialog";
import Header from "@mui/material/DialogTitle";
import Content from "@mui/material/DialogContent";
import Actions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const DeleteResourceDialog = ({
  resourceTitle,
  index,
  // open,
  // openHandler,
  confirmDelete,
}: DeleteResourceDialogProps) => {
  const decide = async (ok: boolean) => {
    // openHandler({
    //   deleteResourceDialog: false,
    //   resourceDialog: true,
    //   eventDialog: false,
    //   deleteEventDialog: false
    // });
    if (ok && index) confirmDelete(index);
  };
  // const deleteEntity = async () => {
  //   if (type === "event") {
  //     await eventsDB.events.delete(entity.id);
  //     let calendarApi = calendarRef.current?.getApi();
  //     calendarApi?.getEventById(entity.id)?.remove();
  //   } else if (type === "resource") {
  //     let events = await eventsDB.events
  //       .where("resourceId")
  //       .equals(entity.id)
  //       .toArray();
  //     for (let ev in events) {
  //       await eventsDB.events.delete(events[ev].id);
  //     }
  //     await resourceDB.resources.delete(entity.id);
  //     calendarRef.current?.getApi().getResourceById(entity.id)?.remove();
  //   }
  // };

  return (
    // <Dialog fullWidth open={open.deleteResourceDialog} onClose={() => decide(false)}>
    //   <Header>{`Delete Resource`}</Header>
    //   <Content>
    //     <div>{`Are you sure you want to delete ${resourceTitle}?`}</div>
    //   </Content>
    //   <Actions>
    //     <Button variant="text" color="inherit" onClick={() => decide(false)}>
    //       Cancel
    //     </Button>
    //     <Button variant="contained" color="error" onClick={() => decide(true)}>
    //       Delete
    //     </Button>
    //   </Actions>
    // </Dialog>
    <></>
  );
};

export default DeleteResourceDialog;
