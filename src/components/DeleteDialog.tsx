import { DeleteDialogProps } from "../Types";
import Dialog from "@mui/material/Dialog";
import Header from "@mui/material/DialogTitle";
import Content from "@mui/material/DialogContent";
import Actions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { resourceDB } from "../indexedDb/ResourcesDB";
import { eventsDB } from "../indexedDb/EventsDB";
import { useEffect, useState } from "react";

const DeleteDialog = ({
  type,
  entity,
  open,
  calendarRef,
  openHandler,
}: //confirmDelete,
DeleteDialogProps) => {
  const decide = async (ok: boolean) => {
    openHandler({
      deleteDialog: false,
      eventDialog: type === "event" ? (ok ? false : true) : false,
      resourceDialog: type === "resource" ? true : false,
    });
    if (ok) deleteEntity();
  };
  const deleteEntity = async () => {
    if (type === "event") {
      await eventsDB.events.delete(entity.id);
      let calendarApi = calendarRef.current?.getApi();
      calendarApi?.getEventById(entity.id)?.remove();
    } else if (type === "resource") {
      let events = await eventsDB.events
        .where("resourceId")
        .equals(entity.id)
        .toArray();
      for (let ev in events) {
        await eventsDB.events.delete(events[ev].id);
      }
      await resourceDB.resources.delete(entity.id);
      calendarRef.current?.getApi().getResourceById(entity.id)?.remove();
    }
  };

  return (
    <Dialog fullWidth open={open.deleteDialog} onClose={() => decide(false)}>
      <Header>{`Delete ${type}`}</Header>
      <Content>
        <div>{`Are you sure you want to delete ${entity.title}?`}</div>
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
