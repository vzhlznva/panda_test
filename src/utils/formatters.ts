// import moment from "moment";
import moment from "moment-timezone";
// https://momentjs.com/docs/#/i18n/

export function formatDate(value: string | Date) {
  if (value) {
    return moment(new Date(value)).format("DD.MM.YYYY");
  }
}

export function formatDateBack(value: string | Date) {
  if (value) {
    return moment(new Date(value)).format("YYYY-MM-DD");
  }
}

export function formatTime(value: string | Date) {
  if (value) {
    return moment(new Date(value)).format("HH:mm");
  }
}
export function formatDateTime(value: string | Date) {
  if (value) {
    return moment(new Date(value)).format("DD.MM.YYYY HH:mm");
  }
}

export function formatDay(value: string | Date) {
  if (value) {
    return moment(new Date(value)).format("dddd");
  }
}

export function formatDayByTimeZone(tz: string) {
  if (tz) {
    return moment(new Date()).tz(tz).format("dddd");
  }
}

export function formatDateByTimeZone(tz: string) {
  if (tz) {
    return moment(new Date()).tz(tz).format("DD MMM[,] YYYY");
  }
}

export function formatUnixTime(time: number, tz: number) {
  return moment
    .unix(time)
    .utcOffset(tz / 60)
    .format("HH:mm");
}
