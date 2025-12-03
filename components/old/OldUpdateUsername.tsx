import { redirect } from "next/navigation";
import { useState } from "react";

function UpdateUserName() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true);
    try {
      /* @ts-expect-error test component */
      const result = await updateName(name);
      if (result.error) {
        setError(result.error);
      } else {
        redirect("/dashboard");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
