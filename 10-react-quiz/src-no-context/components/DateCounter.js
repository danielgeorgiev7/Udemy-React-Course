import { useReducer } from "react";

// for useReducer practice only

export function DateCounter() {
  const initialState = { count: 0, step: 1 };
  const date = new Date("june 21 2027");

  function reducer(state, action) {
    date.setDate(date.getDate() + state.count);
    switch (action.type) {
      case "inc":
        return { ...state, count: state.count + state.step };
      case "dec":
        return { ...state, count: state.count - state.step };
      case "setCount":
        return { ...state, count: Number(action.payload) };
      case "setStep":
        return { ...state, step: Number(action.payload) };
      case "reset":
        return initialState;
      default:
        throw new Error("Unknown action");
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={(e)=> dispatch({ type: "setStep", payload: e.target.value })}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: "dec" })}>-</button>
        <input value={state.count} onChange={(e)=>dispatch({ type: "setCount", payload: e.target.value })} />
        <button onClick={() => dispatch({ type: "inc" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
