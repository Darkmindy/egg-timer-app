import { useState, useEffect } from "react";

// Aggiungi la definizione di onTimerEnd in EggTimerProps
interface EggTimerProps {
  initialTime: number;
  onTimerEnd: () => void; // La funzione da chiamare quando il timer finisce
}

const EggTimer: React.FC<EggTimerProps> = ({ initialTime, onTimerEnd }) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (time === 0) {
      setIsRunning(false);
      onTimerEnd(); // Chiama onTimerEnd quando il timer è finito
      new Audio("/beep.mp3").play(); // Suono alla fine
    }
    return () => clearInterval(timer);
  }, [isRunning, time, onTimerEnd]);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Egg Timer ⏳</h1>
      <p className="text-xl">{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}</p>
      <button onClick={() => setIsRunning(!isRunning)} className="m-2 p-2 bg-blue-500 text-white rounded">
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={() => { setTime(initialTime); setIsRunning(false); }} className="m-2 p-2 bg-red-500 text-white rounded">
        Reset
      </button>
    </div>
  );
};

export default EggTimer;
