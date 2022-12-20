import FullCalendar, { CalendarApi, EventApi } from "@fullcalendar/react";

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
  minutes: number;
};

export type addDialogProps = {
  open: boolean;
  openHandler: (id: string, show: boolean) => void;
  resourceId: string;
  start: Date;
  calendarRef: React.RefObject<FullCalendar>;
  // event: EventType;
  // setEvent: (event: EventType) => void;
};

export type editDialogProps = {
  open: boolean;
  openHandler: (id: string, show: boolean) => void;
  event: EventApi | undefined;
  calendarRef: React.RefObject<FullCalendar>;
};
