/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Data from "../data/sampleData.json";
import { addDialogProps, Duration, EventType } from "../Types";
import { addDuration } from "../Utils";
import { v4 as uuid } from "uuid";
import "./AddEventDialog.tsx.css";

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
import { addEventToDB, fetchEvents } from "../FCWrapper";

const AddEventDialog = ({
  open,
  openHandler,
  resourceId,
  start,
  calendarRef,
}: addDialogProps) => {
  const ops = Data.operations;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [operations, setOperations] = useState<string[]>([]);
  const [duration, setDuration] = useState<Duration>({ hours: 0, minutes: 0 });

  const handleChange = (event: SelectChangeEvent<typeof operations>) => {
    const {
      target: { value },
    } = event;
    setOperations(typeof value === "string" ? value.split(",") : value);
  };

  const [event, setEvent] = useState<EventType>();

  const addEvent = async () => {
    setEvent({
      id: uuid(),
      title: title,
      description: description,
      resourceId: resourceId,
      operations: operations,
      start: new Date(start),
      end: new Date(addDuration(duration.hours, duration.minutes, start)),
    });
    // if (event !== undefined) {
    //   console.log("event is defined");
    //   let calendarApi = calendarRef.current?.getApi();
    //   await addEventToDB(event);
    //   await fetchEvents(calendarApi);
    // } else {
    //   console.log("event is undefined");
    // }
  };

  let calendarApi = calendarRef.current?.getApi();
  useEffect(() => {
    // console.log("event.start");
    // console.log(event?.start);
    // console.log("event.end");
    // console.log(event?.end);
    (async () => {
      if (event !== undefined) await addEventToDB(event);
      //calendarApi?.addEvent();
    })();
    //console.log(event);
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
    <Dialog fullWidth open={open} onClose={() => openHandler("date", false)}>
      <Header>
        <>
          Add New Event to {resourceId} at {start.getHours()}
        </>
      </Header>
      <Content className="content-container">
        <InputLabel className="labels">Title</InputLabel>
        <TextField
          className="fields"
          variant="outlined"
          size="small"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></TextField>
        <InputLabel className="labels">Description</InputLabel>
        <TextField
          className="fields"
          variant="outlined"
          size="small"
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></TextField>
        <InputLabel className="labels">Operations</InputLabel>
        <Select
          multiple
          className="fields"
          variant="outlined"
          size="small"
          value={operations}
          onChange={handleChange}
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

export default AddEventDialog;
