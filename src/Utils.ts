export const addHours = (hours: number, time?: Date) => {
  const newTime = time ? time : new Date(Date.now());
  newTime.setHours(newTime.getHours() + hours);
  return newTime;
};
