/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { ContentType, Duration, EventType, Operation } from "../Types";
import "../style/EventDialog.css";
import Dialog from "@mui/material/Dialog"
import Header from "@mui/material/DialogTitle";
import Content from "@mui/material/DialogContent";
import Actions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import { calculateEndFromDuration, calculateEventsDuration } from "../Utils";
import { eventsDB } from "../indexedDb/EventsDB";
import { EventComponentProps } from "../Types";
import ConfirmationDialog from "./ConfirmationDialog";
import { operationsDB } from "../indexedDb/OperationsDB";
import { useDelete } from "../Hooks";
import { addEvent, deleteEvent, editEvent } from "../FCWrapper";


const EventComponent = ({ event, calendarRef, isNew, open, openHandler }: EventComponentProps) => {
    const [ops, setOps] = useState<Operation[]>([])
    const [currentEvent, setCurrentEvent] = useState<EventType>(event);
    const [operations, setOperations] = useState<string[]>([]);
    const [duration, setDuration] = useState<Duration>({ hours: 0, minutes: 0 });

    useEffect(() => {
        (async () => {
            setOps(await operationsDB.operations.toArray());
        })()
    }, [calendarRef]);

    const checkOperationAvailability = () => {
        let eventsOps = event.operations
        let validOps = []
        for (let i = 0; i < eventsOps.length; i++) {
            for (let j = 0; j < ops.length; j++) {
                if (eventsOps[i] === ops[j].title) {
                    validOps.push(eventsOps[i])
                }
            }
        }
        return validOps;
    }

    useEffect(() => {
        setCurrentEvent(event);
        setOperations(checkOperationAvailability());
        setDuration(calculateEventsDuration(event));
    }, [ops]);

    useEffect(() => {
        console.log();
    }, [currentEvent])

    useEffect(() => {
        setCurrentEvent({ ...currentEvent, operations: operations });
    }, [operations]);

    useEffect(() => {
        setCurrentEvent({
            ...currentEvent,
            start: new Date(event.start),
            end: calculateEndFromDuration(event, duration),
        });
    }, [duration]);

    const createEvent = async () => {
        if (currentEvent.title !== "" && calendarRef.current?.getApi()) {
            await addEvent(currentEvent, calendarRef.current?.getApi())
            openHandler();
        }
    };

    const changeEvent = async () => {
        if (currentEvent.title !== "" && calendarRef.current?.getApi()) {
            await editEvent(currentEvent, calendarRef.current?.getApi())
            openHandler();
        }
    }

    const cancelEvent = () => {
        setCurrentEvent(event);
        openHandler()
    };

    const removeEvent = async () => {
        if (currentEvent.title !== "" && calendarRef.current?.getApi()) {
            await deleteEvent(currentEvent, calendarRef.current?.getApi())
            openHandler()
        }
    };

    const deleteDialog = useDelete(removeEvent)


    const handleOperationChange = (
        event: SelectChangeEvent<typeof operations>
    ) => {
        const {
            target: { value },
        } = event;
        setOperations(typeof value === "string" ? value.split(",") : value);
    };

    const minutesInputProps = {
        step: 15,
        min: 0,
        max: 45,
    };
    const hoursInputProps = {
        min: 0,
        max: 999,
    };
    return (
        <>
            <Dialog fullWidth open={open} onClose={openHandler}>
                <Header className="event-header">
                    <div>{isNew
                        ? `Add New Event to ${calendarRef.current
                            ?.getApi()
                            .getResourceById(currentEvent?.resourceId)?.title
                        } at ${currentEvent?.start.getHours()}`
                        : `Edit ${currentEvent.title}`}</div>
                    <div>
                        <CloseIcon
                            sx={{ cursor: "pointer" }}
                            onClick={openHandler}
                        ></CloseIcon>
                    </div>
                </Header>
                <Content className="event-container">
                    <InputLabel className="event-labels">Title</InputLabel>
                    <TextField
                        className="event-fields"
                        variant="outlined"
                        size="small"
                        placeholder="Event Title"
                        value={currentEvent.title}
                        onChange={(e) =>
                            setCurrentEvent({ ...currentEvent, title: e.target.value })
                        }
                    ></TextField>
                    <InputLabel className="event-labels">Description</InputLabel>
                    <TextField
                        className="event-fields"
                        variant="outlined"
                        size="small"
                        placeholder="Event Description"
                        value={currentEvent.description}
                        onChange={(e) =>
                            setCurrentEvent({ ...currentEvent, description: e.target.value })
                        }
                    ></TextField>
                    <InputLabel className="event-labels">Operations</InputLabel>
                    <Select
                        multiple
                        className="event-fields"
                        variant="outlined"
                        size="small"
                        value={operations}
                        onChange={handleOperationChange}
                        placeholder="Operations"
                        renderValue={(selected) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {ops.map((op) => (
                            <MenuItem key={op.id} value={op.title}>
                                {op.title}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputLabel className="event-labels">Duration</InputLabel>
                    <div className="event-numberfields">
                        <TextField
                            inputProps={hoursInputProps}
                            type="number"
                            size="small"
                            className="event-numberinputs"
                            value={duration.hours}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checkValidity()) {
                                    setDuration({
                                        ...duration,
                                        hours: e.target.valueAsNumber | 0,
                                    });
                                }
                            }}
                        ></TextField>
                        <div>hours</div>
                        <TextField
                            inputProps={minutesInputProps}
                            type={"number"}
                            size="small"
                            className="event-numberinputs"
                            value={duration.minutes}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checkValidity()) {
                                    setDuration({
                                        ...duration,
                                        minutes: e.target.valueAsNumber | 0,
                                    });
                                }
                            }}
                        ></TextField>
                        <div>minutes</div>
                    </div>
                </Content>
                <Actions className="event-actions">
                    {isNew ? (
                        <div></div>
                    ) : (
                        <div id="delete">
                            <Button
                                color="error"
                                variant="text"
                                onClick={deleteDialog.deleteHandler}
                            >
                                Delete Event
                            </Button>
                        </div>
                    )}
                    <div id="save">
                        <Button color="inherit" variant="text" onClick={cancelEvent}>
                            Cancel
                        </Button>
                        {isNew ? <Button color="primary" variant="contained" onClick={createEvent}>Add
                        </Button> : <Button color="primary" variant="contained" onClick={changeEvent}>Edit
                        </Button>}

                    </div>
                </Actions>
            </Dialog>
            <ConfirmationDialog open={deleteDialog.open} openHandler={deleteDialog.openHandler} confirmation={deleteDialog.okHandler} title={currentEvent.title} type={ContentType.event}></ConfirmationDialog>
        </>
    )
}

export default EventComponent