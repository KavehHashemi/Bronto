export type EventType = {
  id: string | null;
  resourceId: string | null;
  title: string | null;
  start: Date | null;
  end: Date | null;
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
