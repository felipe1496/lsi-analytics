export class Utils {
  public static isDeepEqual(obj1: any, obj2: any) {
    if (obj1 === obj2) {
      return true;
    }

    if (
      typeof obj1 !== 'object' ||
      obj1 === null ||
      typeof obj2 !== 'object' ||
      obj2 === null
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!keys2.includes(key) || !this.isDeepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  public static objectWithout<T extends Record<string, any>>(
    path: string,
    obj: T,
  ) {
    const keys = path.split('.');
    const key = keys.shift();

    if (key === undefined) {
      return {};
    }

    if (keys.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: omit, ...rest } = obj;
      return rest;
    }

    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      return {
        [key]: this.objectWithout(keys.join('.'), value as any),
        ...(Object.keys(obj)
          .filter((k) => k !== key)
          .reduce((acc, k) => {
            acc[k] = obj[k];
            return acc;
          }, {}) as Partial<T>),
      };
    }

    return obj;
  }
}
