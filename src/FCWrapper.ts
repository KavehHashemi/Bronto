import { v4 as uuid } from "uuid";
import { eventsDB } from "./indexedDb/EventsDB";
import { EventType } from "./Types";
import { addHours } from "./Utils";
import sampleData from "./data/sampleData.json";
import FullCalendar, { CalendarApi } from "@fullcalendar/react";

///EVENTS
export const fetchEvents = async (calendarApi: CalendarApi) => {
  console.log("fetch events called");

  let residentEvents: number = await eventsDB.events.count();

  if (residentEvents === 0) {
    for (let ev in sampleData.events) {
      loadSampleEvents(sampleData.events[ev]);
    }
  }
  const db = await eventsDB.events.toArray();
  let k = calendarApi?.addEvent(db);

  console.log(k);
  let evs = calendarApi?.getEvents();
  console.log(evs);
};

export const addEventsToCalendar = async () => {};

export const loadSampleEvents = async (event: any) => {
  let a: EventType = {
    id: uuid(),
    resourceId: event.resourceId,
    title: event.title,
    description: event.description,
    start: new Date(),
    end: addHours(2),
    operations: [],
  };
  await addEvent(a);
};

export const addEvent = async (event: EventType) => {
  const a = await eventsDB.events.add(event);
};
export const editEvent = async () => {};
export const deleteEvent = async () => {};
///RESOURCES
export const fetchResources = async () => {};
export const addResource = async () => {};
export const editResource = async () => {};
export const deleteResource = async () => {};
///OPERATIONS
export const fetchOperations = async () => {};
