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
  getResourceFromResourceApi,
} from "../FCWrapper";
import { eventsDB } from "../indexedDb/EventsDB";
import { resourceDB } from "../indexedDb/ResourcesDB";

import { addDuration, addHours } from "../Utils";
import EventDialog from "./EventDialog";
import Resources from "./Resources";

const CalendarComponent = () => {
  const plugins = [resourceTimelinePlugin, interactionPlugin];
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    let calendarApi = calendarRef.current?.getApi();
    fetchResources(calendarApi);
    fetchEvents(calendarApi);
  }, [calendarRef]);

  const [openDialog, setOpenDialog] = useState<ShowDialog>({
    eventDialog: false,
    deleteDialog: false,
    resourceDialog: false,
  });

  const handleShowDialog = async (id: string, show: boolean) => {
    setOpenDialog({ ...openDialog, [id]: show });
  };

  //const format: string = "YYYY/M/D HH:mm";

  const [resources, setResources] = useState<Resource[]>([]);

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
  const onDrop = async (e: EventDropArg) => {
    editEvent(calendarRef, e);
  };
  const onResize = async (e: EventResizeDoneArg) => {
    editEvent(calendarRef, e);
  };
  const a = () => {
    console.log("resourceDialog open");
    handleShowDialog("resourceDialog", true);
  };
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
          addResource: {
            text: "Add Resource",
            click: a,
          },
        }}
        headerToolbar={{
          left: "addResource",
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
      <EventDialog
        event={currentEvent}
        open={openDialog}
        openHandler={handleShowDialog}
        calendarRef={calendarRef}
        isNew={isNew}
      ></EventDialog>
      <Resources
        open={openDialog}
        openHandler={handleShowDialog}
        calendarRef={calendarRef}
        array={getResourceFromResourceApi(calendarRef.current?.getApi())}
      ></Resources>
    </>
  );
};

export default CalendarComponent;
