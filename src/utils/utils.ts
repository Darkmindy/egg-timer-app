// src/utils/utils.ts

/**
 * Formatta un numero di secondi in una stringa MM:SS.
 * @param seconds - Il numero di secondi da formattare.
 * @returns La stringa formattata (es. "05:30").
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  // Formatta in MM:SS, aggiungendo uno zero davanti se il numero è < 10
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Restituisce il testo in inglese o italiano in base alla lingua selezionata.
 * @param en - Il testo in inglese.
 * @param it - Il testo in italiano.
 * @param isItalian - Un booleano che indica se la lingua corrente è l'italiano.
 * @returns Il testo nella lingua appropriata.
 */
export const getText = (en: string, it: string, isItalian: boolean): string => {
  return isItalian ? it : en;
};