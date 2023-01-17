/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "../style/ResourcesDialog.css";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import IconButton from "@mui/material/IconButton";
import { ContentType, ResourceType, SingleResourceComponentProps } from "../Types";
import ConfirmationDialog from "./ConfirmationDialog";
import { deleteResource, editResource } from "../FCWrapper";
import { useDelete } from "../Hooks";

const SingleResourceComponent = ({ resource, calendarRef }: SingleResourceComponentProps) => {
    const [edited, setEdited] = useState<boolean>(false)
    const [singleResource, setSingleResource] = useState<ResourceType | null>(null)
    useEffect(() => {
        setSingleResource(resource)
    }, [resource])

    const changeResource = async () => {
        if (singleResource && calendarRef.current?.getApi()) {
            editResource(singleResource, calendarRef.current?.getApi())
            setEdited(false)
        }
    };

    const removeResource = async () => {
        if (singleResource && calendarRef.current?.getApi())
            deleteResource(singleResource, calendarRef.current?.getApi())
        setSingleResource(null);
    }

    const deleteDialog = useDelete(removeResource)

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
                <IconButton disabled={!edited} color="info" onClick={changeResource}>
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