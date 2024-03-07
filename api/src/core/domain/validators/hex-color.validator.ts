export class HexColorValidator {
  public static execute(str: string) {
    if (!str.startsWith('#')) {
      return false;
    }

    const colorWithoutHashtag = str.slice(1);

    const hexPattern = /^[0-9a-fA-F]{6}$/;
    return hexPattern.test(colorWithoutHashtag);
  }
}
