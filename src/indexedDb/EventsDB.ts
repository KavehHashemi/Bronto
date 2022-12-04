import Dexie, { Table } from "dexie";
import { EventType } from "../Types";

export class EventsDB extends Dexie {
  events!: Table<EventType>;
  constructor() {
    super("EventsDB");
    this.version(1).stores({
      events: "id",
    });
  }
}

export const eventsDB = new EventsDB();
