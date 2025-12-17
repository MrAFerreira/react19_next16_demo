"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="text-2xl">Count: {count}</h1>
      <div className="flex gap-4">
        <button className="btn btn-info" onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <button className="btn btn-warning" onClick={() => setCount(count - 1)}>
          Decrement
        </button>
      </div>
    </div>
  );
}
