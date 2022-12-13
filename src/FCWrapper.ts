import { v4 as uuid } from "uuid";
import { eventsDB } from "./indexedDb/EventsDB";
import { EventType, Resource } from "./Types";
import { addHours } from "./Utils";
import sampleData from "./data/sampleData.json";
import { CalendarApi, EventInput } from "@fullcalendar/react";
import { ResourceInput } from "@fullcalendar/resource-common";
import { resourceDB } from "./indexedDb/ResourcesDB";

///EVENTS
export const fetchEvents = async (calendarApi?: CalendarApi) => {
  let residentEvents: number = await eventsDB.events.count();
  if (residentEvents === 0) {
    for (let ev in sampleData.events) {
      loadSampleEvents(sampleData.events[ev]);
    }
  }
  const db = await eventsDB.events.toArray();
  for (let ev in db) {
    let calendarEvent: EventInput = {
      id: db[ev].id,
      title: db[ev].title,
      start: db[ev].start,
      end: db[ev].end,
      resourceId: db[ev].resourceId,
      extendedProps: {
        description: db[ev].description,
        operations: db[ev].operations,
      },
      allDay: false,
      durationEditable: true,
      overlap: false,
      resourceEditable: false,
      editable: true,
      startEditable: true,
      interactive: true,
    };
    calendarApi?.addEvent(calendarEvent);
    let resource = await createResource(calendarEvent.resourceId);
    if (resource) calendarApi?.addResource(resource);
  }
};

export const createResource = async (resourceId: string | undefined) => {
  const db = await resourceDB.resources.toArray();
  let calendarResource: ResourceInput;
  for (let rsrc in db) {
    if (db[rsrc].id === resourceId) {
      console.log("found");
      calendarResource = { id: resourceId, title: db[rsrc].name };
      return calendarResource;
    }
  }
};

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
  await eventsDB.events.add(event);
};
export const editEvent = async () => {};
export const deleteEvent = async () => {};

///RESOURCES
export const fetchResources = async (calendarApi?: CalendarApi) => {
  let residentResources: number = await resourceDB.resources.count();
  if (residentResources === 0) {
    for (let rsrc in sampleData.resources) {
      console.log(sampleData.resources[rsrc]);
      await loadSampleResources(sampleData.resources[rsrc]);
    }
  }
  const db = await resourceDB.resources.toArray();

  for (let rsrc in db) {
    let calendarResource: ResourceInput = {
      id: db[rsrc].id,
      title: db[rsrc].name,
    };
    // let a = calendarApi?.addResource(calendarResource);
    // let b = calendarApi?.getResources();
    // console.log(a);
    // console.log(b);
  }
};
export const loadSampleResources = async (resource: any) => {
  let a: Resource = {
    id: resource.id,
    name: resource.name,
  };
  await addResource(a);
};
export const addResource = async (resource: Resource) => {
  await resourceDB.resources.add(resource);
};
export const editResource = async () => {};
export const deleteResource = async () => {};
///OPERATIONS
export const fetchOperations = async () => {};