import { RegexValidator } from './regex.validator';
import { StringUtils } from './string.utils';
import { _24HOUR_TIME_FORMAT } from '../consts/regex.consts';
import { DEFAULT_CIPHERS } from 'tls';

export class TimeUtils {
  public static readonly SEC: number = 1000;
  public static readonly MIN: number = this.SEC * 60;
  public static readonly HRS: number = this.MIN * 60;
  public static readonly DEFAULT_TIME: string = '00:00';

  private constructor() {}

  /**
   *
   * @param inputTime time to check
   * @returns isValid return true if the time is valid else returns false
   *
   */
  public static isTimeValid = (inputTime?: string) => {
    let isValid: boolean = false;
    if (
      StringUtils.isBlank(inputTime) ||
      (inputTime && inputTime.length !== 5)
    ) {
      isValid = false;
    }
    if (RegexValidator.isValid(_24HOUR_TIME_FORMAT, inputTime)) {
      isValid = true;
    }
    return isValid;
  };

  /**
   *
   * @param time time in format hh:mm
   * @returns hours actual hours out of the time
   *
   */
  public static convertTimeToHours = (time: string): number => {
    const timeParts = time.split(':');
    const hourPartToMinutes = Math.floor(Number(timeParts[0]) * 60);
    const minutePart = Number(timeParts[1]);
    // converting to hours
    const totalHours = (hourPartToMinutes + minutePart) / 60;
    return totalHours;
  };

  public static convertHoursToTime = (time: number): string => {
    let decimalTime = time * 60 * 60;
    let h = Math.floor(decimalTime / (60 * 60));
    decimalTime = decimalTime - h * 60 * 60;
    const m = Math.floor(decimalTime / 60);
    const hours = h < 9 ? `0${h}` : h;
    const minutes = m < 9 ? `0${m}` : m;
    const convertedTime = `${hours}:${minutes}`;
    return convertedTime;
  };

  /**
   *
   * @param time time in format hh:mm
   * @returns date date object at time
   *
   */
  public static getDate = (time: string) => {
    const timeArray = time.split(':');
    const h = Number(timeArray[0]);
    const m = Number(timeArray[1]);
    const date = new Date(0, 0, 0, h, m, 0);
    return date;
  };

  /**
   *
   * @param start start date
   * @param end end date
   * @returns difference of the time between two dates
   *
   */
  public static getDifference = (start: Date, end: Date) => {
    let diff = end.getTime() - start.getTime();
    var hours = Math.floor(diff / this.HRS);
    diff -= hours * this.HRS;
    var minutes = Math.floor(diff / this.MIN);
    const hrsStr = hours < 9 ? `0${hours}` : hours;
    const minutesStr = minutes < 9 ? `0${minutes}` : minutes;
    const time = `${hrsStr}:${minutesStr}`;
    return time;
  };

  /**
   *
   * @param fromTime time in format hh:mm
   * @param toTime time in format hh:mm
   * @returns time difference in format hh:mm
   *
   */
  public static getTimeDifference = (fromTime?: string, toTime?: string) => {
    if (StringUtils.isBlank(fromTime) || StringUtils.isBlank(toTime)) {
      return this.DEFAULT_TIME;
    }
    if (fromTime && toTime) {
      const startDate = this.getDate(fromTime);
      const endDate = this.getDate(toTime);
      return this.getDifference(startDate, endDate);
    }
    return this.DEFAULT_TIME;
  };

  /**
   *
   * @param d date object
   * @returns time in format hh:mm
   *
   */
  public static getTimeFromDate = (d: Date) => {
    const h = d.getHours() < 9 ? `0${d.getHours()}` : d.getHours();
    const m = d.getMinutes() < 9 ? `0${d.getMinutes()}` : d.getMinutes();
    const time = `${h}:${m}`;
    return time;
  };

  public static getTime = (time?: string): string => {
    if (!time || StringUtils.isBlank(time)) {
      return this.DEFAULT_TIME;
    }
    return time;
  };
}
