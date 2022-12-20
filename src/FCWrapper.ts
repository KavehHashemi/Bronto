import { v4 as uuid } from "uuid";
import { eventsDB } from "./indexedDb/EventsDB";
import { EventType, Resource } from "./Types";
import { addHours } from "./Utils";
import sampleData from "./data/sampleData.json";
import { CalendarApi, EventInput } from "@fullcalendar/react";
import { ResourceInput } from "@fullcalendar/resource-common";
import { resourceDB } from "./indexedDb/ResourcesDB";

///EVENTS

export const checkDB = async () => {
  let residentEvents: number = await eventsDB.events.count();
  if (residentEvents === 0) {
    for (let ev in sampleData.events) {
      loadSampleEvents(sampleData.events[ev]);
    }
  }
};

export const addEventsToCalendar = async (calendarApi: CalendarApi) => {
  const db = await eventsDB.events.toArray();
  // const residentEvents = calendarApi?.getEvents();
  // for (let ev in residentEvents) {
  //   if(residentEvents[ev].id!==db[]){

  //   }
  // }
  console.log(db);
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
  }
};

export const addNewEventToCalendar = async () => {
  //const db = await eventsDB.events.
};
export const fetchEvents = async (calendarApi: CalendarApi) => {
  await checkDB();
  await addEventsToCalendar(calendarApi);
  // let residentEvents: number = await eventsDB.events.count();
  // if (residentEvents === 0) {
  //   for (let ev in sampleData.events) {
  //     loadSampleEvents(sampleData.events[ev]);
  //   }
  // }
  // const db = await eventsDB.events.toArray();
  // for (let ev in db) {
  //   let calendarEvent: EventInput = {
  //     id: db[ev].id,
  //     title: db[ev].title,
  //     start: db[ev].start,
  //     end: db[ev].end,
  //     resourceId: db[ev].resourceId,
  //     extendedProps: {
  //       description: db[ev].description,
  //       operations: db[ev].operations,
  //     },
  //     allDay: false,
  //     durationEditable: true,
  //     overlap: false,
  //     resourceEditable: false,
  //     editable: true,
  //     startEditable: true,
  //     interactive: true,
  //   };

  //   calendarApi?.addEvent(calendarEvent);
  // }
};

// export const createResource = async (resourceId: string | undefined) => {
//   const db = await resourceDB.resources.toArray();
//   let calendarResource: ResourceInput;
//   for (let rsrc in db) {
//     if (db[rsrc].id === resourceId) {
//       console.log("found");
//       calendarResource = { id: resourceId, title: db[rsrc].title };
//       return calendarResource;
//     }
//   }
// };

export const loadSampleEvents = async (event: any) => {
  let a: EventType = {
    id: uuid(),
    resourceId: event.resourceId,
    title: event.title,
    description: event.description,
    start: new Date(),
    end: addHours(4),
    operations: [],
  };

  await addEventToDB(a);
};

export const addEventToDB = async (event: EventType) => {
  await eventsDB.events.add(event);
};
export const editEvent = async () => {};
export const deleteEvent = async () => {};

///RESOURCES
export const fetchResources = async (calendarApi?: CalendarApi) => {
  let residentResources: number = await resourceDB.resources.count();
  if (residentResources === 0) {
    for (let rsrc in sampleData.resources) {
      await addResource(sampleData.resources[rsrc]);
    }
  }
  const db = await resourceDB.resources.toArray();

  for (let rsrc in db) {
    calendarApi?.addResource(db[rsrc]);
  }
};

export const addResource = async (resource: Resource) => {
  await resourceDB.resources.add(resource);
};
export const editResource = async () => {};
export const deleteResource = async () => {};
///OPERATIONS
export const fetchOperations = async () => {};
