import { atom, selector } from "recoil";

const count = atom({
  key: "clickCount",
  default: 0,
});

const countSelector = selector({
  key: "countSelector",
  get: ({ get }) => {
    return get(count);
  },
  set: ({ set }, newVal) => {
    set(count, newVal);
  },
});

export { count, countSelector };
