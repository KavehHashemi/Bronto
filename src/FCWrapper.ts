import { v4 as uuid } from "uuid";
import { eventsDB } from "./indexedDb/EventsDB";
import { EventType, Operation, ResourceType } from "./Types";
import { addDuration, addHours, getRandomColor } from "./Utils";
import sampleData from "./data/sampleData.json";
import FullCalendar, {
  CalendarApi,
  EventApi,
  EventDropArg,
  EventInput,
} from "@fullcalendar/react";
import { resourceDB } from "./indexedDb/ResourcesDB";
import { DateClickArg, EventResizeDoneArg } from "@fullcalendar/interaction";
import { operationsDB } from "./indexedDb/OperationsDB";

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
};

export const addEvent = async (event: EventType, calendarApi: CalendarApi) => {
  await eventsDB.events.add(event);
  calendarApi?.addEvent(event);
};
export const editEvent = async (event: EventType, calendarApi: CalendarApi) => {
  await eventsDB.events.update(event.id, event);
  calendarApi?.getEventById(event.id)?.remove();
  calendarApi?.addEvent(event);
};

export const moveEvent = async (
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
export const deleteEvent = async (
  event: EventType,
  calendarApi: CalendarApi
) => {
  await eventsDB.events.delete(event.id);
  calendarApi?.getEventById(event.id)?.remove();
};

///RESOURCES
export const fetchResources = async (calendarApi?: CalendarApi) => {
  let residentResources: number = await resourceDB.resources.count();
  if (residentResources === 0) {
    for (let rsrc in sampleData.resources) {
      let sampleResource: ResourceType = {
        ...sampleData.resources[rsrc],
        createdAt: new Date().valueOf(),
      };
      await resourceDB.resources.add(sampleResource);
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
  const newResource: ResourceType = {
    id: uuid(),
    title: resourceName,
    eventColor: getRandomColor(),
    createdAt: new Date().valueOf(),
  };
  await resourceDB.resources.add(newResource);
  calendarApi?.addResource(newResource);
};

export const getResourceFromResourceApi = (
  calendarApi?: CalendarApi
): ResourceType[] => {
  let resourcesArray: ResourceType[] = [];
  let calendarResources = calendarApi?.getResources();
  if (calendarResources)
    for (let idx = 0; idx < calendarResources.length; idx++) {
      resourcesArray.push({
        id: calendarResources[idx].id,
        title: calendarResources[idx].title,
        eventColor: calendarResources[idx].eventBackgroundColor,
        createdAt: calendarResources[idx].extendedProps.createdAt,
      });
    }
  return resourcesArray;
};
export const editResource = async (
  singleResource: ResourceType,
  calendarApi: CalendarApi
) => {
  await resourceDB.resources.update(singleResource.id, singleResource);
  calendarApi?.getResourceById(singleResource.id)?.remove();
  calendarApi?.addResource(singleResource);
};
export const deleteResource = async (
  singleResource: ResourceType,
  calendarApi: CalendarApi
) => {
  if (singleResource) {
    let events = await eventsDB.events
      .where("resourceId")
      .equals(singleResource.id)
      .toArray();
    for (let ev in events) {
      await eventsDB.events.delete(events[ev].id);
    }
    await resourceDB.resources.delete(singleResource.id);
    calendarApi.getResourceById(singleResource.id)?.remove();
  }
};
///OPERATIONS
export const fetchOperations = async () => {
  let residentOperations: number = await operationsDB.operations.count();
  if (residentOperations === 0) {
    for (let op in sampleData.operations) {
      let sampleOperations: Operation = {
        ...sampleData.operations[op],
        createdAt: new Date().valueOf(),
      };
      await operationsDB.operations.add(sampleOperations);
    }
  }
};
export const addOperation = async (operationName: string) => {
  const newOperation: Operation = {
    id: uuid(),
    title: operationName,
    createdAt: new Date().valueOf(),
  };
  await operationsDB.operations.add(newOperation);
};
