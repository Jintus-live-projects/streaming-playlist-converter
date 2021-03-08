export class CommonUtils {

  static isNull(value: unknown): boolean {
    return value === null || typeof value === 'undefined';
  }

  static removeParametersFromUrl(url: string): string {
    if (CommonUtils.isNull(url)) {
      return url;
    }
    const indexToSlice = url.search(/[/?]/);
    return indexToSlice >= 0 ? url.slice(0, indexToSlice) : url;
  }
}
