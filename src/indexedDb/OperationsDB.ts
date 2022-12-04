import Dexie, { Table } from "dexie";
import { Operation } from "../Types";

export class OperationsDB extends Dexie {
  operations!: Table<Operation>;
  constructor() {
    super("OperationsDB");
    this.version(1).stores({
      operations: "id",
    });
  }
}

export const operationsDB = new OperationsDB();
