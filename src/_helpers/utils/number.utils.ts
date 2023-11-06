import { Consts } from '../consts/consts';

export class NumberUtils {
  private constructor() {}

  /**
   *
   * @param num
   * @param divisor
   * @returns division with default scale Consts.DEFAULT_SCALE
   *
   */
  public static divide = (num: number, divisor: number) => {
    return this.divideWithScale(num, divisor, Consts.DEFAULT_SCALE);
  };

  /**
   *
   * @param num
   * @param divisor
   * @param scale
   * @returns division
   *
   */
  public static divideWithScale = (
    num: number,
    divisor: number,
    scale: number
  ) => {
    let divisionResult = 0.0;
    if (num === 0) {
      return divisionResult;
    }
    divisionResult = num / divisor;
    return this.toFixedNumber(divisionResult, scale);
  };

  /**
   *
   * @param num
   * @param multiplier
   * @returns multiplication with default scale Consts.DEFAULT_SCALE
   *
   */
  public static multiply = (num: number, multiplier: number) => {
    return this.multiplyWithScale(num, multiplier, Consts.DEFAULT_SCALE);
  };

  /**
   *
   * @param num
   * @param multiplier
   * @param scale
   * @returns division
   *
   */
  public static multiplyWithScale = (
    num: number,
    multiplier: number,
    scale: number
  ) => {
    let multiplicationResult = num * multiplier;
    return this.toFixedNumber(multiplicationResult, scale);
  };

  public static toFixedNumber = (value: number, scale: number) => {
    const toFixedNumber = value.toFixed(scale).replace(/,/g, '.');
    return parseFloat(toFixedNumber);
  };

  public static isNotPositive = (num: number) => {
    if (num <= 0 || num <= 0.0) {
      return true;
    }
    return false;
  };

  public static isNegative = (num: number) => {
    if (num < 0 || num < 0.0) {
      return true;
    }
    return false;
  };
}
