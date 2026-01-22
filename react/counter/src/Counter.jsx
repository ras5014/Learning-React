import React from "react";
import { useSelector, useDispatch } from "react-redux";
const { increment, decrement } = await import("host/counterSlice");

export function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
