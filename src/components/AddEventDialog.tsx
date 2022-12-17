import React, { useState, useRef, useEffect } from "react";
import Data from "../data/sampleData.json";
import { dialogProps } from "../Types";
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
import { EventType } from "@testing-library/react";
import { title } from "process";

const AddEventDialog = ({
  open,
  openHandler,
  event,
  setEvent,
}: dialogProps) => {
  const ops = Data.operations;
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const operationsRef = useRef<string[]>([]);

  const [operations, setOperations] = useState<string[]>([]);
  const [minutes, setMinutes] = useState<string>("0");
  const [hours, setHours] = useState<string>("0");
  const handleChange = (event: SelectChangeEvent<typeof operations>) => {
    const {
      target: { value },
    } = event;
    setOperations(typeof value === "string" ? value.split(",") : value);
    //setEvent({ ...event, operations: operations });
  };

  const addEvent = () => {
    setEvent({
      id: event.id,
      title: titleRef.current?.value || "",
      description: descriptionRef.current?.value || "",
      resourceId: event.resourceId,
      operations: operations,
      start: event.start,
      end: event.end,
    });
  };

  useEffect(() => {
    console.log(event);
  }, [event]);

  return (
    <Dialog fullWidth open={open} onClose={() => openHandler("date", false)}>
      <Header>Add New Event to {event?.resourceId}</Header>
      <Content className="content-container">
        <InputLabel className="labels">Title</InputLabel>
        <TextField
          className="fields"
          variant="outlined"
          size="small"
          placeholder="Event Title"
          ref={titleRef}
          // value={event?.title}
          // onChange={(e) => setEvent({ ...event, title: e.target.value })}
        ></TextField>
        <InputLabel className="labels">Description</InputLabel>
        <TextField
          className="fields"
          variant="outlined"
          size="small"
          placeholder="Event Description"
          ref={descriptionRef}
          // value={event?.description}
          // onChange={(e) => setEvent({ ...event, description: e.target.value })}
        ></TextField>
        <InputLabel className="labels">Operations</InputLabel>
        <Select
          multiple
          className="fields"
          variant="outlined"
          size="small"
          ref={operationsRef}
          value={event?.operations}
          onChange={handleChange}
          placeholder="Operations"
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {/* <Box> */}
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
            type="number"
            size="small"
            className="numberinputs"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          ></TextField>
          <div>hours</div>
          <TextField
            type="number"
            size="small"
            className="numberinputs"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
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
        <Button color="primary" variant="text" onClick={addEvent}>
          Add
        </Button>
      </Actions>
    </Dialog>
  );
};

export default AddEventDialog;
