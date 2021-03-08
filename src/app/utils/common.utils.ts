export class CommonUtils {

  static isNull(value: unknown): boolean {
    return value === null || typeof value === 'undefined';
  }
}
