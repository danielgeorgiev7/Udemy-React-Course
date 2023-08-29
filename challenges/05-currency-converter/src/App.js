import { useState, useEffect } from "react";

export default function App() {
  const [fromValue, setFromValue] = useState("USD");
  const [toValue, setToValue] = useState("EUR");
  const [num, setNum] = useState("");
  const [convertedNum, setConvertedNum] = useState("");

  useEffect(
    function () {
      async function converter() {
        let res = await fetch(
          `https://api.frankfurter.app/latest?amount=${num}&from=${fromValue}&to=${toValue}`
        );
        let data = await res.json();
        if (num !== "" && num !== 0 && fromValue !== toValue) {
          setConvertedNum(Object.values(data?.rates).at(0));
        } else if (fromValue === toValue) {
          setConvertedNum(num);
          return;
        } else {
          setConvertedNum("");
        }
      }
      converter();
    },
    [num, fromValue, toValue]
  );
  return (
    <div>
      <input
        value={num}
        onChange={(e) =>
          setNum(
            isNaN(Number(e.target.value)) || e.target.value === ""
              ? ""
              : Number(e.target.value)
          )
        }
        type="text"
      />
      <select value={fromValue} onChange={(e) => setFromValue(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toValue} onChange={(e) => setToValue(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {convertedNum.toFixed(2)} {convertedNum ? toValue : ""}
      </p>
    </div>
  );
}
