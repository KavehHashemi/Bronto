export const addHours = (hours: number, time?: Date) => {
  let newTime = time ? time : new Date(Date.now());
  newTime.setHours(newTime.getHours() + hours);
  return newTime;
};
