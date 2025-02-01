import React from "react";
import styles from './MenuPage.module.css';

interface MenuPageProps {
  onSelect: (time: number, recipe: string) => void; // Aggiungi il tempo come parametro
}

const MenuPage: React.FC<MenuPageProps> = ({ onSelect }) => {
  const handleSelection = (recipe: string) => {
    let time = 60; // Default time
    switch (recipe) {
      case "softboiled":
        time = 300; // 5 minuti
        break;
      case "hardboiled":
        time = 720; // 12 minuti
        break;
      case "fried":
        time = 180; // 3 minuti
        break;
      case "scrambled":
        time = 240; // 4 minuti
        break;
    }
    onSelect(time, recipe);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cosa vuoi cucinare oggi?</h1>
      <div className={styles.recipeSelection}>
        <button onClick={() => handleSelection("softboiled")} className={styles.button}>
          Soft Boiled Egg
        </button>
        <button onClick={() => handleSelection("hardboiled")} className={styles.button}>
          Hard Boiled Egg
        </button>
        <button onClick={() => handleSelection("fried")} className={styles.button}>
          Fried Egg
        </button>
        <button onClick={() => handleSelection("scrambled")} className={styles.button}>
          Scrambled Egg
        </button>
      </div>
    </div>
  );
};

export default MenuPage;
