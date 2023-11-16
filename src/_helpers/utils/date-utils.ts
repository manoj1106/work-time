export class DateUtils {
  public static readonly DDMMYYYY_HIPHAN = 'dd-MM-yyyy';
  public static readonly YYYYMMDD_HIPHAN = 'yyyy-MM-dd';
  public static readonly DDMMYYYY_SLASH = 'dd/MM/yyyy';
  public static readonly MMDDYYYY_SLASH = 'MM/dd/yyyy';
  public static readonly DDMMYYYY_DOT = 'dd.MM.yyyy';

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
}
