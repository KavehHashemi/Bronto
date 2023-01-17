/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "../style/ResourcesDialog.css";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import IconButton from "@mui/material/IconButton";
import { ContentType, ResourceType, SingleResourceComponentProps } from "../Types";
import { resourceDB } from "../indexedDb/ResourcesDB";
import { eventsDB } from "../indexedDb/EventsDB";
import ConfirmationDialog from "./ConfirmationDialog";
import { useDelete } from "../Hooks";

const SingleResourceComponent = ({ resource, calendarRef }: SingleResourceComponentProps) => {
    const [edited, setEdited] = useState<boolean>(false)
    const [singleResource, setSingleResource] = useState<ResourceType | null>(null)
    useEffect(() => {
        setSingleResource(resource)
    }, [resource])

    const editResource = async () => {
        if (singleResource) {
            let calendarApi = calendarRef.current?.getApi();
            await resourceDB.resources.update(
                singleResource.id,
                singleResource
            );
            calendarApi?.getResourceById(singleResource.id)?.remove();
            calendarApi?.addResource(singleResource);
            setEdited(false)
        }
    };

    const deleteResource = async () => {
        if (singleResource) {
            let events = await eventsDB.events
                .where("resourceId")
                .equals(singleResource.id)
                .toArray();
            for (let ev in events) {
                await eventsDB.events.delete(events[ev].id);
            }
            await resourceDB.resources.delete(singleResource.id);
            calendarRef.current
                ?.getApi()
                .getResourceById(singleResource.id)
                ?.remove();
            setSingleResource(null);
        }
    };

    const deleteDialog = useDelete(deleteResource)

    if (!singleResource) return null
    return (
        <div className="existing-fields">
            <div className="input-fields">
                <TextField
                    className="fields"
                    variant="outlined"
                    size="small"
                    placeholder="Resource Title"
                    value={singleResource.title}
                    onChange={(e) => {
                        setSingleResource({ ...singleResource, title: e.target.value })
                        setEdited(true)
                    }}
                ></TextField>
            </div>
            <div className="buttons">
                <IconButton disabled={!edited} color="info" onClick={editResource}>
                    <SaveIcon></SaveIcon>
                </IconButton>
                <IconButton color="error" onClick={deleteDialog.deleteHandler}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </div>
            <ConfirmationDialog open={deleteDialog.open} openHandler={deleteDialog.openHandler} confirmation={deleteDialog.okHandler} title={singleResource.title} type={ContentType.resource}></ConfirmationDialog>
        </div >
    )
}

export default SingleResourceComponent