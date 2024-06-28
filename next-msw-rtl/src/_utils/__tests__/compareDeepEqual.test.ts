import compareDeepEqual from "../compareDeepEqual";

describe("깊은 비교를 도와주는 compareDeepEqual 유틸함수에 대한 테스트 코드 작성", () => {
  it("같은 원시값이라면 true를 반환한다.", () => {
    expect(compareDeepEqual(1, 1)).toBe(true);
    expect(compareDeepEqual("test", "test")).toBe(true);
    expect(compareDeepEqual(true, true)).toBe(true);
  });

  it("다른 원시값이라면 false를 반환한다.", () => {
    expect(compareDeepEqual(1, 2)).toBe(false);
    expect(compareDeepEqual("test", "diff")).toBe(false);
    expect(compareDeepEqual(true, false)).toBe(false);
  });

  it("같은 객체라면 true를 반환한다.", () => {
    const obj1 = { a: 1, b: { c: 2, d: { e: 3 } } };
    const obj2 = { a: 1, b: { c: 2, d: { e: 3 } } };
    expect(compareDeepEqual(obj1, obj2)).toBe(true);
  });

  it("다른 객체라면 false를 반환한다.", () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 3 } };
    expect(compareDeepEqual(obj1, obj2)).toBe(false);
  });

  it("같은 배열이라면 true를 반환한다.", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(compareDeepEqual(arr1, arr2)).toBe(true);
  });

  it("다른 배열이라면 false를 반환한다.", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 4];
    expect(compareDeepEqual(arr1, arr2)).toBe(false);
  });

  it("같은 날짜에 대해서 true를 반환한다.", () => {
    const date1 = new Date("2020-01-01");
    const date2 = new Date("2020-01-01");
    expect(compareDeepEqual(date1, date2)).toBe(true);
  });

  it("다른 날짜에 대해서 false를 반환한다.", () => {
    const date1 = new Date("2020-01-01");
    const date2 = new Date("2021-01-01");
    expect(compareDeepEqual(date1, date2)).toBe(false);
  });

  it("같은 정규식에 대해서 true를 반환한다.", () => {
    const reg1 = /abc/;
    const reg2 = /abc/;
    expect(compareDeepEqual(reg1, reg2)).toBe(true);
  });

  it("다른 정규식에 대해서 false를 반환한다.", () => {
    const reg1 = /abc/;
    const reg2 = /def/;
    expect(compareDeepEqual(reg1, reg2)).toBe(false);
  });

  it("같은 Map 객체에 대해서 true를 반환한다.", () => {
    const map1 = new Map([
      [1, "a"],
      [2, "b"],
    ]);
    const map2 = new Map([
      [1, "a"],
      [2, "b"],
    ]);
    expect(compareDeepEqual(map1, map2)).toBe(true);
  });

  it("다른 Map 객체에 대해서 false를 반환한다.", () => {
    const map1 = new Map([
      [1, "a"],
      [2, "b"],
    ]);
    const map2 = new Map([
      [1, "a"],
      [2, "c"],
    ]);
    expect(compareDeepEqual(map1, map2)).toBe(false);
  });

  it("같은 Set 객체에 대해서 true를 반환한다.", () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([1, 2, 3]);
    expect(compareDeepEqual(set1, set2)).toBe(true);
  });

  it("다른 Set 객체에 대해서 false를 반환한다.", () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([1, 2, 4]);
    expect(compareDeepEqual(set1, set2)).toBe(false);
  });

  it("순환 참조가 발생했을때 true를 반환한다.", () => {
    const obj1: any = { a: 1 };
    const obj2: any = { a: 1 };
    obj1.self = obj1;
    obj2.self = obj2;
    expect(compareDeepEqual(obj1, obj2)).toBe(true);
  });

  it("서로 순환 참조하는 값이 다르다면 false를 반환한다.", () => {
    const obj1: any = { a: 1 };
    const obj2: any = { a: 2 };
    obj1.self = obj1;
    obj2.self = obj2;
    expect(compareDeepEqual(obj1, obj2)).toBe(false);
  });
});
