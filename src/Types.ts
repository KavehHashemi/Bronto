import { EventApi } from "@fullcalendar/react";

export type EventType = {
  id: string;
  resourceId: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  operations: string[];
};

export type Resource = {
  id: string;
  title: string;
};

export type Operation = {
  id: string;
  title: string;
};

export type ShowDialog = {
  [id: string]: boolean;
};
export type Duration = {
  hours: number;
  minutes: 0 | 30;
};

export type addDialogProps = {
  open: boolean;
  openHandler: (id: string, show: boolean) => void;
  resourceId: string;
  start: Date;
  // event: EventType;
  // setEvent: (event: EventType) => void;
};

export type editDialofProps = {
  open: boolean;
  openHandler: (id: string, show: boolean) => void;
  event: EventType | undefined;
};
