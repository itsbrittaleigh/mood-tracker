export function getDate(datetime: Date | string) {
  return new Date(datetime).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getTime(datetime: Date | string) {
  return new Date(datetime).toLocaleTimeString(undefined, {
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });
}

export function getDay(datetime: Date | string) {
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  const day = new Date(datetime).getDay();
  return days[day];
}
