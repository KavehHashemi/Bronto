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

export type DeleteResourceDialogProps = {
  resourceTitle: string;
  index?: number;
  // open: ShowDialog;
  // openHandler: React.Dispatch<React.SetStateAction<ShowDialog>>;
  confirmDelete: (idx: number) => void;
  //entity: EventType | Resource;
  //id: string;
  //openHandler: (id: string, show: boolean) => void;
  //calendarRef: React.RefObject<FullCalendar>;
};

export type DeleteEventDialogProps = {
  eventTitle: string;
  open: ShowDialog;
  openHandler: React.Dispatch<React.SetStateAction<ShowDialog>>;
  confirmDelete: () => void;
};

export type ResourceDialogProps = {
  open: ShowDialog;
  //openHandler: (id: string, show: boolean) => void;
  openHandler: React.Dispatch<React.SetStateAction<ShowDialog>>;
  calendarRef: React.RefObject<FullCalendar>;
  //array: Resource[];
};

export type ResourceListComponentProps = {
  // open: ShowDialog;
  // openHandler: React.Dispatch<React.SetStateAction<ShowDialog>>;
  resources: ResourceType[];
  calendarRef: React.RefObject<FullCalendar>;
};

export type DialogProps = {
  contentType: ContentType;
  content: EventType | ResourceType;
  calendarRef: React.RefObject<FullCalendar>;
  show: boolean;
  handleShow: () => void;
};

export enum ContentType {
  event = "event",
  resource = "resource",
  date = "date",
  info = "info",
  confirmation = "confirmation",
}
