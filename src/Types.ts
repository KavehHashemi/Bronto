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

export type ResourceType = {
  id: string;
  title: string;
  eventColor: string;
  createdAt: number;
};

export type Operation = {
  id: string;
  title: string;
};

export type Duration = {
  hours: number;
  minutes: number;
};

export type EventComponentProps = {
  event: EventType;
  calendarRef: React.RefObject<FullCalendar>;
  isNew: boolean;
  open: boolean;
  openHandler: () => void;
};

export type ResourceComponentProps = {
  calendarRef: React.RefObject<FullCalendar>;
  open: boolean;
  openHandler: () => void;
};

export type ResourceListComponentProps = {
  resources: ResourceType[];
  calendarRef: React.RefObject<FullCalendar>;
};

export type SingleResourceComponentProps = {
  resource: ResourceType;
  calendarRef: React.RefObject<FullCalendar>;
};

export type InfoComponentProps = {
  open: boolean;
  openHandler: () => void;
};

export type DialogProps = {
  contentType: ContentType;
  content: EventType | string;
  calendarRef: React.RefObject<FullCalendar>;
  show: boolean;
  handleShow: () => void;
};

export type ConfirmationDialogProps = {
  title: string;
  type: ContentType;
  open: boolean;
  openHandler: React.Dispatch<React.SetStateAction<boolean>>;
  confirmation: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DateComponentProps = {
  calendarRef: React.RefObject<FullCalendar>;
  open: boolean;
  openHandler: () => void;
};

export enum ContentType {
  event = "event",
  resource = "resource",
  date = "date",
  info = "info",
}
