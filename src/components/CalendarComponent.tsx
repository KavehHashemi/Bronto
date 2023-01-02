/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import FullCalendar, {
  CalendarApi,
  EventApi,
  EventClickArg,
  EventDropArg,
} from "@fullcalendar/react";
import "@fullcalendar/react/dist/vdom";
import interactionPlugin, {
  DateClickArg,
  DropArg,
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { ShowDialog, Duration, EventType, Operation, Resource } from "../Types";
import {
  editEvent,
  fetchEvents,
  fetchResources,
  createEventTypeFromEventApi,
  createEventTypeFromDateClick,
} from "../FCWrapper";
import { eventsDB } from "../indexedDb/EventsDB";
import { resourceDB } from "../indexedDb/ResourcesDB";
import AddEventDialog from "./AddEventDialog";
import EditEventDialog from "./EditEventDialog";
import { addDuration, addHours } from "../Utils";
import EventDialog from "./EventDialog";

const CalendarComponent = () => {
  const calendarRef = useRef<FullCalendar>(null);

  const [openDialog, setOpenDialog] = useState<ShowDialog>({
    event: false,
    date: false,
    eventDialog: false,
  });
  useEffect(() => {
    let calendarApi = calendarRef.current?.getApi();
    fetchResources(calendarApi);
    fetchEvents(calendarApi);
  }, [calendarRef]);

  ///AddEventDialog Parameters

  // const [resourceId, setResourceId] = useState<string>("");
  // const [start, setStart] = useState<Date>(new Date());

  ///EditEventDialog Paramater

  const handleShowDialog = (id: string, show: boolean) => {
    setOpenDialog({ ...openDialog, [id]: show });
  };

  //const format: string = "YYYY/M/D HH:mm";

  // const [eventDuration, setEventDuration] = useState<Duration>({
  //   hours: 0,
  //   minutes: 0,
  // });
  //const defaultGap = 1;

  const plugins = [resourceTimelinePlugin, interactionPlugin];
  const [resources, setResources] = useState<Resource[]>([]);
  //const fetchEvents = () => {};
  // const fetchResources = () => {};
  //const fetchOperations = () => {};

  // const createCurrentEvent = (event: EventApi) => {
  //   setPassedEvent(createEventTypeFromEventApi(event));
  // };
  const [isNew, setIsNew] = useState<boolean>(true);
  const [currentEvent, setCurrentEvent] = useState<EventType>({
    id: uuid(),
    title: "",
    resourceId: "-1",
    description: "",
    operations: [],
    start: new Date(),
    end: addDuration(1, 0, new Date()),
  });

  const onDateClick = (e: DateClickArg) => {
    setCurrentEvent(createEventTypeFromDateClick(e));
    setIsNew(true);
    handleShowDialog("eventDialog", true);
  };

  const onEventClick = (e: EventClickArg) => {
    setCurrentEvent(createEventTypeFromEventApi(e.event));
    setIsNew(false);
    handleShowDialog("eventDialog", true);
  };
  const onDrop = (e: EventDropArg) => {
    console.log(e.delta);
    editEvent();
  };
  const onResize = (e: EventResizeDoneArg) => {
    console.log(e.startDelta);
    console.log(e.endDelta);
    //EditEvent();
  };

  // const AddEvent = () => {};
  // const EditEvent = () => {};
  // const DeleteEvent = () => {};

  // const AddResource = () => {};
  // const EditResource = () => {};
  // const DeleteResource = () => {};

  // const RearrangeEvents = () => {};

  return (
    <>
      <FullCalendar
        plugins={plugins}
        ref={calendarRef}
        initialView="resourceTimelineWeek"
        dateClick={(e) => onDateClick(e)}
        eventClick={(e) => onEventClick(e)}
        eventDrop={(e) => onDrop(e)}
        eventResize={(e) => onResize(e)}
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
      {/* <AddEventDialog
        //resourceId={resourceId}
        //start={start}
        event={passedEvent}
        open={openDialog.date}
        openHandler={handleShowDialog}
        calendarRef={calendarRef}
      ></AddEventDialog>
      <EditEventDialog
        // event={event}
        // setEvent={setEvent}
        event={passedEvent}
        open={openDialog.event}
        openHandler={handleShowDialog}
        calendarRef={calendarRef}
      ></EditEventDialog> */}
      <EventDialog
        event={currentEvent}
        open={openDialog.eventDialog}
        openHandler={handleShowDialog}
        calendarRef={calendarRef}
        isNew={isNew}
      ></EventDialog>
    </>
  );
};

export default CalendarComponent;
