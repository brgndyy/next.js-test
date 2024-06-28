const isObject = (obj: any): boolean => obj !== null && typeof obj === "object";

const compareDeepEqual = (
  obj1: any,
  obj2: any,
  seen = new WeakMap()
): boolean => {
  if (obj1 === obj2) {
    return true;
  }

  if (!isObject(obj1) || !isObject(obj2)) {
    return false;
  }

  if (seen.has(obj1)) {
    return seen.get(obj1) === obj2;
  }

  seen.set(obj1, obj2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }

    if (!compareDeepEqual(obj1[key], obj2[key], seen)) {
      return false;
    }
  }

  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }

  if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
    return obj1.toString() === obj2.toString();
  }

  if (obj1 instanceof Map && obj2 instanceof Map) {
    if (obj1.size !== obj2.size) {
      return false;
    }
    for (const [key, value] of obj1.entries()) {
      if (!obj2.has(key) || !compareDeepEqual(value, obj2.get(key), seen)) {
        return false;
      }
    }
  }

  if (obj1 instanceof Set && obj2 instanceof Set) {
    if (obj1.size !== obj2.size) {
      return false;
    }
    for (const value of obj1.values()) {
      if (!obj2.has(value)) {
        return false;
      }
    }
  }

  return true;
};

export default compareDeepEqual;
