import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { type RootState } from "./state/store";
import { decrement, increment, incrementByAmount } from "./state/counter/counterSlice";
import { useState } from "react";

function App() {
  const [incrementAmount, setIncrementAmount] = useState<number>(0);
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);
  return (
    <>
      <h1>React Redux ToolKit Example</h1>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <br />
      <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>Increment by: </button>
      <input type="number" placeholder="0" onChange={(e) => setIncrementAmount(Number(e.target.value))} />
    </>
  );
}

export default App;
