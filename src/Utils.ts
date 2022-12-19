export const addHours = (hours: number, time?: Date) => {
  const newTime = time ? time : new Date(Date.now());
  newTime.setHours(newTime.getHours() + hours);
  return newTime;
};
export const addMinutes = (minutes: number, time?: Date) => {
  const newTime = time ? time : new Date(Date.now());
  newTime.setMinutes(newTime.getMinutes() + minutes);
  return newTime;
};
export const addDuration = (hours: number, minutes: number, time?: Date) => {
  const newTime = time ? time : new Date(Date.now());
  newTime.setHours(newTime.getHours() + hours);
  newTime.setMinutes(newTime.getMinutes() + minutes);
  return newTime;
};
