import React, { useState } from "react";
import styles from "./StartPage.module.css";

interface StartPageProps {
  onStart: (initialTime: number) => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  const [customTime, setCustomTime] = useState<string>("60");

  const handleStart = () => {
    const time = parseInt(customTime, 10);
    if (!isNaN(time) && time > 0) {
      onStart(time);
    } else {
      alert("Inserisci un numero valido di secondi");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Benvenuto nell'Egg Timer!</h1>
      <div className={styles["input-group"]}>
        <label htmlFor="timeInput" className={styles.label}>
          Imposta il tempo (in secondi):
        </label>
        <input
          type="number"
          id="timeInput"
          value={customTime}
          onChange={(e) => setCustomTime(e.target.value)}
          className={styles.input}
        />
      </div>
      <button onClick={handleStart} className={styles.button}>
        Inizia
      </button>
    </div>
  );
};

export default StartPage;
