/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "../style/ResourcesDialog.css";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import ColorIcon from "@mui/icons-material/Circle"
import IconButton from "@mui/material/IconButton";
import Popover from '@mui/material/Popover';
import { HexColorPicker } from "react-colorful";
import { ContentType, ResourceType, SingleResourceComponentProps } from "../Types";
import ConfirmationDialog from "./ConfirmationDialog";
import { deleteResource, editResource } from "../FCWrapper";
import { useDelete } from "../Hooks";

const SingleResourceComponent = ({ resource, calendarRef }: SingleResourceComponentProps) => {
    const [edited, setEdited] = useState<boolean>(false)
    const [singleResource, setSingleResource] = useState<ResourceType | null>(null)

    const [color, setColor] = useState<string>(resource.eventColor);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        setSingleResource(resource)
    }, [resource])

    useEffect(() => {
        if (singleResource)
            setColor(singleResource?.eventColor)
    }, [singleResource])

    useEffect(() => {
        if (singleResource)
            setSingleResource({ ...singleResource, eventColor: color })
    }, [color])

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
                <IconButton onClick={handleClick}>
                    <ColorIcon sx={{ color: color }}></ColorIcon>
                </IconButton>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                >
                    <div style={{ display: "flex", overflow: "hidden" }}>
                        <HexColorPicker style={{ borderRadius: "4px" }} color={color} onChange={(e) => { setColor(e); setEdited(true) }} />
                    </div>
                </Popover>
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