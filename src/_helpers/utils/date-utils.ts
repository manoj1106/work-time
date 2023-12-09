import { Consts } from '../consts/consts';
import { StringUtils } from './string.utils';

export class DateUtils {
  public static readonly DDMMYYYY_HIPHAN = 'dd-MM-yyyy';
  public static readonly YYYYMMDD_HIPHAN = 'yyyy-MM-dd';
  public static readonly DDMMYYYY_SLASH = 'dd/MM/yyyy';
  public static readonly MMDDYYYY_SLASH = 'MM/dd/yyyy';
  public static readonly DDMMYYYY_DOT = 'dd.MM.yyyy';

  public static formatDateTime = (num: number): string => {
    const formattedStr = (num < 10 ? '0' : '') + num;
    return formattedStr;
  };

  public static now = (): string => {
    const now = new Date();
    // day of month
    const d = this.formatDateTime(now.getDate());
    // month starts with number 0 for Jan so adding 1 to it to make Jan as 1 and Dec as 12
    const mon = now.getMonth() + 1;
    const m = this.formatDateTime(mon);
    const y = now.getFullYear();
    const h = this.formatDateTime(now.getHours());
    const mi = this.formatDateTime(now.getMinutes());
    const s = this.formatDateTime(now.getSeconds());
    const nowStr = `${d}-${m}-${y} ${h}:${m}:${s}`;
    return nowStr;
  };

  public static getFormattedDate = (d: Date) => {
    return this.getFormattedDateWith(this.DDMMYYYY_HIPHAN, d);
  };

  public static getFormattedDateWith = (format: string, d: Date) => {
    if (!d) {
      return '';
    }
    let dateFormat = format;
    if (!format) {
      dateFormat = this.DDMMYYYY_HIPHAN;
    }
    switch (dateFormat) {
      case this.DDMMYYYY_HIPHAN:
        return this.getDDMMYYYYHiphanFormattedDate(d);
      case this.YYYYMMDD_HIPHAN:
        return this.getYYYYMMDDHiphanFormattedDate(d);
      case this.DDMMYYYY_SLASH:
        return this.getDDMMYYYYSlashFormattedDate(d);
      case this.MMDDYYYY_SLASH:
        return this.getMMDDYYYYSlashFormattedDate(d);
      case this.DDMMYYYY_DOT:
        return this.getDDMMYYYYDotFormattedDate(d);
      default:
        return this.getDDMMYYYYHiphanFormattedDate(d);
    }
  };

  private static getDDMMYYYYHiphanFormattedDate(date: Date) {
    const y = date.getFullYear();
    const m = this.getMonthStr(date);
    const d = this.getDayStr(date);
    return `${d}-${m}-${y}`;
  }

  private static getYYYYMMDDHiphanFormattedDate(date: Date) {
    const y = date.getFullYear();
    const m = this.getMonthStr(date);
    const d = this.getDayStr(date);
    return `${y}-${m}-${d}`;
  }

  private static getDDMMYYYYSlashFormattedDate(date: Date) {
    const y = date.getFullYear();
    const m = this.getMonthStr(date);
    const d = this.getDayStr(date);
    return `${d}/${m}/${y}`;
  }

  private static getMMDDYYYYSlashFormattedDate(date: Date) {
    const y = date.getFullYear();
    const m = this.getMonthStr(date);
    const d = this.getDayStr(date);
    return `${m}/${d}/${y}`;
  }

  private static getDDMMYYYYDotFormattedDate(date: Date) {
    const y = date.getFullYear();
    const m = this.getMonthStr(date);
    const d = this.getDayStr(date);
    return `${d}.${m}.${y}`;
  }

  private static getMonthStr(d: Date) {
    const month = d.getMonth() + 1;
    const monthStr = month < 10 ? `0${month}` : month;
    return monthStr;
  }

  private static getDayStr(d: Date) {
    const day = d.getDate();
    const dayStr = day < 10 ? `0${day}` : day;
    return dayStr;
  }

  public static parseDate = (dateToParse: string): Date => {
    return this.parseDateWith(this.DDMMYYYY_HIPHAN, dateToParse);
  };

  public static parseDateWith = (
    pattern: string,
    dateToParse: string
  ): Date => {
    switch (pattern) {
      case this.DDMMYYYY_HIPHAN:
        return this.parseWithDDMMYYYY(dateToParse);
    }
    return new Date();
  };

  private static parseWithDDMMYYYY = (dateToParse: string) => {
    const array = dateToParse.split('-');
    return this.getDate(array[0], array[1], array[2]);
  };

  private static getDate = (day: string, month: string, year: string) => {
    const d = parseInt(day);
    const m = parseInt(month) - 1;
    const y = parseInt(year);
    const date = new Date(y, m, d);
    return date;
  };

  public static getFullMonth = (month: number) => {
    return Consts.MONTH_NAMES[month];
  };
}
