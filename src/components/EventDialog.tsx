import FullCalendar from "@fullcalendar/react";
import React, { useState, useEffect } from "react";
import { Duration, EventType } from "../Types";
import Data from "../data/sampleData.json";

import Dialog from "@mui/material/Dialog";
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
import { addDuration } from "../Utils";
import { addEventToDB } from "../FCWrapper";

type dialogProps = {
  open: boolean;
  openHandler: (id: string, show: boolean) => void;
  calendarRef: React.RefObject<FullCalendar>;
  event: EventType;
};

const EventDialog = ({
  open,
  openHandler,
  calendarRef,
  event,
}: dialogProps) => {
  const ops = Data.operations;
  const [currentEvent, setCurrentEvent] = useState(event);
  const [operations, setOperations] = useState<string[]>([]);
  const [duration, setDuration] = useState<Duration>({ hours: 0, minutes: 0 });

  const handleOperationChange = (
    event: SelectChangeEvent<typeof operations>
  ) => {
    const {
      target: { value },
    } = event;
    setOperations(typeof value === "string" ? value.split(",") : value);
  };

  const addEvent = async () => {
    setCurrentEvent({
      ...currentEvent,
      id: event.id,
      resourceId: event.resourceId,
      operations: operations,
      start: new Date(event.start),
      end: new Date(addDuration(duration.hours, duration.minutes, event.start)),
    });
    let calendarApi = calendarRef.current?.getApi();
    calendarApi?.addEvent(event);
    await addEventToDB(event);
  };

  //   useEffect(() => {
  //     (async () => {
  //       if (event !== undefined) {
  //       }
  //     })();
  //   }, [event]);

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
    <Dialog fullWidth open={open} onClose={() => openHandler("date", false)}>
      <Header>
        <>
          Add New Event to {event?.resourceId} at {event?.start.getHours()}
        </>
      </Header>
      <Content className="content-container">
        <InputLabel className="labels">Title</InputLabel>
        <TextField
          className="fields"
          variant="outlined"
          size="small"
          placeholder="Event Title"
          value={currentEvent.title}
          onChange={(e) =>
            setCurrentEvent({ ...currentEvent, title: e.target.value })
          }
        ></TextField>
        <InputLabel className="labels">Description</InputLabel>
        <TextField
          className="fields"
          variant="outlined"
          size="small"
          placeholder="Event Description"
          value={currentEvent.description}
          onChange={(e) =>
            setCurrentEvent({ ...currentEvent, description: e.target.value })
          }
        ></TextField>
        <InputLabel className="labels">Operations</InputLabel>
        <Select
          multiple
          className="fields"
          variant="outlined"
          size="small"
          value={currentEvent.operations}
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
        <InputLabel className="labels">Duration</InputLabel>
        <div className="numberfields">
          <TextField
            inputProps={hoursInputProps}
            type="number"
            size="small"
            className="numberinputs"
            value={duration.hours}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.checkValidity()) {
                setDuration({ ...duration, hours: e.target.valueAsNumber | 0 });
              }
            }}
          ></TextField>
          <div>hours</div>

          <TextField
            inputProps={minutesInputProps}
            type={"number"}
            size="small"
            className="numberinputs"
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
      <Actions>
        <Button
          color="inherit"
          variant="text"
          onClick={() => openHandler("date", false)}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="text"
          onClick={() => {
            addEvent();
            openHandler("date", false);
          }}
        >
          Add
        </Button>
      </Actions>
    </Dialog>
  );
};

export default EventDialog;
