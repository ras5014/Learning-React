import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../app/store";

import { increment, decrement, incrementByAmount } from "../counterSlice";

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>
        Increment by 10
      </button>
    </>
  );
}

export default Counter;
