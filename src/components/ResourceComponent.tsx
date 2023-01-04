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
        <Button variant="text" color="error" onClick={deleteResource}>
          Delete
        </Button>
      </div>
    );
  else {
    return null;
  }
};

export default ResourceComponent;
