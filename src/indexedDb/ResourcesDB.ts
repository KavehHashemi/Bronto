import Dexie, { Table } from "dexie";
import { Resource } from "../Types";

export class ResourceDB extends Dexie {
  resources!: Table<Resource>;
  constructor() {
    super("ResourceDB");
    this.version(1).stores({
      resources: "id",
    });
  }
}

export const resourceDB = new ResourceDB();
