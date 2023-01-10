import { useEffect, useState } from "react";
import { ResourceType, ResourceListComponentProps } from "../Types";
import "../style/ResourcesDialog.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { resourceDB } from "../indexedDb/ResourcesDB";
import { eventsDB } from "../indexedDb/EventsDB";
import DeleteResourceDialog from "./DeleteResourceDialog";

const ResourceListComponent = ({
  // open,
  // openHandler,
  resources,
  calendarRef,
}: ResourceListComponentProps) => {
  const [currentResources, setCurrentResources] =
    useState<ResourceType[]>(resources);

  useEffect(() => {
    setCurrentResources(resources);
  }, [resources]);

  useEffect(() => {
    //setCurrentResources(resources);
  }, [currentResources]);

  const editResource = async (idx: number) => {
    let calendarApi = calendarRef.current?.getApi();
    await resourceDB.resources.update(
      currentResources[idx].id,
      currentResources[idx]
    );
    calendarApi?.getResourceById(currentResources[idx].id)?.remove();
    calendarApi?.addResource(currentResources[idx]);
  };

  const deleteResource = async (idx: number) => {
    let events = await eventsDB.events
      .where("resourceId")
      .equals(currentResources[idx].id)
      .toArray();
    for (let ev in events) {
      await eventsDB.events.delete(events[ev].id);
    }
    await resourceDB.resources.delete(currentResources[idx].id);
    calendarRef.current
      ?.getApi()
      .getResourceById(currentResources[idx].id)
      ?.remove();
    //setResource(null);
  };

  const resourceElements: JSX.Element[] = [];
  for (let i = 0; i < currentResources.length; i++) {
    resourceElements.push(
      <div className="existing-fields" key={currentResources[i].id}>
        <div className="input-fields">
          <TextField
            className="fields"
            variant="outlined"
            size="small"
            placeholder="Resource Title"
            value={currentResources[i].title}
            onChange={(e) => {
              setCurrentResources([
                ...currentResources,
                { ...currentResources[i], title: e.target.value },
              ]);
            }}
          ></TextField>
        </div>
        <div className="buttons">
          <Button variant="text" color="info" onClick={() => editResource(i)}>
            Edit
          </Button>
          <Button
            variant="text"
            color="error"
          // onClick={() => {
          //   openHandler({
          //     eventDialog: false,
          //     deleteEventDialog: false,
          //     resourceDialog: true,
          //     deleteResourceDialog: true
          //   });
          // }}
          >
            Delete
          </Button>
        </div>
        <DeleteResourceDialog
          resourceTitle={currentResources[i].title}
          index={i}
          // open={open}
          // openHandler={openHandler}
          confirmDelete={deleteResource}
        ></DeleteResourceDialog>
      </div>
    );
  }
  return <>{resourceElements}</>;
};

export default ResourceListComponent;
