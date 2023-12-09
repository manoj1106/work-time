export class RegexValidator {
  private constructor() {}

  public static isValid = (pattern: RegExp, value: any): boolean => {
    const isValid = pattern.test(value);
    return isValid;
  };
}
