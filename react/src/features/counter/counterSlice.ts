// Action Types
export const INCREMENT = "counter/increment";
export const DECREMENT = "counter/decrement";
export const INCREMENT_BY_AMOUNT = "counter/incrementByAmount";

// State Interface
export interface CounterState {
  value: number;
}

// Initial State
const initialState: CounterState = {
  value: 0,
};

// Action Creators
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const incrementByAmount = (amount: number) => ({
  type: INCREMENT_BY_AMOUNT,
  payload: amount,
});

// Action Types Union
type CounterAction =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof incrementByAmount>;

// Reducer
const counterReducer = (
  state: CounterState = initialState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    case DECREMENT:
      return { ...state, value: state.value - 1 };
    case INCREMENT_BY_AMOUNT:
      return { ...state, value: state.value + action.payload };
    default:
      return state;
  }
};

export default counterReducer;
