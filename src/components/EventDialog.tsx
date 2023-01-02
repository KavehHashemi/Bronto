/* eslint-disable react-hooks/exhaustive-deps */
import FullCalendar, { EventApi } from "@fullcalendar/react";
import React, { useState, useEffect } from "react";
import { Duration, EventType } from "../Types";
import Data from "../data/sampleData.json";
import "./EventDialog.css";

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
import { eventsDB } from "../indexedDb/EventsDB";

type dialogProps = {
  open: boolean;
  openHandler: (id: string, show: boolean) => void;
  calendarRef: React.RefObject<FullCalendar>;
  event: EventType;
  isNew: boolean;
};

const EventDialog = ({
  open,
  openHandler,
  calendarRef,
  event,
  isNew,
}: dialogProps) => {
  const ops = Data.operations;
  const [currentEvent, setCurrentEvent] = useState<EventType>(event);
  const [operations, setOperations] = useState<string[]>([]);
  const [duration, setDuration] = useState<Duration>({ hours: 0, minutes: 0 });

  const calculateEventsDuration = (): Duration => {
    let diff = event.end.valueOf() - event.start.valueOf();
    let hours = Math.floor(diff / (1000 * 60 * 60));
    let minutes = Math.floor(diff / (1000 * 60)) - hours * 60;
    console.log(`${hours} hours and ${minutes} minutes`);
    return { hours: hours, minutes: minutes };
  };

  const getRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleOperationChange = (
    event: SelectChangeEvent<typeof operations>
  ) => {
    const {
      target: { value },
    } = event;
    setOperations(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    setCurrentEvent({ ...currentEvent, operations: operations });
  }, [operations]);

  const addEvent = async () => {
    console.log(`start:  ${currentEvent.start}`);
    console.log(`end:  ${currentEvent.end}`);
    let calendarApi = calendarRef.current?.getApi();
    if (isNew) {
      console.log("new event");
      console.log(currentEvent);
      await eventsDB.events.add(currentEvent);
      //await addEventToDB(currentEvent);
    } else {
      console.log("edited event");
      console.log(currentEvent);
      ///update event in db
      await eventsDB.events.update(currentEvent.id, currentEvent);
      ///add event to calendar
    }
    /////////////NEXT LINE - how to edit an existing event in fullcalendar?/////////////////
    calendarApi?.getEventById(currentEvent.id)?.remove();
    calendarApi?.addEvent(currentEvent);
    openHandler("eventDialog", false);

    //   setCurrentEvent({
    //   ...currentEvent,
    //   operations: operations,
    //   start: new Date(event.start),
    //   end: new Date(addDuration(duration.hours, duration.minutes, event.start)),
    // });

    // let calendarApi = calendarRef.current?.getApi();
    // if (isNew) {
    //   console.log("new event");
    //   console.log(currentEvent);
    //   await eventsDB.events.add(currentEvent);
    //   //await addEventToDB(currentEvent);
    // } else {
    //   console.log("edited event");
    //   console.log(currentEvent);
    //   ///update event in db
    //   await eventsDB.events.update(currentEvent.id, currentEvent);
    //   ///add event to calendar
    // }
    // calendarApi?.addEvent(currentEvent);
    // openHandler("eventDialog", false);
  };

  const cancelEvent = () => {
    setCurrentEvent(event);
    openHandler("eventDialog", false);
  };

  // useEffect(() => {
  //   (async () => {
  //     if (currentEvent.resourceId !== "-1") {
  //       await addEventToDB(currentEvent);
  //       let calendarApi = calendarRef.current?.getApi();
  //       calendarApi?.addEvent(currentEvent);
  //     }
  //   })();
  // }, [currentEvent]);

  useEffect(() => {
    setCurrentEvent(event);
    setOperations(event.operations);
    setDuration(calculateEventsDuration());
  }, [event]);

  useEffect(() => {
    console.log(duration);
    setCurrentEvent({
      ...currentEvent,
      //start: new Date(event.start),
      end: new Date(addDuration(duration.hours, duration.minutes, event.start)),
    });
  }, [duration]);

  useEffect(() => {
    // setCurrentEvent({
    //   ...currentEvent,
    //   operations: operations,
    //   start: new Date(event.start),
    //   end: new Date(addDuration(duration.hours, duration.minutes, event.start)),
    // });
    // (async () => {
    //   console.log(`start:  ${currentEvent.start}`);
    //   console.log(`end:  ${currentEvent.end}`);
    //   let calendarApi = calendarRef.current?.getApi();
    //   if (isNew) {
    //     console.log("new event");
    //     console.log(currentEvent);
    //     await eventsDB.events.add(currentEvent);
    //     //await addEventToDB(currentEvent);
    //   } else {
    //     console.log("edited event");
    //     console.log(currentEvent);
    //     ///update event in db
    //     await eventsDB.events.update(currentEvent.id, currentEvent);
    //     ///add event to calendar
    //   }
    //   calendarApi?.addEvent(currentEvent);
    //   openHandler("eventDialog", false);
    // })();
  }, [currentEvent]);

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
    <Dialog fullWidth open={open} onClose={cancelEvent}>
      <Header>
        <>
          Add New Event to {currentEvent?.resourceId} at{" "}
          {currentEvent?.start.getHours()}
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
          // value={currentEvent.operations}
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
        <Button color="inherit" variant="text" onClick={cancelEvent}>
          Cancel
        </Button>
        <Button color="primary" variant="text" onClick={addEvent}>
          Add
        </Button>
      </Actions>
    </Dialog>
  );
};

export default EventDialog;
