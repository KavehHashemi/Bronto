/* eslint-disable array-callback-return */
import React from "react";
import FullCalendar, {
  EventApi,
  EventDef,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/react";
import resourceTimelinePlugin, {
  ResourceTimelineView,
} from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";
import { ShowDialog, Duration, EventType, Operation, Resource } from "../Types";

const CalendarComponent = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [openDialog, setOpenDialog] = useState<ShowDialog>({
    event: false,
    date: false,
  });
  const handleShowDialog = () => {};

  const format: string = "YYYY/M/D HH:mm";
  const [event, setEvent] = useState<EventType>();
  const [eventDuration, setEventDuration] = useState<Duration>({
    hours: 0,
    minutes: 0,
  });
  const defaultGap = 1;

  const plugins = [resourceTimelinePlugin, interactionPlugin];
  const [resources, setResources] = useState<Resource[]>([]);
  const fetchEvents = () => {};
  const fetchResources = () => {};
  const fetchOperations = () => {};

  const onDateClick = () => {};
  const onEventClick = () => {};
  const onDrop = () => {};
  const onResize = () => {};

  const AddEvent = () => {};
  const EditEvent = () => {};
  const DeleteEvent = () => {};

  const AddResource = () => {};
  const EditResource = () => {};
  const DeleteResource = () => {};

  const RearrangeEvents = () => {};

  return <div>CalendarComponent</div>;
};

export default CalendarComponent;
