import React from "react";
import { heightDataItems, weightDataItems } from "../FitnessData";

describe("heightDataItems", () => {
  it("should generate height data items in centimeters", () => {
    const isFeet = false;
    const items = heightDataItems(isFeet);

    expect(items).toHaveLength(121); // 220 - 100 + 1

    for (let i = 100; i <= 220; i++) {
      expect(items[i - 100].key).toBe(i.toString());
      expect(items[i - 100].props.label).toBe(`${i} cm`);
      expect(items[i - 100].props.value).toBe(i);
    }
  });

  it("should generate height data items in feet and inches", () => {
    const isFeet = true;
    const items = heightDataItems(isFeet);

    expect(items).toHaveLength(48); // 4 * 12

    let index = 0;
    for (let i = 4; i <= 7; i++) {
      for (let j = 0; j <= 11; j++) {
        const value = Math.round(i * 30.48 + j * 2.54);

        expect(items[index].key).toBe(`${i}-${j}`);
        expect(items[index].props.label).toBe(`${i}'${j}"`);
        expect(items[index].props.value).toBe(value);

        index++;
      }
    }
  });
});

describe("weightDataItems", () => {
  it("should generate weight data items in kilograms", () => {
    const isPound = false;
    const items = weightDataItems(isPound);

    expect(items).toHaveLength(171); // 200 - 30 + 1

    for (let i = 30; i <= 200; i++) {
      expect(items[i - 30].key).toBe(i.toString());
      expect(items[i - 30].props.label).toBe(`${i} KG`);
      expect(items[i - 30].props.value).toBe(i);
    }
  });

  it("should generate weight data items in pounds", () => {
    const isPound = true;
    const items = weightDataItems(isPound);

    expect(items).toHaveLength(411); // 440 - 30 + 1

    for (let i = 30; i <= 440; i++) {
      const value = Math.round(i * 0.453);

      expect(items[i - 30].key).toBe(i.toString());
      expect(items[i - 30].props.label).toBe(`${i} LBS`);
      expect(items[i - 30].props.value).toBe(value);
    }
  });
});
