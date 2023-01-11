import Dexie, { Table } from "dexie";
import { ResourceType } from "../Types";

export class ResourceDB extends Dexie {
  resources!: Table<ResourceType>;
  constructor() {
    super("ResourceDB");
    this.version(1).stores({
      resources: "id",
    });
  }
}

export const resourceDB = new ResourceDB();
