import "./App.css";
import Header from "./components/Header/Header";
import { useState } from "react";

function App() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [annualInvestment, setAnnualInvestment] = useState(1200);
  const [expectedReturn, setExpectedReturn] = useState(6);
  const [duration, setDuration] = useState(10);
  const [result, setResult] = useState();

  function calculateFV() {
    if (
      initialInvestment === 0 &&
      annualInvestment === 0 &&
      expectedReturn === 0 &&
      duration === 0
    ) {
      alert("All values cannot be 0.");
      return;
    }

    if (duration > 100) {
      alert("Max Duration Is 100 Years.");
      return;
    }

    const newResult = [];

    for (let i = 1; i <= duration; i++) {
      const part1 = Math.pow(1 + expectedReturn / 100, i);
      const lhs = initialInvestment * part1;
      const rhs = annualInvestment * ((part1 - 1) / (expectedReturn / 100));
      const futureValue = lhs + rhs;
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear() - 1;
      let newCurrentYear = currentYear + i;
      newResult.push({ i, value: futureValue.toFixed(2), newCurrentYear });
    }

    setResult(newResult);
  }

  function resetValues() {
    setInitialInvestment(10000);
    setAnnualInvestment(1200);
    setExpectedReturn(6);
    setDuration(10);
    setResult([]);
  }

  const formatCurrency = (value) => {
    // Assuming you want to format the value as ₹ with commas for thousands separator
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  return (
    <>
      <Header />
      <div className="container">
        <p>
          <label>Initial Investment</label>
          <input
            min="0"
            type="number"
            required
            placeholder="Enter Value"
            value={initialInvestment}
            onChange={(e) =>
              setInitialInvestment(parseFloat(e.target.value) || 0)
            }
          />
          <label>Annual Investment</label>
          <input
            min="0"
            type="number"
            required
            placeholder="Enter Value"
            value={annualInvestment}
            onChange={(e) =>
              setAnnualInvestment(parseFloat(e.target.value) || 0)
            }
          />
        </p>
        <p>
          <label>Expected Return (%)</label>
          <input
            min="0"
            type="number"
            required
            placeholder="Enter Value"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(parseFloat(e.target.value) || 0)}
          />
          <label>Duration (Years)</label>
          <input
            min="0"
            type="number"
            required
            placeholder="Enter Value"
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value) || 0)}
          />
        </p>
        <p className="btn">
          <button onClick={calculateFV}>Calculate</button>
          <button id="reset" onClick={resetValues}>
            Reset
          </button>
        </p>
        {result &&
          result.map((item) => (
            <p className="list" key={item.i}>
              Year : {item.newCurrentYear} | Future Value :{" "}
              {formatCurrency(item.value)}
            </p>
          ))}
      </div>
    </>
  );
}

export default App;
