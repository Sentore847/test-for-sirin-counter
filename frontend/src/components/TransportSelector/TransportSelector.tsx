import styles from "./TransportSelector.module.css";

interface TransportSelectorProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export function TransportSelector({ options, selected, onSelect }: TransportSelectorProps) {
  return (
    <div className={styles.selector}>
      {options.map((opt) => (
        <button
          key={opt}
          className={`${styles.option} ${selected === opt ? styles.selected : ""}`}
          onClick={() => onSelect(opt)}
        >
          {opt.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
