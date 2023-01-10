import React, { useState, useEffect } from "react";
import { Duration, EventType } from "../Types";
import Data from "../data/sampleData.json";
import "../style/EventDialog.css";

import Header from "@mui/material/DialogTitle";
import Content from "@mui/material/DialogContent";
import Actions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import { calculateEndFromDuration, calculateEventsDuration } from "../Utils";
import { eventsDB } from "../indexedDb/EventsDB";
import FullCalendar from "@fullcalendar/react";
type props = {
    event: EventType
    calendarRef: React.RefObject<FullCalendar>;
    isNew: boolean;
}
const EventComponent = ({ event, calendarRef, isNew }: props) => {

    const ops = Data.operations;
    const [currentEvent, setCurrentEvent] = useState<EventType>(event);
    const [operations, setOperations] = useState<string[]>([]);
    const [duration, setDuration] = useState<Duration>({ hours: 0, minutes: 0 });

    useEffect(() => {
        setCurrentEvent(event);
        setOperations(event.operations);
        setDuration(calculateEventsDuration(event));
    }, [event]);

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

    const addEvent = async () => {
        let calendarApi = calendarRef.current?.getApi();
        isNew
            ? await eventsDB.events.add(currentEvent)
            : await eventsDB.events.update(currentEvent.id, currentEvent);
        calendarApi?.getEventById(currentEvent.id)?.remove();
        calendarApi?.addEvent(currentEvent);

    };

    const cancelEvent = () => {
        setCurrentEvent(event);

    };

    const deleteEvent = async () => {
        await eventsDB.events.delete(currentEvent.id);
        let calendarApi = calendarRef.current?.getApi();
        calendarApi?.getEventById(currentEvent.id)?.remove();
    };

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
            <>
                <Header className="event-header">

                    {isNew
                        ? `Add New Event to ${calendarRef.current
                            ?.getApi()
                            .getResourceById(currentEvent?.resourceId)?.title
                        } at ${currentEvent?.start.getHours()}`
                        : `Edit ${currentEvent.title}`}

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
                        value={event.description}
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
                                onClick={() => {

                                }}
                            >
                                Delete Event
                            </Button>
                        </div>
                    )}
                    <div id="save">
                        <Button color="inherit" variant="text" onClick={cancelEvent}>
                            Cancel
                        </Button>
                        <Button color="primary" variant="contained" onClick={addEvent}>
                            {isNew ? "Add" : "Edit"}
                        </Button>
                    </div>
                </Actions>
            </>

        </>
    )
}

export default EventComponent