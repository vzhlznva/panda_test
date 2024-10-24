import moment from "moment";
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
