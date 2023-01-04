import { Duration, EventType } from "./Types";

export const addHours = (hours: number, time?: Date): Date => {
  const newTime = time ? time : new Date(Date.now());
  newTime.setHours(newTime.getHours() + hours);
  return newTime;
};
export const addMinutes = (minutes: number, time?: Date): Date => {
  const newTime = time ? time : new Date(Date.now());
  newTime.setMinutes(newTime.getMinutes() + minutes);
  return newTime;
};
export const addDuration = (
  hours: number,
  minutes: number,
  time?: Date
): Date => {
  const newTime = time ? time : new Date(Date.now());
  newTime.setHours(newTime.getHours() + hours);
  newTime.setMinutes(newTime.getMinutes() + minutes);
  return newTime;
};

export const calculateEndFromDuration = (
  event: EventType,
  duration: Duration
): Date => {
  let calculatedEnd: Date = new Date(
    event.start.valueOf() +
      (duration.hours * 60 * 60 * 1000 + duration.minutes * 60 * 1000)
  );
  return calculatedEnd;
};

export const calculateEventsDuration = (event: EventType): Duration => {
  let diff = event.end.valueOf() - event.start.valueOf();
  let hours = Math.floor(diff / (1000 * 60 * 60));
  let minutes = Math.floor(diff / (1000 * 60)) - hours * 60;
  return { hours: hours, minutes: minutes };
};

export const getRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
