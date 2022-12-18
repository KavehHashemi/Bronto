import { useState, useEffect } from "react";
import Data from "../data/sampleData.json";
import { addDialogProps, EventType } from "../Types";
import { addHours } from "../Utils";
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

const AddEventDialog = ({
  open,
  openHandler,
  resourceId,
  start,
}: addDialogProps) => {
  const ops = Data.operations;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [operations, setOperations] = useState<string[]>([]);
  const [minutes, setMinutes] = useState<string>("0");
  const [hours, setHours] = useState<string>("0");
  const handleChange = (event: SelectChangeEvent<typeof operations>) => {
    const {
      target: { value },
    } = event;
    setOperations(typeof value === "string" ? value.split(",") : value);
  };

  const [eventStart, setEventStart] = useState<Date>();
  const [eventEnd, setEventEnd] = useState<Date>();

  const getDuration = () => {
    const duration: number =
      (minutes as unknown as number) + (hours as unknown as number) * 60;
    setEventStart(start);
    setEventEnd(addHours(4, start));
  };

  const [event, setEvent] = useState<EventType>();

  const addEvent = () => {
    getDuration();
    //console.log(event);
  };

  useEffect(() => {
    console.log(eventStart);
    console.log(eventEnd);
  }, [eventStart, eventEnd]);

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
          //onChange={(e) => setEvent({ ...event, title: e.target.value })}
          onChange={(e) => setTitle(e.target.value)}
        ></TextField>
        <InputLabel className="labels">Description</InputLabel>
        <TextField
          className="fields"
          variant="outlined"
          size="small"
          placeholder="Event Description"
          value={description}
          // onChange={(e) => setEvent({ ...event, description: e.target.value })}
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
