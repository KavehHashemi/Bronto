/* eslint-disable array-callback-return */
import FullCalendar, { CalendarApi } from "@fullcalendar/react";
import "@fullcalendar/react/dist/vdom";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { ShowDialog, Duration, EventType, Operation, Resource } from "../Types";
import { fetchEvents, fetchResources } from "../FCWrapper";
import { eventsDB } from "../indexedDb/EventsDB";
import { resourceDB } from "../indexedDb/ResourcesDB";

const CalendarComponent = () => {
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    let calendarApi = calendarRef.current?.getApi();
    fetchResources();
    fetchEvents(calendarApi);
  }, [calendarRef]);

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
  //const fetchEvents = () => {};
  // const fetchResources = () => {};
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

  return (
    <FullCalendar
      plugins={plugins}
      ref={calendarRef}
      // events={eventsDB.events}
      // resources={resourceDB.resources}
      initialView="resourceTimelineWeek"
      customButtons={{
        goTo: {
          text: "Go to...",
        },
      }}
      headerToolbar={{
        left: "goTo",
        center: "title",
        right: "prev,next,today",
      }}
      editable={true}
      droppable={true}
      height="auto"
      resourceAreaHeaderContent="Resources"
      resourceAreaWidth="150px"
      slotMinWidth={80}
      forceEventDuration={true}
      eventResourceEditable={false}
      defaultTimedEventDuration="00:30"
      schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
    />
  );
};

export default CalendarComponent;