import React, { useState } from "react";
import EggTimer from "./components/EggTimer";
import MenuPage from "./components/MenuPage";
import DonePage from "./components/DonePage";

const App: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [initialTime, setInitialTime] = useState<number>(60);
  const [recipe, setRecipe] = useState<string>("");

  const handleStart = (time: number, selectedRecipe: string) => {
    setInitialTime(time);
    setRecipe(selectedRecipe);
    setStarted(true);
  };

  const handleDone = () => {
    setStarted(false);
    setRecipe("");
  };

  return (
    <div className="App">
      {started ? (
        <>
          <h1 className="text-center text-3xl font-bold mt-4">Egg Timer</h1>
          <EggTimer initialTime={initialTime} onTimerEnd={handleDone} />
        </>
      ) : recipe ? (
        <DonePage recipe={recipe} />
      ) : (
        <MenuPage onSelect={handleStart} />
      )}
    </div>
  );
};

export default App;
