"use client";

import React from "react";
import ServerComponent from "./ServerComponent";

export default function ClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>My client component</h1>
      <ServerComponent />
    </div>
  );
}
