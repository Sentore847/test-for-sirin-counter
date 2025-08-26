import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Counter.module.css";

interface CounterProps {
  value: number;
  onInc: () => void;
  onDec: () => void;
}

export function Counter({ value, onInc, onDec }: CounterProps) {
  const valueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (valueRef.current) {
      gsap.fromTo(
        valueRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [value]);

  return (
    <div className={styles.counter}>
      <div ref={valueRef} className={styles.value}>{value}</div>
      <div className={styles.buttons}>
        <button onClick={onDec} className={`${styles.button} ${styles.dec}`}>-</button>
        <button onClick={onInc} className={`${styles.button} ${styles.inc}`}>+</button>
      </div>
    </div>
  );
}
