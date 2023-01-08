import { useState, useEffect } from "react";
import { ResourceDialogProps, Resource } from "../Types";
import "../style/ResourcesDialog.css";
import CloseIcon from "@mui/icons-material/Close";
import { addResource, getResourceFromResourceApi } from "../FCWrapper";
import Dialog from "@mui/material/Dialog";
import Header from "@mui/material/DialogTitle";
import Content from "@mui/material/DialogContent";
import Actions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import ResourceComponent from "./ResourceComponent";

const ResourcesDialog = ({
  open,
  openHandler,
  array,
  calendarRef,
}: ResourceDialogProps) => {
  const [resourcesArray, setResourcesArray] = useState<Resource[]>(array);
  const resourceElements: JSX.Element[] = [];

  useEffect(() => {
    setResourcesArray(array);
  }, [array, calendarRef]);

  if (resourcesArray)
    for (let i = 0; i < resourcesArray.length; i++) {
      resourceElements.push(
        <ResourceComponent
          key={resourcesArray[i].id}
          open={open}
          openHandler={openHandler}
          resource={resourcesArray[i]}
          calendarRef={calendarRef}
        ></ResourceComponent>
      );
    }

  useEffect(() => {
    console.log(resourcesArray);
  }, [resourcesArray]);

  const [resourceName, setResourceName] = useState<string>("");
  const decide = async (ok: boolean) => {
    if (resourceName !== "") {
      if (ok) {
        await addResource(resourceName, calendarRef.current?.getApi());
        setResourcesArray(
          getResourceFromResourceApi(calendarRef.current?.getApi())
        );
        setResourceName("");
      }
    }
    if (!ok)
      openHandler({
        resourceDialog: false,
        eventDialog: false,
        deleteDialog: false,
      });
  };
  return (
    <Dialog
      fullWidth
      open={open.resourceDialog}
      onClose={() =>
        openHandler({
          resourceDialog: false,
          eventDialog: false,
          deleteDialog: false,
        })
      }
    >
      <Header className="header-container">
        <div>Resources</div>
        <div>
          <CloseIcon
            sx={{ cursor: "pointer" }}
            onClick={() =>
              openHandler({
                resourceDialog: false,
                eventDialog: false,
                deleteDialog: false,
              })
            }
          ></CloseIcon>
        </div>
      </Header>
      <Content className="content-container">
        <InputLabel className="labels">Existing resource</InputLabel>
        {resourceElements}
        <InputLabel className="labels">Add a new resource</InputLabel>
        <div className="existing-fields">
          <TextField
            className="fields"
            variant="outlined"
            size="small"
            placeholder="Resource Title"
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value)}
          ></TextField>
          <div className="buttons">
            <Button variant="text" color="primary" onClick={() => decide(true)}>
              Add
            </Button>
          </div>
        </div>
      </Content>
      <Actions>
        {/* <Button variant="text" color="inherit" onClick={() => decide(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => decide(true)}
        >
          Save
        </Button> */}
      </Actions>
    </Dialog>
  );
};

export default ResourcesDialog;
