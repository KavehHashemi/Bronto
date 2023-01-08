import FullCalendar from "@fullcalendar/react";

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
  eventColor: string;
  createdAt: number;
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
  //openHandler: (id: string, show: boolean) => void;
  openHandler: React.Dispatch<React.SetStateAction<ShowDialog>>;
  calendarRef: React.RefObject<FullCalendar>;
  event: EventType;
  isNew: boolean;
};

export type DeleteDialogProps = {
  type: entityType;
  entity: EventType | Resource;
  //id: string;
  open: ShowDialog;
  //openHandler: (id: string, show: boolean) => void;
  openHandler: React.Dispatch<React.SetStateAction<ShowDialog>>;
  //confirmDelete: (id: string) => void;
  calendarRef: React.RefObject<FullCalendar>;
};

export type ResourceDialogProps = {
  open: ShowDialog;
  //openHandler: (id: string, show: boolean) => void;
  openHandler: React.Dispatch<React.SetStateAction<ShowDialog>>;
  calendarRef: React.RefObject<FullCalendar>;
  array: Resource[];
};

export type ResourceComponentProps = {
  open: ShowDialog;
  openHandler: React.Dispatch<React.SetStateAction<ShowDialog>>;
  resource: Resource;
  calendarRef: React.RefObject<FullCalendar>;
};

export enum entityType {
  event = "event",
  resource = "resource",
}
