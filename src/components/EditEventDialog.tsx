/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
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
import "./EventDialog.css";
import Data from "../data/sampleData.json";

import { editDialogProps, EventType, Duration } from "../Types";
import { addEventToDB } from "../FCWrapper";

const EditEventDialog = ({
  open,
  openHandler,
  event,
  calendarRef,
}: editDialogProps) => {
  const ops = Data.operations;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
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

  const [editedEvent, setEditedEvent] = useState<EventType>();

  const addEvent = async () => {
    if (event)
      setEditedEvent({
        id: event.id,
        title: title,
        description: description,
        resourceId: event.getResources()[0].id,
        operations: operations,
        start: event.start || new Date(),
        end: event.end || new Date(),
      });
  };
  let calendarApi = calendarRef.current?.getApi();
  useEffect(() => {
    (async () => {
      if (event !== undefined) {
        //calendarApi?.addEvent(event);
        //await addEventToDB(event);
      }
    })();
  }, [event]);

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
    <Dialog fullWidth open={open} onClose={() => openHandler("event", false)}>
      <Header>
        <>Edit {event?.title}</>
      </Header>
      <Content className="content-container">
        <InputLabel className="labels">Title</InputLabel>
        <TextField
          className="fields"
          variant="outlined"
          size="small"
          placeholder="Event Title"
          value={event?.title}
          onChange={(e) => setTitle(e.target.value)}
        ></TextField>
        <InputLabel className="labels">Description</InputLabel>
        <TextField
          className="fields"
          variant="outlined"
          size="small"
          placeholder="Event Description"
          value={event?.extendedProps.description}
          onChange={(e) => setDescription(e.target.value)}
        ></TextField>
        <InputLabel className="labels">Operations</InputLabel>
        <Select
          multiple
          className="fields"
          variant="outlined"
          size="small"
          value={event?.extendedProps.operations}
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
          onClick={() => openHandler("event", false)}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="text"
          onClick={() => {
            addEvent();
            openHandler("event", false);
          }}
        >
          Add
        </Button>
      </Actions>
    </Dialog>
  );
};

export default EditEventDialog;
