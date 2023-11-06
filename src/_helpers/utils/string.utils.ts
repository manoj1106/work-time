import { Consts } from '../consts/consts';

export class StringUtils {
  private constructor() {}

  /**
   *
   * @param obj
   * @returns true|false
   * obj === null then return true
   * obj === undefined then return true
   * true if the object is null or undefined else return false
   *
   */
  public static isNullOrUndefined = (obj: any) => {
    if (null === obj || undefined === obj) {
      return true;
    }
    return false;
  };

  /**
   *
   * @param str
   * @returns true|false
   * str === null then return true
   * str === undefined then return true
   * str === '' then return true
   * true if the str is null or undefined or empty else return false
   *
   */
  public static isBlank = (str: string) => {
    return this.isNullOrUndefined(str) || Consts.EMPTY === str.trim();
  };

  /**
   *
   * @param str
   * @returns true|false
   * str.trim() === '' then return true
   *
   */
  public static isEmpty = (str: string) => {
    if (Consts.EMPTY === str.trim()) {
      return true;
    }
    return false;
  };

  /**
   *
   * @param str
   * @returns true|false
   * isNullOrUndefined(str) return false
   * isEmpty(str) return false
   *
   */
  public static isNotBlank = (str: string) => {
    return !this.isBlank(str);
  };

  /**
   *
   * @param object
   * @returns true|false
   *
   */
  public static isEmptyObject = (object: any) => {
    if (Object.keys(object).length === 0) {
      return true;
    }
    return false;
  };
}
