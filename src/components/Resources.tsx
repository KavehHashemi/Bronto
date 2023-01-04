import { useState, useEffect } from "react";
import { ResourceDialogProps, Resource } from "../Types";
import "./Resources.css";
import { addResource } from "../FCWrapper";
import Dialog from "@mui/material/Dialog";
import Header from "@mui/material/DialogTitle";
import Content from "@mui/material/DialogContent";
import Actions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import ResourceComponent from "./ResourceComponent";

const Resources = ({
  open,
  openHandler,
  array,
  calendarRef,
}: ResourceDialogProps) => {
  const [resourcesArray, setResourcesArray] = useState<Resource[]>(array);
  useEffect(() => {
    setResourcesArray(array);
  }, [array, calendarRef]);

  const resourceElements: JSX.Element[] = [];
  if (resourcesArray)
    for (let i = 0; i < resourcesArray.length; i++) {
      resourceElements.push(
        <ResourceComponent
          key={resourcesArray[i].id}
          resource={resourcesArray[i]}
          calendarRef={calendarRef}
        ></ResourceComponent>
      );
    }

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
      <Header>Resources</Header>
      <Content className="content-container">
        {resourceElements}
        <>
          <InputLabel className="labels">Add a new resource</InputLabel>
          <TextField
            className="fields"
            variant="outlined"
            size="small"
            placeholder="Resource Title"
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value)}
          ></TextField>
        </>
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
          Save
        </Button>
      </Actions>
    </Dialog>
  );
};

export default Resources;
