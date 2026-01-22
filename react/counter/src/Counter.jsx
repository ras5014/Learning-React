import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Import actions from local counterSlice
// This allows Counter to work both:
// 1. Standalone: uses local store with local slice
// 2. Federated: uses host's store but with same action creators
// The store (local or host) determines which reducer state is used
import { increment, decrement } from "./features/counter/counterSlice";

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
