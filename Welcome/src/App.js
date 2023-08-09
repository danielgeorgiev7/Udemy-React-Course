import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    let response = await fetch("https://api.adviceslip.com/advice");
    let data = await response.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
    return;
  }

  useEffect(function () {
    getAdvice();
  }, []);

  function Message(props) {
    return (
      <p>
        You have read <strong>{props.count}</strong> pieces of advice{" "}
      </p>
    );
  }

  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get advice</button>
      <Message count={count} />
    </div>
  );
}
