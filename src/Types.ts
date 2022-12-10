export type EventType = {
  id: string;
  resourceId: string;
  title: string;
  start: Date;
  end: Date;
  description: string | null;
  operations: string[] | null;
};

export type Resource = {
  id: string;
  name: string;
};

export type Operation = {
  id: string;
  name: string;
};

export type ShowDialog = {
  [id: string]: boolean;
};
export type Duration = {
  hours: number;
  minutes: 0 | 30;
};
