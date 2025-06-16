import { useState, useEffect, useRef } from 'react';
import { EggFried } from 'lucide-react';

// Importo tutti i componenti scorporati
import RecipeSelection from './RecipeSelection';
import TimerDisplay from './TimerDisplay';
import CookingInstructions from './CookingInstructions';
import TimerControls from './TimerControls';
import { Button } from '@/components/ui/button'; 

// Importo le utility e i dati dai loro nuovi percorsi
import { getText } from '@/utils/utils'; 
import { Recipe } from '@/data/recipes'; 

const EggTimer = () => {
  // Stati principali dell'applicazione
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isItalian, setIsItalian] = useState(false); // Stato per la lingua
  const [showInstructions, setShowInstructions] = useState(false); // Stato per mostrare/nascondere istruzioni

  // Ref per AudioContext, usato per l'allarme sonoro
  const audioContextRef = useRef<AudioContext | null>(null);

  // Effetto per gestire il timer e l'AudioContext
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    // Inizializza AudioContext se non è già stato fatto
    if (!audioContextRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextCtor) {
        audioContextRef.current = new AudioContextCtor();
      } else {
        console.warn("Web Audio API non supportato in questo browser.");
      }
    }

    // Logica del conto alla rovescia del timer
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) { // Quando il tempo sta per finire
            setIsRunning(false);
            setIsCompleted(true);
            playAlert(); // Riproduci l'allarme
            return 0;
          }
          return time - 1; // Decrementa il tempo
        });
      }, 1000); // Aggiorna ogni secondo
    }

    // Funzione di pulizia: ferma l'intervallo e chiude l'AudioContext
    return () => {
      clearInterval(interval);
      if (audioContextRef.current) {
        if (audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close().catch(e => console.error("Errore durante la chiusura di AudioContext:", e));
        }
        audioContextRef.current = null;
      }
    };
  }, [isRunning, timeLeft]); // Dipendenze dell'useEffect

  // Funzione per riprodurre un suono di allarme
  const playAlert = () => {
    if (!audioContextRef.current) {
      console.warn("AudioContext non disponibile per playAlert. L'avviso non verrà riprodotto.");
      return;
    }

    // Crea un suono a onda sinusoidale per l'allarme
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.value = 800; // Frequenza del suono
    oscillator.type = 'sine'; // Tipo di onda

    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.5);
  };

  // Funzione per avviare il timer con una ricetta selezionata
  const startTimer = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setTimeLeft(recipe.time);
    setIsRunning(true);
    setIsCompleted(false);
    setShowInstructions(false); // Nascondi le istruzioni all'avvio del timer
  };

  // Funzione per mettere in pausa/riprendere il timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Funzione per resettare il timer
  const resetTimer = () => {
    setIsRunning(false);
    setIsCompleted(false);
    if (selectedRecipe) {
      setTimeLeft(selectedRecipe.time); // Reimposta al tempo iniziale della ricetta
    } else {
      setTimeLeft(0); // Se nessuna ricetta, tempo a zero
    }
  };

  // Calcola il progresso del timer in percentuale
  // Questa funzione rimane qui perché dipende dagli stati di EggTimer (selectedRecipe, timeLeft)
  const getProgress = () => {
    if (!selectedRecipe || timeLeft === 0) return 0;
    return ((selectedRecipe.time - timeLeft) / selectedRecipe.time) * 100;
  };

  // Funzione per tornare alla schermata di selezione delle ricette
  const handleBackToRecipes = () => {
    setSelectedRecipe(null); // Deseleziona la ricetta
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeft(0);
    setShowInstructions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-egg-background to-egg-cream p-4">
      <div className="max-w-md mx-auto space-y-8">
        {/* Intestazione dell'applicazione */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex items-center justify-center gap-3">
            <EggFried className="w-8 h-8 text-egg-yellow" />
            <h1 className="font-pixel text-lg text-egg-brown">
              {getText('Egg Timer', 'Timer Uova', isItalian)}
            </h1>
          </div>
          <p className="text-egg-brown/70 font-sans">
            {getText('Perfect eggs every time!', 'Uova perfette ogni volta!', isItalian)}
          </p>
          
          {/* Bottone per cambiare lingua */}
          <div className="flex justify-center">
            <Button
              onClick={() => setIsItalian(!isItalian)}
              variant="ghost"
              className="text-egg-brown/70 hover:text-egg-brown font-sans text-sm"
            >
              {isItalian ? '🇬🇧 English' : '🇮🇹 Italiano'}
            </Button>
          </div>
        </div>

        {/* Renderizza la selezione ricetta o il display del timer */}
        {!selectedRecipe ? (
          // Mostra il componente di selezione ricetta
          <RecipeSelection 
            onSelectRecipe={startTimer} 
            isItalian={isItalian} 
          />
        ) : (
          // Mostra il display del timer, le istruzioni e i controlli
          <div className="space-y-6 animate-bounce-in">
            <TimerDisplay
              selectedRecipe={selectedRecipe}
              timeLeft={timeLeft}
              isCompleted={isCompleted}
              isItalian={isItalian}
              getProgress={getProgress}
            />

            <CookingInstructions 
              selectedRecipe={selectedRecipe} 
              isItalian={isItalian} 
              showInstructions={showInstructions} 
              setShowInstructions={setShowInstructions} 
            />

            <TimerControls
              isRunning={isRunning}
              isCompleted={isCompleted}
              toggleTimer={toggleTimer}
              resetTimer={resetTimer}
              handleBackToRecipes={handleBackToRecipes}
              isItalian={isItalian}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EggTimer;