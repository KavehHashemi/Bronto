import { useState, useEffect } from "react";
import { ResourceType, ResourceComponentProps } from "../Types";
import "../style/ResourcesDialog.css";
import CloseIcon from "@mui/icons-material/Close";
import { addResource, getResourceFromResourceApi } from "../FCWrapper";
import Dialog from "@mui/material/Dialog";
import Header from "@mui/material/DialogTitle";
import Content from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import ResourceListComponent from "./ResourceListComponent";

const ResourceComponent = ({ calendarRef, open, openHandler }: ResourceComponentProps) => {
    const [array, setArray] = useState<ResourceType[]>(
        getResourceFromResourceApi(calendarRef.current?.getApi())
    );

    useEffect(() => {
        setArray(getResourceFromResourceApi(calendarRef.current?.getApi()));
    }, [calendarRef]);

    useEffect(() => {
        array.sort((a, b) => {
            return a.createdAt - b.createdAt;
        });
    }, [array])

    const [resourceName, setResourceName] = useState<string>("");
    const addNewResource = async () => {
        if (resourceName !== "") {
            await addResource(resourceName, calendarRef.current?.getApi());
            setArray(getResourceFromResourceApi(calendarRef.current?.getApi()));
            setResourceName("");
        }

    };
    return (
        <Dialog fullWidth open={open} onClose={openHandler}>
            <Header className="header-container">
                <div>Resources</div>
                <div>
                    <CloseIcon
                        sx={{ cursor: "pointer" }}
                        onClick={openHandler}
                    ></CloseIcon>
                </div>
            </Header>
            <Content className="content-container">
                <InputLabel className="labels">Existing resource</InputLabel>
                <ResourceListComponent
                    resources={array}
                    calendarRef={calendarRef}
                ></ResourceListComponent>
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
                        <Button variant="text" color="primary" onClick={addNewResource}>
                            Add
                        </Button>
                    </div>
                </div>
            </Content>
        </Dialog>
    )
}

export default ResourceComponent