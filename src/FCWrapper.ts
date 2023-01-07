import { v4 as uuid } from "uuid";
import { eventsDB } from "./indexedDb/EventsDB";
import { EventType, Resource } from "./Types";
import { addDuration, addHours } from "./Utils";
import sampleData from "./data/sampleData.json";
import FullCalendar, {
  CalendarApi,
  EventApi,
  EventDropArg,
  EventInput,
} from "@fullcalendar/react";
import { resourceDB } from "./indexedDb/ResourcesDB";
import { DateClickArg, EventResizeDoneArg } from "@fullcalendar/interaction";

///EVENTS

export const createEventTypeFromEventApi = (eventApi: EventApi): EventType => {
  let eventType: EventType = {
    id: eventApi.id,
    title: eventApi.title,
    description: eventApi.extendedProps.description,
    resourceId: eventApi.getResources()[0].id,
    operations: eventApi.extendedProps.operations,
    start: eventApi.start || new Date(),
    end: eventApi.end || new Date(),
  };
  return eventType;
};

export const createEventTypeFromDateClick = (
  dateClick: DateClickArg
): EventType => {
  let eventType: EventType = {
    id: uuid(),
    title: "",
    description: "",
    resourceId: dateClick.resource?.id || "-1",
    operations: [],
    start: new Date(dateClick.dateStr),
    end: new Date(addHours(1, dateClick.date)),
  };
  return eventType;
};

export const createEventInputFromEventType = (
  eventType: EventType
): EventInput => {
  let eventApi: EventInput = {
    id: eventType.id,
    title: eventType.title,
    resourceId: eventType.resourceId,
    extendedProps: {
      description: eventType.description,
      operations: eventType.operations,
    },
    start: eventType.start,
    end: eventType.end,
  };
  return eventApi;
};

export const checkDB = async () => {
  let residentEvents: number = await eventsDB.events.count();
  console.log(await eventsDB.events.toArray());
  if (residentEvents === 0) {
    for (let ev in sampleData.events) {
      loadSampleEvents(sampleData.events[ev]);
    }
  }
};

// export const addEventsToCalendar = async (calendarApi: CalendarApi) => {
//   const db = await eventsDB.events.toArray();
//   for (let ev in db) {
//     let calendarEvent: EventInput = {
//       id: db[ev].id,
//       title: db[ev].title,
//       start: db[ev].start,
//       end: db[ev].end,
//       resourceId: db[ev].resourceId,
//       extendedProps: {
//         description: db[ev].description,
//         operations: db[ev].operations,
//       },
//       allDay: false,
//       durationEditable: true,
//       overlap: false,
//       resourceEditable: false,
//       editable: true,
//       startEditable: true,
//       interactive: true,
//     };
//     calendarApi?.addEvent(calendarEvent);
//   }
// };

export const fetchEvents = async (calendarApi?: CalendarApi) => {
  let residentEvents: number = await eventsDB.events.count();
  if (residentEvents === 0) {
    for (let ev in sampleData.events) {
      loadSampleEvents(sampleData.events[ev]);
    }
  }
  const db = await eventsDB.events.toArray();
  for (let ev in db) {
    calendarApi?.addEvent(db[ev]);
  }
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
    end: addDuration(4, 0, new Date()),
    operations: [],
  };
  await eventsDB.events.add(a);

  // await addEventToDB(a);
};

export const addEventToDB = async (event: EventType) => {};
export const editEvent = async (
  calendarRef: React.RefObject<FullCalendar>,
  e: EventDropArg | EventResizeDoneArg
) => {
  let calendarApi = calendarRef.current?.getApi();
  calendarApi
    ?.getEventById(e.event.id)
    ?.setDates(e.event.startStr, e.event.endStr);
  await eventsDB.events.update(
    e.event.id,
    createEventTypeFromEventApi(e.event)
  );
};
export const deleteEvent = async () => {};

///RESOURCES
export const fetchResources = async (calendarApi?: CalendarApi) => {
  let residentResources: number = await resourceDB.resources.count();
  if (residentResources === 0) {
    for (let rsrc in sampleData.resources) {
      await resourceDB.resources.add(sampleData.resources[rsrc]);
    }
  }
  const db = await resourceDB.resources.toArray();
  for (let rsrc in db) {
    calendarApi?.addResource(db[rsrc]);
  }
};
export const addResource = async (
  resourceName: string,
  calendarApi?: CalendarApi
) => {
  const newResource: Resource = { id: uuid(), title: resourceName };
  await resourceDB.resources.add(newResource);
  calendarApi?.addResource(newResource);
};

export const getResourceFromResourceApi = (
  calendarApi?: CalendarApi
): Resource[] => {
  let resourcesArray: Resource[] = [];
  let calendarResources = calendarApi?.getResources();
  if (calendarResources)
    for (let idx = 0; idx < calendarResources.length; idx++) {
      resourcesArray.push({
        id: calendarResources[idx].id,
        title: calendarResources[idx].title,
      });
    }
  return resourcesArray;
};
export const editResource = async () => {};
export const deleteResource = async () => {};
///OPERATIONS
export const fetchOperations = async () => {};
