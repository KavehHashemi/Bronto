import { useEffect, useState } from "react";
import { Resource, ResourceComponentProps, entityType } from "../Types";
import "../style/ResourcesDialog.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { resourceDB } from "../indexedDb/ResourcesDB";
import { eventsDB } from "../indexedDb/EventsDB";
import DeleteDialog from "./DeleteDialog";

const ResourceComponent = ({
  resource,
  calendarRef,
  open,
  openHandler,
}: ResourceComponentProps) => {
  const [singleResource, setSingleResource] = useState<Resource | null>(
    resource
  );

  // useEffect(() => {
  //   setSingleResource(resource);
  // }, [resource]);

  const editResource = async () => {
    if (singleResource) {
      let calendarApi = calendarRef.current?.getApi();
      await resourceDB.resources.update(singleResource.id, singleResource);
      calendarApi?.getResourceById(singleResource.id)?.remove();
      calendarApi?.addResource(singleResource);
    }
  };

  // const deleteResource = async (id: string) => {
  //   if (singleResource) {
  //     let events = await eventsDB.events
  //       .where("resourceId")
  //       .equals(id)
  //       .toArray();
  //     console.log(events);
  //     for (let ev in events) {
  //       await eventsDB.events.delete(events[ev].id);
  //     }
  //     await resourceDB.resources.delete(id);
  //     calendarRef.current?.getApi().getResourceById(id)?.remove();
  //     setSingleResource(null);
  //   }
  // };

  if (singleResource)
    return (
      <div className="existing-fields" key={singleResource?.id}>
        <div className="input-fields">
          <TextField
            className="fields"
            variant="outlined"
            size="small"
            placeholder="Resource Title"
            value={singleResource?.title}
            onChange={(e) => {
              if (singleResource)
                setSingleResource({ ...singleResource, title: e.target.value });
            }}
          ></TextField>
        </div>
        <div className="buttons">
          <Button variant="text" color="info" onClick={editResource}>
            Edit
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={() => {
              openHandler({
                deleteDialog: true,
                resourceDialog: true,
                eventDialog: false,
              });
            }}
          >
            Delete
          </Button>
        </div>
        <DeleteDialog
          type={entityType.resource}
          entity={singleResource}
          open={open}
          openHandler={openHandler}
          calendarRef={calendarRef}
          //confirmDelete={(id) => deleteResource(id)}
        ></DeleteDialog>
      </div>
    );
  else {
    return null;
  }
};

export default ResourceComponent;
