import { useState, useMemo } from "react";
import { Counter } from "@components/Counter/Counter";
import { TransportSelector } from "@components/TransportSelector/TransportSelector";

import { httpTransport } from "@transport/httpTransport";
import { wsTransport } from "@transport/wsTransport";
import { cliTransport } from "@transport/cliTransport";

import { useCounter } from "@hooks/useCounter";
import type { TransportMode } from "./types/transport";

export default function App() {
  const [mode, setMode] = useState<TransportMode>("http");

  const transport = useMemo(() => {
    if (mode === "http") return httpTransport;
    if (mode === "ws") return wsTransport();
    return cliTransport;
  }, [mode]);

  const { value, inc, dec } = useCounter(transport);

  return (
    <div className="app">
      <Counter value={value ?? 0} onInc={inc} onDec={dec} />
      <TransportSelector
        options={["http", "ws", "cli"]}
        selected={mode}
        onSelect={(value: string) => setMode(value as TransportMode)}
      />
    </div>
  );
}
