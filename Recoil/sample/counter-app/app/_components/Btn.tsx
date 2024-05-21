import { useSetRecoilState } from "recoil";
import { countSelector } from "../_recoil/atom";

export const Btn = () => {
  const setCount = useSetRecoilState(countSelector);
  const onClick = () => {
    setCount((prev) => {
      return prev + 1;
    });
  };
  return <button onClick={onClick}>increment</button>;
};
