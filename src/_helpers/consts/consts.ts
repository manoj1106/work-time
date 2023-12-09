export class Consts {
  private constructor() {}
  public static readonly EMPTY = '';
  public static readonly SPACE = ' ';
  public static readonly COMMA = ',';
  public static readonly DOT = '.';
  public static readonly DEFAULT_SCALE = 2;
  public static readonly JANUARY = 'January';
  public static readonly FEBRUARY = 'February';
  public static readonly MARCH = 'March';
  public static readonly APRIL = 'April';
  public static readonly MAY = 'May';
  public static readonly JUNE = 'June';
  public static readonly JULY = 'July';
  public static readonly AUGUST = 'August';
  public static readonly SEPTEMBER = 'September';
  public static readonly OCTOBER = 'October';
  public static readonly NOVEMBER = 'November';
  public static readonly DECEMBER = 'December';

  public static MONTH_NAMES: string[] = [
    Consts.JANUARY,
    Consts.FEBRUARY,
    Consts.MARCH,
    Consts.APRIL,
    Consts.MAY,
    Consts.JUNE,
    Consts.JULY,
    Consts.AUGUST,
    Consts.SEPTEMBER,
    Consts.OCTOBER,
    Consts.NOVEMBER,
    Consts.DECEMBER,
  ];

  public static MONTH_NUMBERS: any = {
    [Consts.JANUARY]: 0,
    [Consts.FEBRUARY]: 1,
    [Consts.MARCH]: 2,
    [Consts.APRIL]: 3,
    [Consts.MAY]: 4,
    [Consts.JUNE]: 5,
    [Consts.JULY]: 6,
    [Consts.AUGUST]: 7,
    [Consts.SEPTEMBER]: 8,
    [Consts.OCTOBER]: 9,
    [Consts.NOVEMBER]: 10,
    [Consts.DECEMBER]: 11,
  };
}
