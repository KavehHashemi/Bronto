import { useState, useEffect } from "react";
import { ResourceDialogProps } from "../Types";
import "./EventDialog.css";
import { addResource } from "../FCWrapper";
import Dialog from "@mui/material/Dialog";
import Header from "@mui/material/DialogTitle";
import Content from "@mui/material/DialogContent";
import Actions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

const Resourcedialog = ({
  open,
  openHandler,
  calendarRef,
}: ResourceDialogProps) => {
  const resourcesArray = calendarRef.current?.getApi().getResources();
  console.log(resourcesArray);

  const [resourceName, setResourceName] = useState<string>("");

  const decide = async (ok: boolean) => {
    if (resourceName !== "") {
      if (ok) addResource(resourceName, calendarRef.current?.getApi());
    }
    openHandler("resourceDialog", false);
    setResourceName("");
  };
  return (
    <Dialog fullWidth open={open.resourceDialog} onClose={() => decide(false)}>
      <Header>Add a new resource</Header>
      <Content className="content-container">
        <InputLabel className="labels">Title</InputLabel>
        <TextField
          className="fields"
          variant="outlined"
          size="small"
          placeholder="Resource Title"
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
        ></TextField>
      </Content>
      <Actions>
        <Button variant="text" color="inherit" onClick={() => decide(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => decide(true)}
        >
          Add
        </Button>
      </Actions>
    </Dialog>
  );
};

export default Resourcedialog;
