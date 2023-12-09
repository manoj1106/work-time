export class RegexValidator {
  private constructor() {}

  public static isValid = (pattern: string, value: any) => {
    let regex = new RegExp(pattern);
    return regex.test(value);
  };
}
