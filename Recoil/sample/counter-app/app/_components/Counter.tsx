import { useRecoilValue } from "recoil";
import { count } from "../_recoil/atom";

export const Counter = () => {
  const cnt = useRecoilValue(count);
  return <div>{cnt}</div>;
};
