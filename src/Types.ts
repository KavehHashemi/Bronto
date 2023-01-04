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

export type EventDialogProps = {
  open: ShowDialog;
  openHandler: (id: string, show: boolean) => void;
  calendarRef: React.RefObject<FullCalendar>;
  event: EventType;
  isNew: boolean;
};

export type DeleteDialogProps = {
  open: ShowDialog;
  openHandler: (id: string, show: boolean) => void;
  confirmDelete: () => void;
};

export type ResourceDialogProps = {
  open: ShowDialog;
  openHandler: (id: string, show: boolean) => void;
  calendarRef: React.RefObject<FullCalendar>;
  array: Resource[];
};

export type ResourceComponentProps = {
  resource: Resource;
  calendarRef: React.RefObject<FullCalendar>;
};
