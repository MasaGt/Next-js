import { count } from "../_recoil/atom";
import { useResetRecoilState } from "recoil";

export const ResetBtn = () => {
  const resetCount = useResetRecoilState(count);

  return <button onClick={resetCount}>reset</button>;
};
