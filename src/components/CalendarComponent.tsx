/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import FullCalendar, {
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from "@fullcalendar/react";
import "@fullcalendar/react/dist/vdom";
import interactionPlugin, {
  DateClickArg,
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { EventType, ContentType } from "../Types";
import "../style/CalendarComponent.css";
import {
  moveEvent,
  fetchEvents,
  fetchResources,
  createEventTypeFromEventApi,
  createEventTypeFromDateClick,
  fetchOperations,
} from "../FCWrapper";

import { addDuration } from "../Utils";
import EntityDialog from './EntityDialog'
import { useDialog } from "../Hooks";


const CalendarComponent = () => {
  const [showDialog, toggleShowDialog] = useDialog()
  const [dialogType, setDialogType] = useState<ContentType>(ContentType.info)

  const plugins = [resourceTimelinePlugin, interactionPlugin];
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    let calendarApi = calendarRef.current?.getApi();
    fetchResources(calendarApi);
    fetchEvents(calendarApi);
    fetchOperations()
  }, [calendarRef]);

  const handleShowDialog = (id: ContentType) => {
    setDialogType(id);
    toggleShowDialog()
  };

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
    handleShowDialog(ContentType.event);
  };

  const onEventClick = (e: EventClickArg) => {
    setCurrentEvent(createEventTypeFromEventApi(e.event));
    handleShowDialog(ContentType.event);
  };

  const onDrop = async (e: EventDropArg) => {
    await moveEvent(calendarRef, e);
  };

  const onResize = async (e: EventResizeDoneArg) => {
    await moveEvent(calendarRef, e);
  };

  const manageResources = () => {
    handleShowDialog(ContentType.resource);
  };

  const manageOperations = () => {
    handleShowDialog(ContentType.operation)
  }

  const openInfo = () => {
    handleShowDialog(ContentType.info);
  }

  const openDate = () => {
    handleShowDialog(ContentType.date)
  }

  const renderEventContent = (e: EventContentArg) => {
    return (
      <div style={{ paddingInline: "0.3rem" }}>
        <i>{e.event.title}</i>
        {/* <i> - </i> */}
        <i>{e.event.extendedProps.description ? ` - ${e.event.extendedProps.description}` : null}</i>
      </div>
    );
  };



  return (
    <div className="main-container">
      <FullCalendar
        plugins={plugins}
        ref={calendarRef}
        initialView="resourceTimelineWeek"
        resourceOrder={"createdAt"}
        eventContent={(e) => renderEventContent(e)}
        dateClick={(e) => onDateClick(e)}
        eventClick={(e) => onEventClick(e)}
        eventDrop={(e) => onDrop(e)}
        eventResize={(e) => onResize(e)}
        customButtons={{
          resource: {
            text: "Resources",
            click: manageResources,
          },
          info: {
            text: "?",
            click: openInfo
          },
          goto: {
            text: "Go to",
            click: openDate
          },
          operation: {
            text: "Operations",
            click: manageOperations
          }
        }}
        headerToolbar={{
          left: "resource,operation,info",
          center: "title",
          right: "goto,prev,next,today",
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
      <EntityDialog show={showDialog} handleShow={toggleShowDialog} contentType={dialogType} content={currentEvent} calendarRef={calendarRef}></EntityDialog>
    </div>
  );
};

export default CalendarComponent;
