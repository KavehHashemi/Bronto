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
import { ShowDialog, EventType, ContentType } from "../Types";
import "../style/CalendarComponent.css";
import {
  editEvent,
  fetchEvents,
  fetchResources,
  createEventTypeFromEventApi,
  createEventTypeFromDateClick,
  // getResourceFromResourceApi,
} from "../FCWrapper";

import { addDuration } from "../Utils";
import EventDialog from "./EventDialog";
import ResourcesDialog from "./ResourcesDialog";


import Modal from './Dialog'
import { useDialog } from "../Hooks";
// import { Button } from "@mui/material";


const CalendarComponent = () => {

  const [show, toggleShow] = useDialog()
  const [type, setType] = useState<ContentType>(ContentType.info)

  const plugins = [resourceTimelinePlugin, interactionPlugin];
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    let calendarApi = calendarRef.current?.getApi();
    fetchResources(calendarApi);
    fetchEvents(calendarApi);
  }, [calendarRef]);

  // const [openDialog, setOpenDialog] = useState<ShowDialog>({
  //   eventDialog: false,
  //   deleteEventDialog: false,
  //   resourceDialog: false,
  //   deleteResourceDialog: false
  // });

  // const handleShowDialog = (id: string, show: boolean) => {
  //   setOpenDialog({ ...openDialog, [id]: show });
  // };

  const handleShowDialog = (id: ContentType) => {
    setType(id);
    toggleShow()
  };

  // const [isNew, setIsNew] = useState<boolean>(true);
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
    //setIsNew(true);
    handleShowDialog(ContentType.event);
  };

  const onEventClick = (e: EventClickArg) => {
    setCurrentEvent(createEventTypeFromEventApi(e.event));
    //setIsNew(false);
    handleShowDialog(ContentType.event);
  };

  const onDrop = async (e: EventDropArg) => {
    editEvent(calendarRef, e);
  };

  const onResize = async (e: EventResizeDoneArg) => {
    editEvent(calendarRef, e);
  };

  const manageResources = () => {
    handleShowDialog(ContentType.resource);
  };

  const renderEventContent = (e: EventContentArg) => {
    return (
      <div>
        <i>{e.event.title}</i>
        <i> - </i>
        <i>{e.event.extendedProps.description}</i>
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
          addResource: {
            text: "Resources",
            click: manageResources,
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
      {/* <EventDialog
        open={openDialog}
        openHandler={setOpenDialog}
        calendarRef={calendarRef}
        event={currentEvent}
        isNew={isNew}
      ></EventDialog>
      <ResourcesDialog
        open={openDialog}
        openHandler={setOpenDialog}
        calendarRef={calendarRef}
      //array={getResourceFromResourceApi(calendarRef.current?.getApi())}
      ></ResourcesDialog> */}
      {/* <Modal show={isShowingModal} handleShow={toggleModal}></Modal> */}
      {/* <Button onClick={toggleShow}>Show Dialog</Button> */}
      <Modal show={show} handleShow={toggleShow} contentType={type} content={currentEvent} calendarRef={calendarRef}></Modal>
    </div>
  );
};

export default CalendarComponent;
