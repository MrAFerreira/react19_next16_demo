"use client";

import { useState, Activity } from "react";
import Counter from "./Counter";

export default function CounterSection() {
  const [showCounter, setShowCounter] = useState(false);

  return (
    <div className="mt-4">
      <button
        className="btn btn-primary"
        onClick={() => setShowCounter(!showCounter)}>
        {showCounter ? "Hide" : "Show"}
      </button>

      <Activity mode={showCounter ? "visible" : "hidden"}>
        <Counter />
      </Activity>

      {/* {showCounter && <Counter />} */}
    </div>
  );
}
