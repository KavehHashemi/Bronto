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
import { editEvent, fetchEvents, fetchResources } from "../FCWrapper";
import { eventsDB } from "../indexedDb/EventsDB";
import { resourceDB } from "../indexedDb/ResourcesDB";
import AddEventDialog from "./AddEventDialog";
import EditEventDialog from "./EditEventDialog";
import { addHours } from "../Utils";

const CalendarComponent = () => {
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    let calendarApi = calendarRef.current?.getApi();
    fetchResources(calendarApi);
    fetchEvents(calendarApi);
  }, [calendarRef]);

  const [openDialog, setOpenDialog] = useState<ShowDialog>({
    event: false,
    date: false,
  });

  ///AddEventDialog Parameters
  const [resourceId, setResourceId] = useState<string>("");
  const [start, setStart] = useState<Date>(new Date());
  ///EditEventDialog Paramater
  const [passedEvent, setPassedEvent] = useState<EventType>();

  const handleShowDialog = (id: string, show: boolean) => {
    setOpenDialog({ ...openDialog, [id]: show });
  };

  const format: string = "YYYY/M/D HH:mm";

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

  const createCurrentEvent = (event: EventApi) => {
    setPassedEvent({
      id: event.id,
      title: event.title,
      description: event.extendedProps.description,
      operations: event.extendedProps.operations,
      resourceId: event.getResources()[0].id,
      start: event.start || new Date(),
      end: event.end || new Date(),
    });
  };

  const onDateClick = (e: DateClickArg) => {
    // console.log(e);
    //if (e.resource) createCurrentEvent(e.resource.id, e.date);
    if (e.resource) setResourceId(e.resource.id);
    setStart(e.date);
    handleShowDialog("date", true);
    //AddEvent();
  };

  const onEventClick = (e: EventClickArg) => {
    console.log(e.event.title);
    createCurrentEvent(e.event);
    //setPassedEvent(e.event);
    handleShowDialog("event", true);
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
      <AddEventDialog
        // event={event}
        // setEvent={setEvent}
        resourceId={resourceId}
        start={start}
        open={openDialog.date}
        openHandler={handleShowDialog}
      ></AddEventDialog>
      <EditEventDialog
        // event={event}
        // setEvent={setEvent}
        event={passedEvent}
        open={openDialog.event}
        openHandler={handleShowDialog}
      ></EditEventDialog>
    </>
  );
};

export default CalendarComponent;
