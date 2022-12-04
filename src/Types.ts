export type EventType = {
  id: string;
  resourceId: string;
  title: string | null;
  start: Date;
  end: Date;
  description: string | null;
  operations: string[] | null;
};

export type Resource = {
  id: string | null;
  name: string | null;
};

export type Operation = {
  id: string | null;
  name: string | null;
};

export type ShowDialog = {
  [id: string]: boolean;
};
export type Duration = {
  hours: number;
  minutes: 0 | 30;
};
