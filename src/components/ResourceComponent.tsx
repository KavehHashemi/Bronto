import { useState } from "react";
import { Resource, ResourceComponentProps } from "../Types";
import "./Resources.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { resourceDB } from "../indexedDb/ResourcesDB";

const ResourceComponent = ({
  resource,
  calendarRef,
}: ResourceComponentProps) => {
  const [singleResource, setSingleResource] = useState<Resource | null>(
    resource
  );

  const editResource = async () => {
    if (singleResource) {
      let calendarApi = calendarRef.current?.getApi();
      await resourceDB.resources.update(singleResource.id, singleResource);
      calendarApi?.getResourceById(singleResource.id)?.remove();
      calendarApi?.addResource(singleResource);
    }
  };

  const deleteResource = async () => {
    if (singleResource) {
      await resourceDB.resources.delete(singleResource.id);
      calendarRef.current
        ?.getApi()
        .getResourceById(singleResource.id)
        ?.remove();
      setSingleResource(null);
    }
  };
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
            Save
          </Button>
          <Button variant="text" color="error" onClick={deleteResource}>
            Delete
          </Button>
        </div>
      </div>
    );
  else {
    return null;
  }
};

export default ResourceComponent;
