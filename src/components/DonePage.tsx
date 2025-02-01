import React from "react";
import styles from "./DonePage.module.css";

interface DonePageProps {
  recipe: string;
}

const DonePage: React.FC<DonePageProps> = ({ recipe }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Il tuo {recipe} è pronto!</h1>
      <p className={styles.text}>Buon Appetito!</p>
      <button className={styles.button} onClick={() => window.location.reload()}>
        Torna al Menu
      </button>
    </div>
  );
};

export default DonePage;
