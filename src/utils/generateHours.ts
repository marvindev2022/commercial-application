interface IInterval {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function generateHours(
  start: Date,
  end: Date,
  interval: IInterval,
) {
  const hours: any = [];
  const current = start;
  while (current < end) {
    hours.push(current.toISOString());
    current.setHours(current.getHours() + interval.hours);
    current.setMinutes(current.getMinutes() + interval.minutes);
    current.setSeconds(current.getSeconds() + interval.seconds);
  }
  return hours;
}
