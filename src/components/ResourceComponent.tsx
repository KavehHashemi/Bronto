import { useState, useEffect } from "react";
import { ResourceDialogProps, ResourceType } from "../Types";
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
import ResourceListComponent from "./ResourceListComponent";
import FullCalendar from "@fullcalendar/react";
type props = {
    calendarRef: React.RefObject<FullCalendar>;
}
const ResourceComponent = ({ calendarRef }: props) => {
    const [array, setArray] = useState<ResourceType[]>(
        getResourceFromResourceApi(calendarRef.current?.getApi())
    );

    useEffect(() => {
        setArray(getResourceFromResourceApi(calendarRef.current?.getApi()));
    }, [calendarRef]);
    const [resourceName, setResourceName] = useState<string>("");
    const decide = async (ok: boolean) => {
        if (resourceName !== "") {
            if (ok) {
                await addResource(resourceName, calendarRef.current?.getApi());
                setArray(getResourceFromResourceApi(calendarRef.current?.getApi()));
                setResourceName("");
            }
        }

    };
    return (
        <>
            <Header className="header-container">
                <div>Resources</div>
                <div>
                    <CloseIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => { }}
                    ></CloseIcon>
                </div>
            </Header>
            <Content className="content-container">
                <InputLabel className="labels">Existing resource</InputLabel>
                <ResourceListComponent
                    resources={array}
                    calendarRef={calendarRef}
                ></ResourceListComponent>
                {/* {resourceElements} */}
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
        </>
    )
}

export default ResourceComponent